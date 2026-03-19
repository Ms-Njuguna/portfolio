import FallingText from "../ui/FallingText";

export default function Hero() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
      <div className="h-[260px] md:h-[240px]">
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
          trigger="hover"
          backgroundColor="transparent"
          wireframes={false}
          gravity={0.56}
          fontSize="1.8rem"
          mouseConstraintStiffness={0.9}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
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