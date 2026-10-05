"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/content/site";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { AnchorButton } from "../ui/Anchor";
import { VehicleArt } from "../visuals/VehicleArt";

/** Closing statement over a pointer-reactive, softly lit car silhouette. */
export function RentalCTA() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });
  const carX = useTransform(sx, (v) => v * 40);
  const glowX = useTransform(sx, (v) => v * 120);
  const glowY = useTransform(sy, (v) => v * 60);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section ref={ref} onPointerMove={onMove} aria-labelledby="cta-title" className="relative isolate overflow-hidden py-32 md:py-44">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div style={{ x: glowX, y: glowY }} className="absolute left-[10%] top-[20%] h-[70%] w-[50%] rounded-full bg-[radial-gradient(circle,rgb(62_230_160/0.18),transparent_62%)] blur-2xl" />
        <motion.div style={{ x: glowX }} className="absolute right-[5%] top-[10%] h-[70%] w-[50%] rounded-full bg-[radial-gradient(circle,rgb(143_107_255/0.2),transparent_62%)] blur-2xl" />
        <motion.div style={{ x: carX }} className="absolute inset-x-0 bottom-[-6%] mx-auto w-[min(150vw,1500px)] -translate-x-[3%] opacity-90">
          <VehicleArt shape="supercar" tone="outline" lights className="w-full overflow-visible text-fg/[0.13]" />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--color-ink)_78%)]" />
      </div>
      <div aria-hidden className="hairline absolute inset-x-0 top-0" />

      <div className="container-x text-center">
        <Reveal y={10}>
          <p className="eyebrow">Next step</p>
        </Reveal>
        <RevealLines
          id="cta-title"
          className="display mx-auto mt-8 max-w-5xl text-[clamp(2.6rem,7.4vw,7rem)]"
          lines={[
            "Ready to put your fleet",
            <span key="l1">
              online <span className="serif-em text-shine pr-[0.05em]">properly?</span>
            </span>,
          ]}
        />
        <Reveal delay={0.15}>
          <p className="lede mx-auto mt-8 max-w-xl">
            Tell me about your rental business and I’ll show you what your digital experience could look like.
          </p>
        </Reveal>
        <Reveal delay={0.25} className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <AnchorButton href="#contact" size="lg">
            Let’s Build Your Rental Website
          </AnchorButton>
          <AnchorButton href={`mailto:${site.email}?subject=${encodeURIComponent("Car rental website")}`} variant="outline" size="lg">
            Contact Ahtsham
          </AnchorButton>
        </Reveal>
      </div>
    </section>
  );
}
