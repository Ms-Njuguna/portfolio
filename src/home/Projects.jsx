import { useMemo, useState } from "react";
import ScrollFloat from "../ui/ScrollFloat";
import { motion, AnimatePresence } from "motion/react";

export default function Projects() {
  const projects = useMemo(
    () => [
      {
        id: "little-lemon-api",
        title: "Little Lemon API",
        tag: "Django • Postgres • Swagger",
        blurb:
          "Bookings + auth + admin workflows documented and testable.",
        bullets: [
          "OpenAPI/Swagger docs for clean handoff",
          "Auth + roles, production-minded email flows",
          "Postgres schema + migrations",
        ],
        live: "https://little-lemon-api-bdsl.onrender.com/api/docs/",
      },
      {
        id: "little-lemon-frontend",
        title: "Little Lemon Frontend",
        tag: "React • UX • API Integration",
        blurb:
          "Responsive restaurant UI with booking flow and API integration.",
        bullets: [
          "Component-based architecture",
          "Form validation + UX flows",
          "Connected to backend API",
        ],
        live: "https://littlelemon-517.pages.dev/",
      },
      {
        id: "verdara",
        title: "Verdara",
        tag: "Public API • Vanilla JS • Tailwind",
        blurb:
          "Fast product browsing + dynamic cart UX using a public API.",
        bullets: [
          "Defensive fetch patterns + error UI",
          "Order summary state management",
          "Polished responsive UI",
        ],
        live: "https://verdara.pages.dev/",
      },
      {
        id: "italo",
        title: "Italo Jewelry Redesign",
        tag: "JS • Tailwind • UX/UI",
        blurb:
          "Unofficial redesign concept for Italo Jewelry.",
        bullets: [
          "Create/Update/Delete flows",
          "Reusable render functions",
          "Form validation + UX details",
        ],
        live: "https://italo-jewelry-redesign.pages.dev/",
      },
    ],
    []
  );

  const [open, setOpen] = useState(null);
  const active = projects.find((p) => p.id === open);

  return (
    <section className="py-10">
      <ScrollFloat
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="center bottom+=50%"
        scrollEnd="bottom bottom-=40%"
        stagger={0.03}
      >
        Projects
      </ScrollFloat>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => setOpen(p.id)}
            className="group rounded-3xl border border-white/10 bg-white/5 p-5 text-left hover:bg-white/7"
            type="button"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold tracking-tight">
                  {p.title}
                </div>
                <div className="mt-1 text-xs opacity-60">{p.tag}</div>
              </div>
              <div className="rounded-full border border-white/15 px-3 py-1 text-xs opacity-70 group-hover:opacity-100">
                Case study →
              </div>
            </div>
            <p className="mt-3 text-sm opacity-80">{p.blurb}</p>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 md:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              className="w-full max-w-2xl rounded-3xl border border-white/10 bg-neutral-950 p-6"
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xl font-semibold tracking-tight">
                    {active.title}
                  </div>
                  <div className="mt-1 text-xs opacity-60">{active.tag}</div>
                </div>
                <button
                  className="rounded-full border border-white/15 px-3 py-1 text-xs hover:bg-white/5"
                  onClick={() => setOpen(null)}
                  type="button"
                >
                  Close
                </button>
              </div>

              <p className="mt-4 text-sm opacity-80">{active.blurb}</p>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-wide opacity-60">
                  What I shipped
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm opacity-85">
                  {active.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                {["Clean UI", "Solid validation", "Docs-first", "Production mindset"].map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={active.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white text-black px-4 py-2 text-sm font-medium hover:opacity-90"
                >
                  Live Demo →
                </a>

                {/* Optional repo button later */}
                {/*
                  <a
                    href={active.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/5"
                  >
                    View Code
                  </a>
                */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}