"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/content/content";
import { Reveal, RevealLines } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { useMediaQuery, useReducedMotionPref } from "@/lib/hooks";

function StepBody({ step, active }: { step: (typeof processSteps)[number]; active: boolean }) {
  return (
    <>
      <span
        className={`serif-em block text-[4.5rem] leading-none transition-colors duration-700 md:text-[5.5rem] ${
          active ? "text-shine" : "text-fg/20"
        }`}
      >
        {step.n}
      </span>
      <h3 className="mt-6 text-[1.75rem] font-medium tracking-[-0.035em] md:text-[2rem]">{step.title}</h3>
      <p className="mt-3 max-w-[18rem] leading-relaxed text-muted">{step.body}</p>
      <ul className="mt-7 space-y-2">
        {step.deliverables.map((d) => (
          <li key={d} className="flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-dim">
            <span className="text-emerald/80">+</span>
            {d}
          </li>
        ))}
      </ul>
    </>
  );
}

function Header({ extra }: { extra?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-8">
      <div>
        <SectionLabel index="05">How I work</SectionLabel>
        <RevealLines
          id="process-title"
          className="h-section mt-8"
          lines={[
            "A clear path from",
            <span key="l1">
              brief to <span className="serif-em text-emerald-soft">launch.</span>
            </span>,
          ]}
        />
      </div>
      {extra}
    </div>
  );
}

/** Desktop: pinned section, steps travel horizontally as you scroll. */
function HorizontalProcess() {
  const target = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      const parent = track.current.parentElement!;
      setDistance(Math.max(0, track.current.scrollWidth - parent.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.04, 0.96], [0, -distance], { clamp: true });
  const fill = useTransform(scrollYProgress, [0.04, 0.96], ["0%", "100%"], { clamp: true });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(processSteps.length - 1, Math.max(0, Math.floor(((v - 0.04) / 0.92) * processSteps.length)));
    setActive(i);
  });

  return (
    <div ref={target} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-x">
          <Header
            extra={
              <p className="font-mono text-sm tabular-nums text-muted" aria-hidden>
                <span className="text-fg">{processSteps[active].n}</span>
                <span className="mx-2 text-dim">/</span>
                {String(processSteps.length).padStart(2, "0")}
              </p>
            }
          />

          <div className="relative mt-16 [clip-path:inset(-4rem_-100vw_-4rem_0)] [mask-image:linear-gradient(90deg,transparent,#000_5rem)] xl:mt-20">
            {/* progress rail */}
            <div className="relative mb-12 h-px bg-line">
              <motion.div style={{ width: fill }} className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald via-emerald to-violet" />
            </div>
            <motion.ol ref={track} style={{ x }} className="flex w-max" aria-labelledby="process-title">
              {processSteps.map((s, i) => (
                <li
                  key={s.n}
                  className={`w-[25rem] shrink-0 border-l pl-8 pr-12 transition-colors duration-700 xl:w-[27rem] ${
                    i <= active ? "border-emerald/40" : "border-line"
                  }`}
                >
                  <StepBody step={s} active={i === active} />
                </li>
              ))}
              <li aria-hidden className="w-[10vw] shrink-0" />
            </motion.ol>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile / tablet / reduced motion: vertical timeline that fills as you scroll. */
function VerticalProcess() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div className="container-x section-y">
      <Header />
      <ol ref={ref} className="relative mt-16 space-y-14 pl-10 md:pl-16" aria-labelledby="process-title">
        <span aria-hidden className="absolute bottom-0 left-[3px] top-2 w-px bg-line" />
        <motion.span
          aria-hidden
          style={{ scaleY }}
          className="absolute bottom-0 left-[3px] top-2 w-px origin-top bg-gradient-to-b from-emerald to-violet"
        />
        {processSteps.map((s) => (
          <Reveal as="li" key={s.n} className="relative">
            <span aria-hidden className="absolute -left-10 top-6 size-[7px] rounded-full bg-emerald shadow-[0_0_10px_rgb(62_230_160)] md:-left-16" />
            <StepBody step={s} active />
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export function Process() {
  const desktop = useMediaQuery("(min-width: 1024px) and (min-height: 700px)");
  const reduce = useReducedMotionPref();
  return (
    <section id="process" data-stage="7" aria-labelledby="process-title" className="relative">
      {desktop && !reduce ? <HorizontalProcess /> : <VerticalProcess />}
    </section>
  );
}
