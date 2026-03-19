import { useEffect, useState } from "react";

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-redoc="true"]`);
    if (existing) return resolve(existing);

    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.dataset.redoc = "true";
    s.onload = () => resolve(s);
    s.onerror = () => reject(new Error("Failed to load Redoc script."));
    document.body.appendChild(s);
  });
}

export default function ApiDocsEmbed() {
  const specUrl = "/openapi.json"; // Always use public/openapi.json
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    let cancelled = false;

    async function mount() {
      setStatus({ loading: true, error: "" });

      try {
        await loadScriptOnce(
          "https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"
        );

        if (!window.Redoc) throw new Error("Redoc not available after script load");

        const el = document.getElementById("redoc-container");
        if (!el) throw new Error("Redoc container not found");

        el.innerHTML = "";

        // Option 1: load directly from URL
        window.Redoc.init(specUrl, {
          theme: { colors: { primary: { main: "#22d3ee" } } },
          hideDownloadButton: false,
          expandResponses: "200,201",
          requiredPropsFirst: true,
          sortPropsAlphabetically: true,
        }, el);

        // Option 2: if you want to fetch JSON manually (avoid CORS)
        // const res = await fetch(specUrl);
        // const spec = await res.json();
        // window.Redoc.init(spec, { ... }, el);

        if (!cancelled) setStatus({ loading: false, error: "" });
      } catch (err) {
        if (!cancelled) {
          setStatus({ loading: false, error: err.message || "Failed to load docs." });
        }
      }
    }

    mount();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">API docs</h3>
          <p className="mt-1 text-sm opacity-70">
            OpenAPI → Redoc embed. Using <code>public/openapi.json</code>
          </p>
        </div>
        <div className="text-xs opacity-60">
          Spec: <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1">{specUrl}</span>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-neutral-950/40 p-2">
        {status.loading && <div className="p-4 text-sm opacity-70">Loading docs…</div>}
        {!status.loading && status.error && (
          <div className="p-4 text-sm">
            <div className="font-medium">Couldn’t load API docs</div>
            <div className="mt-1 opacity-70">{status.error}</div>
            <div className="mt-3 text-xs opacity-60">
              Fix: ensure <code className="opacity-90">public/openapi.json</code> exists and is valid JSON.
            </div>
          </div>
        )}

        <div
  id="redoc-container"
  className="h-130 max-h-[80vh] overflow-y-auto rounded-xl"
/>
      </div>
    </div>
  );
}