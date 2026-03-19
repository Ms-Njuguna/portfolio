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
        caseStudy: {
          problem: "Restaurants need a reliable system to manage bookings, user authentication, and admin workflows but many lack scalable backend systems.",
          solution: "Built a production-ready REST API using Django, PostgreSQL, and Swagger with authentication and role-based access.",
          tech: [
            "Django REST Framework for scalable APIs",
            "PostgreSQL for relational data management",
            "Swagger/OpenAPI for documentation",
            "Token-based authentication for security"
          ],
          challenges: "Designing secure authentication and role-based permissions while maintaining flexibility.",
          impact: "Fully documented and testable API that reduces frontend integration time."
        }
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
        caseStudy: {
          problem: "Users need a smooth and intuitive way to browse a restaurant and make bookings online, but many interfaces are slow, confusing, or not mobile-friendly.",
          solution: "Built a responsive React frontend that integrates with the Little Lemon API, focusing on seamless booking flows, validation, and clean UI/UX patterns.",
          tech: [
            "React for component-based architecture",
            "React Router for navigation and page structure",
            "Form validation for better user experience",
            "API integration with backend for real-time booking data"
          ],
          challenges: "Managing form state and validation while keeping the UI responsive and user-friendly. Also ensuring smooth communication between frontend and backend APIs.",
          impact: "Delivered a clean, responsive interface that improves user experience and enables real-time booking interactions with the backend system."
        },
        images: [
          "/assets/projects/lemon-home.jpeg",
          "/assets/projects/lemon-booking.jpeg",
          "/assets/projects/lemon-mobile.jpg",
        ],
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
        caseStudy: {
          problem: "Users browsing products from public APIs often experience slow load times, broken UI states, and poor cart interactions due to unreliable data and lack of proper state handling.",
          solution: "Built a fast, responsive product browsing experience using vanilla JavaScript, with dynamic rendering, defensive fetch handling, and a fully interactive cart system.",
          tech: [
            "Vanilla JavaScript for full control over DOM and logic",
            "Fetch API with error handling and fallback UI",
            "State management using structured objects and arrays",
            "Tailwind CSS for responsive and clean UI design"
          ],
          challenges: "Handling inconsistent API data and ensuring the UI doesn't break when requests fail. Also managing cart state dynamically without a framework.",
          impact: "Delivered a smooth and resilient shopping experience with fast interactions, improved error handling, and clean UI responsiveness across devices."
        },
        images: [
          "/assets/projects/verdara-home.jpeg",
          "/assets/projects/verdara-cart.jpeg",
        ],
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
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-neutral-950 p-6"
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

              {active.caseStudy && (
                <div className="mt-6 space-y-5 text-sm">
                  <div>
                    <div className="text-xs uppercase opacity-60">Problem</div>
                    <p className="opacity-80 mt-1">{active.caseStudy.problem}</p>
                  </div>

                  <div>
                    <div className="text-xs uppercase opacity-60">Solution</div>
                    <p className="opacity-80 mt-1">{active.caseStudy.solution}</p>
                  </div>

                  <div>
                    <div className="text-xs uppercase opacity-60">Tech Decisions</div>
                    <ul className="list-disc pl-5 mt-1 space-y-1 opacity-80">
                      {active.caseStudy.tech.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs uppercase opacity-60">Challenges</div>
                    <p className="opacity-80 mt-1">{active.caseStudy.challenges}</p>
                  </div>

                  <div>
                    <div className="text-xs uppercase opacity-60">Impact</div>
                    <p className="opacity-80 mt-1">{active.caseStudy.impact}</p>
                  </div>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2 text-xs">
                {["Clean UI", "Solid validation", "Docs-first", "Production mindset"].map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-3 sticky bottom-0 bg-neutral-950 pt-4">
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