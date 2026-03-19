import { useEffect, useMemo, useState } from "react";

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-redoc="true"]`);
    if (existing) return resolve();

    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.dataset.redoc = "true";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Redoc script."));
    document.body.appendChild(s);
  });
}

export default function ApiDocsEmbed() {
  const specUrl = useMemo(() => {
    // Set this in .env: VITE_OPENAPI_URL="https://your-render-app.onrender.com/openapi.json"
    return import.meta.env.VITE_OPENAPI_URL || "/openapi.json";
  }, []);

  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    let cancelled = false;

    async function mount() {
      setStatus({ loading: true, error: "" });

      try {
        await loadScriptOnce("https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js");

        // Redoc mounts itself to this div:
        const el = document.getElementById("redoc-container");
        if (!el) throw new Error("Redoc container not found.");

        // Clear previous mounts (hot reload safety)
        el.innerHTML = "";

        // eslint-disable-next-line no-undef
        Redoc.init(
          specUrl,
          {
            theme: {
              colors: {
                primary: {
                  main: "#22d3ee",
                },
              },
              typography: {
                fontSize: "14px",
              },
            },
            hideDownloadButton: false,
            expandResponses: "200,201",
            requiredPropsFirst: true,
            sortPropsAlphabetically: true,
          },
          el
        );

        if (!cancelled) setStatus({ loading: false, error: "" });
      } catch (err) {
        if (!cancelled) {
          setStatus({ loading: false, error: err?.message || "Failed to load docs." });
        }
      }
    }

    mount();
    return () => {
      cancelled = true;
    };
  }, [specUrl]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">API docs</h3>
          <p className="mt-1 text-sm opacity-70">
            OpenAPI → Redoc embed. Set <span className="opacity-90">VITE_OPENAPI_URL</span> to your Render endpoint.
          </p>
        </div>

        <div className="text-xs opacity-60">
          Spec: <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1">{specUrl}</span>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-neutral-950/40 p-2">
        {status.loading && (
          <div className="p-4 text-sm opacity-70">Loading docs…</div>
        )}

        {!status.loading && status.error && (
          <div className="p-4 text-sm">
            <div className="font-medium">Couldn’t load API docs</div>
            <div className="mt-1 opacity-70">{status.error}</div>
            <div className="mt-3 text-xs opacity-60">
              Fix: add your OpenAPI JSON to <code className="opacity-90">public/openapi.json</code> OR set <code className="opacity-90">VITE_OPENAPI_URL</code>.
            </div>
          </div>
        )}

        <div
          id="redoc-container"
          className="min-h-[520px] overflow-hidden rounded-xl"
        />
      </div>
    </div>
  );
}