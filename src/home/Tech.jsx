import { RadialIntroDemo } from "../ui/RadialIntro";

export default function Tech() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold tracking-tight">My stack</h2>
        <p className="mt-2 text-sm opacity-70">
          I’m strongest where product meets engineering: UI systems, API design,
          data modeling, and the details that make apps feel “done”.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          {[
            "React + Motion",
            "Django + DRF",
            "Flask",
            "PostgreSQL",
            "REST + OpenAPI",
            "Tailwind v4",
            "Testing mindset",
            "Git discipline",
          ].map((x) => (
            <div
              key={x}
              className="rounded-2xl border border-white/10 bg-neutral-950/40 p-3"
            >
              {x}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-6">
        <RadialIntroDemo />
      </div>
    </section>
  );
}