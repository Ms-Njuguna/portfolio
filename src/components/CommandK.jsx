import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function CommandK() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const items = useMemo(
    () => [
      { label: "Go to Featured Work", href: "#work" },
      { label: "Go to Projects", href: "#projects" },
      { label: "Go to Stack", href: "#stack" },
      { label: "Go to API Playground", href: "#playground" },
      { label: "Go to Contact", href: "#contact" },
    ],
    []
  );

  const filtered = items.filter((i) =>
    i.label.toLowerCase().includes(q.toLowerCase())
  );

  useEffect(() => {
    function onKeyDown(e) {
      const isK = e.key.toLowerCase() === "k";
      if ((e.ctrlKey || e.metaKey) && isK) {
        e.preventDefault();
        setOpen((s) => !s);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function go(href) {
    setOpen(false);
    setQ("");
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="w-full max-w-xl rounded-3xl border border-white/10 bg-neutral-950 p-4"
            initial={{ y: 14, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 14, opacity: 0, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
              <span className="text-xs opacity-60">Search</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Jump to section…"
              />
              <span className="text-xs opacity-50">Esc</span>
            </div>

            <div className="mt-3 overflow-hidden rounded-2xl border border-white/10">
              {filtered.map((i) => (
                <button
                  key={i.href}
                  onClick={() => go(i.href)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-white/5"
                  type="button"
                >
                  <span>{i.label}</span>
                  <span className="opacity-50">↵</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-4 text-sm opacity-60">
                  No matches.
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}