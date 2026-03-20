import FallingText from "../ui/FallingText";

export default function Hero() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6 md:p-8">
      <div className="min-h-55 sm:min-h-65 md:h-65">
        <FallingText
          text={`I build full-stack experiences — clean APIs, beautiful interfaces, and the kind of polish that makes users trust the product instantly.`}
          highlightWords={[
            "full-stack",
            "APIs,",
            "beautiful",
            "polish",
            "trust",
            "instantly.",
          ]}
          trigger="auto"
          backgroundColor="transparent"
          wireframes={false}
          gravity={0.35}
          fontSize="clamp(1.2rem, 4vw, 1.8rem)"
          mouseConstraintStiffness={0.9}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-[10px] sm:text-xs">
        {[
          "React",
          "JavaScript",
          "Django",
          "Flask",
          "PostgreSQL",
          "REST",
          "Swagger/OpenAPI",
          "Tailwind",
        ].map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 opacity-90"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}