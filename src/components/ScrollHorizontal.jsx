"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useMemo, useRef } from "react";

const ITEM_WIDTH = typeof window !== "undefined" && window.innerWidth < 640 ? 260 : 400;
const GAP = 30;

export default function ScrollHorizontal() {
  const containerRef = useRef(null);

  const items = useMemo(
    () => [
      {
        id: 1,
        color: "#00E5FF",
        label: "Little Lemon API",
        caption: "Django • Postgres • Swagger",
      },
      {
        id: 2,
        color: "#A78BFA",
        label: "Verdara - Beauty Ordering App",
        caption: "Public API • Tailwind • UX",
      },
      {
        id: 3,
        color: "#22C55E",
        label: "Italo Jewelry Redesign",
        caption: "DOM • JSON Server • CRUD",
      },
      {
        id: 4,
        color: "#F97316",
        label: "Little Lemon Frontend",
        caption: "React • Validation • UI",
      },
      {
        id: 5,
        color: "#FF4D8D",
        label: "Nuvibe Frontend",
        caption: "Flows • Forms • Product thinking",
      },
    ],
    []
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end 80%"], // 👈 key change
  });

  const totalDistance = (items.length - 1) * (ITEM_WIDTH + GAP);
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);

  const dynamicHeight = (items.length - 1) * 32;

  return (
    <div id="featured-scroll">
      <section className="intro-section">
        <h3 className="impact">CASE STUDIES</h3>
        <p className="sub">
          Scroll to travel through builds, each one designed like a product.
        </p>
      </section>

      <div ref={containerRef} className="scroll-container" style={{ height: `${dynamicHeight}vh`, position: "relative" }}>
        <div className="sticky-wrapper">
          <motion.div className="gallery" style={{ x }}>
            {items.map((item) => (
              <div
                key={item.id}
                className="gallery-item"
                style={{
                  "--item-color": item.color,
                }}
              >
                <div className="overlay" />
                <div className="item-content">
                  <span className="item-number">0{item.id}</span>
                  <h4>{item.label}</h4>
                  <p>{item.caption}</p>

                  <div className="pill-row">
                    {["Problem", "Build", "Impact"].map((t) => (
                      <span key={t} className="pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <StyleSheet />
    </div>
  );
}

function StyleSheet() {
  return (
    <style>{`
      #featured-scroll { overflow: visible; }
      .intro-section {
        height: 12vh;
        padding: 40px 16px 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        text-align: center;
        padding-bottom: 26px;
      }
      .impact {
        font-size: clamp(26px, 7vw, 56px);
        color: #f5f5f5;
        margin: 0;
        text-transform: uppercase;
        letter-spacing: -0.02em;
      }
      .sub {
        margin-top: 10px;
        max-width: 560px;
        font-size: 13px;
        opacity: 0.7;
      }

      .sticky-wrapper {
        position: sticky;
        top: 0;
        height: 90vh;
        width: 100%;
        max-width: 400px;
        padding: 0 16px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow: visible;
      }

      .gallery { display: flex; gap: 30px; will-change: transform; }

      .gallery-item {
        flex-shrink: 0;
        width: clamp(260px, 80vw, 400px);
        height: clamp(380px, 60vh, 520px);
        border-radius: 18px;
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.10);
        background:
          radial-gradient(900px circle at 20% 10%, rgba(255,255,255,0.10), transparent 45%),
          linear-gradient(140deg, rgba(255,255,255,0.06), rgba(0,0,0,0.0)),
          rgba(255,255,255,0.04);
      }

      .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, transparent 45%, var(--item-color));
        opacity: 0.55;
        mix-blend-mode: multiply;
      }

      .item-content {
        position: absolute;
        bottom: 28px;
        left: 24px;
        right: 24px;
        z-index: 1;
      }

      .item-number {
        font-size: 12px;
        color: var(--item-color);
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        display: block;
        margin-bottom: 10px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .gallery-item h4 {
        font-size: 26px;
        font-weight: 700;
        color: #f5f5f5;
        margin: 0;
        letter-spacing: -0.02em;
      }

      .gallery-item p {
        margin-top: 10px;
        font-size: 13px;
        opacity: 0.82;
      }

      .pill-row {
        display: flex;
        gap: 8px;
        margin-top: 14px;
        flex-wrap: wrap;
      }

      .pill {
        border: 1px solid rgba(255,255,255,0.14);
        background: rgba(0,0,0,0.22);
        color: rgba(255,255,255,0.9);
        font-size: 12px;
        padding: 6px 10px;
        border-radius: 999px;
      }

      .big { font-size: 18px; }

      @media (max-width: 600px) {
        .sticky-wrapper { width: 280px; }
        .gallery { gap: 15px; }
        .gallery-item { width: 280px; height: 420px; }
      }

      @media (prefers-reduced-motion: reduce) {
        .gallery { transform: none !important; }
        .scroll-container { height: auto; }
        .sticky-wrapper {
          position: relative;
          height: auto;
          width: 100%;
          overflow-x: auto;
          padding: 36px 0;
          display: flex;
        }
      }
    `}</style>
  );
}