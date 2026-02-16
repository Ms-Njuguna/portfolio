import FallingText from "../ui/FallingText";

export default function Hero() {
    return (
        <section>
            <div className="h-55 sm:h-65 md:h-55">
                <FallingText
                    text={`I turn ideas into interfaces people want to touch. Not just functional but expressive, fast, and impossible to ignore.`}
                    highlightWords={["ideas", "touch", "functional", "expressive", "fast"]}
                    highlightClass="highlighted"
                    trigger="hover"
                    backgroundColor="transparent"
                    wireframes={false}
                    gravity={0.56}
                    fontSize="2rem"
                    mouseConstraintStiffness={0.9}
                />
            </div>
        </section>
    )
}