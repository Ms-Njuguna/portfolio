import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import PF from "../assets/p2026.jpg";

export default function ScrollZoomHero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 20, mass: 0.25 });

  const bgScale = useTransform(smooth, [0, 1], [1, 1.35]);
  const bgBlur = useTransform(smooth, [0, 1], ["blur(0px)", "blur(14px)"]);
  const bgOpacity = useTransform(smooth, [0, 0.85, 1], [1, 0.5, 0]);

  const layer1Y = useTransform(smooth, [0, 1], ["0%", "6%"]);
  const layer2Y = useTransform(smooth, [0, 1], ["0%", "-4%"]);
  const grainOpacity = useTransform(smooth, [0, 1], [0.18, 0.05]);

  const titleY = useTransform(smooth, [0, 1], ["0%", "-14%"]);
  const titleOpacity = useTransform(smooth, [0, 0.7, 1], [1, 1, 0]);

  const fadeOpacity = useTransform(smooth, [0.55, 1], [0, 1]);

  return (
    <div className="w-full">
      <section ref={ref} className="relative h-[220vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            style={{ scale: bgScale, filter: bgBlur, opacity: bgOpacity }}
            className="absolute inset-0 will-change-transform"
          >
            <img
              src={PF}
              alt="Portfolio background"
              className="h-full w-full object-cover"
              draggable="false"
            />
          </motion.div>

          <motion.div style={{ y: layer2Y }} className="absolute inset-0 will-change-transform">
            <div className="absolute inset-0 bg-linear-to-b from-black/35 via-black/10 to-black/60" />
          </motion.div>

          <motion.div style={{ y: layer1Y }} className="absolute inset-0 will-change-transform">
            <div className="absolute -top-24 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          </motion.div>

          <motion.div style={{ opacity: grainOpacity }} className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')",
                backgroundSize: "180px 180px",
                mixBlendMode: "overlay",
              }}
            />
          </motion.div>

          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
          >
            <h1 className="uppercase font-bold tracking-tight text-white text-[clamp(56px,18vw,220px)] drop-shadow-[0_10px_60px_rgba(0,0,0,0.7)] select-none">
              TRISH
            </h1>
            <p className="mt-2 max-w-xl px-6 text-sm md:text-base text-white/80">
              Full-stack software engineer — React interfaces + documented APIs + the polish that sells.
            </p>
          </motion.div>

          <motion.div style={{ opacity: fadeOpacity }} className="absolute inset-x-0 bottom-0 z-20 h-40">
            <div className="h-full w-full bg-linear-to-b from-transparent to-neutral-950" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}