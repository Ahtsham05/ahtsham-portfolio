"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { ButtonLink } from "../ui/Button";
import { Reveal, RevealLines } from "../ui/Reveal";

/** Closing statement over a pointer-reactive orb. */
export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });
  const ox = useTransform(sx, (v) => v * 60);
  const oy = useTransform(sy, (v) => v * 40);
  const rx = useTransform(sx, (v) => v * -24);
  const ry = useTransform(sy, (v) => v * -16);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      data-stage="8"
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden py-32 md:py-48"
    >
      {/* Orb */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <motion.div style={{ x: ox, y: oy }} className="relative size-[min(90vw,46rem)]">
          <div className="absolute inset-0 animate-[spin_24s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,rgb(62_230_160/0.0),rgb(62_230_160/0.35),rgb(143_107_255/0.4),rgb(62_230_160/0.0)_70%)] opacity-70 blur-3xl" />
          <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgb(143_255_205/0.35),rgb(30_90_66/0.4)_40%,rgb(7_8_7/0.0)_70%)] blur-xl" />
          <motion.div style={{ x: rx, y: ry }} className="absolute inset-[30%] rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_28%,rgb(255_255_255/0.22),rgb(62_230_160/0.12)_30%,rgb(7_8_7/0.85)_72%)] shadow-[inset_0_0_60px_rgb(62_230_160/0.25),0_0_120px_rgb(62_230_160/0.18)]" />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-ink)_75%)]" />
      </div>
      <div aria-hidden className="hairline absolute inset-x-0 top-0" />

      <div className="container-x text-center">
        <Reveal y={10}>
          <p className="eyebrow">Next step</p>
        </Reveal>
        <RevealLines
          id="cta-title"
          className="display mx-auto mt-8 max-w-5xl text-[clamp(2.75rem,8vw,7.5rem)]"
          lines={[
            "Have an idea",
            <span key="l1">
              worth <span className="serif-em text-shine pr-[0.05em]">building?</span>
            </span>,
          ]}
        />
        <Reveal delay={0.15}>
          <p className="lede mx-auto mt-8 max-w-xl">
            Let’s turn it into a product, system, or automation that actually moves your business forward.
          </p>
        </Reveal>
        <Reveal delay={0.25} className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/#contact">Start a Project</ButtonLink>
          <ButtonLink href="/#work" variant="outline">
            View My Work
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
