import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import PF from "../../src/assets/p2026.jpg";

export default function ScrollZoomHeroPro() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Add "inertia"/smoothness to the scroll signal
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 20, mass: 0.25 });

  // Background: zoom + blur + fade
  const bgScale = useTransform(smooth, [0, 1], [1, 1.35]);
  const bgBlur = useTransform(smooth, [0, 1], ["blur(0px)", "blur(14px)"]);
  const bgOpacity = useTransform(smooth, [0, 0.85, 1], [1, 0.5, 0]);

  // Parallax layers (subtle depth)
  const layer1Y = useTransform(smooth, [0, 1], ["0%", "6%"]);    // foreground drift
  const layer2Y = useTransform(smooth, [0, 1], ["0%", "-4%"]);   // mid drift opposite
  const grainOpacity = useTransform(smooth, [0, 1], [0.18, 0.05]);

  // Title: lift + fade
  const titleY = useTransform(smooth, [0, 1], ["0%", "-14%"]);
  const titleOpacity = useTransform(smooth, [0, 0.7, 1], [1, 1, 0]);

  // Gradient fade into next section
  const fadeOpacity = useTransform(smooth, [0.55, 1], [0, 1]);

  return (
    <div className="w-full">
      {/* HERO (2 screens tall for scroll room) */}
      <section ref={ref} className="relative h-[220vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Base background image */}
          <motion.div
            style={{ scale: bgScale, filter: bgBlur, opacity: bgOpacity }}
            className="absolute inset-0 will-change-transform"
          >
            <img
              src={PF}
              alt="Prague"
              className="h-full w-full object-cover"
              draggable="false"
            />
          </motion.div>

          {/* Parallax layer: subtle vignette / contrast */}
          <motion.div
            style={{ y: layer2Y }}
            className="absolute inset-0 will-change-transform"
          >
            <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/50" />
          </motion.div>

          {/* Parallax layer: “spotlight” glow */}
          <motion.div
            style={{ y: layer1Y }}
            className="absolute inset-0 will-change-transform"
          >
            <div className="absolute -top-24 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          </motion.div>

          {/* Film grain / texture (cheap but expensive-looking) */}
          <motion.div
            style={{ opacity: grainOpacity }}
            className="absolute inset-0 pointer-events-none"
          >
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

          {/* Title */}
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="absolute inset-0 z-10 flex items-center justify-center text-center"
          >
            <h1
              className="
                uppercase font-bold tracking-tight text-white
                text-[clamp(80px,25vw,320px)]
                drop-shadow-[0_10px_60px_rgba(0,0,0,0.7)]
                select-none
              "
            >
              PRAGUE
            </h1>
          </motion.div>

          {/* Bottom gradient fade into next section */}
          <motion.div
            style={{ opacity: fadeOpacity }}
            className="absolute inset-x-0 bottom-0 z-20 h-40"
          >
            <div className="h-full w-full bg-linear-to-b from-transparent to-neutral-950" />
          </motion.div>
        </div>
      </section>

      {/* Next section */}
      <section className="relative min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="max-w-3xl px-6 text-center">
          <p className="text-neutral-200 text-5xl font-semibold">Fin</p>
          <p className="mt-6 text-neutral-400 text-lg">
            Now your hero transitions like a premium landing page — zoom, blur, parallax depth,
            and a clean fade into content.
          </p>
        </div>
      </section>
    </div>
  );
}
