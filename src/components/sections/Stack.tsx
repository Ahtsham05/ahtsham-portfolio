"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { stackCategories } from "@/content/content";
import { BrandIcon } from "../ui/BrandIcon";
import { Reveal, RevealLines } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { useInView, useReducedMotionPref } from "@/lib/hooks";

const ease = [0.16, 1, 0.3, 1] as const;
const RADIUS = 41; // % of container

export function Stack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotionPref();
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  // Gently cycle through categories until the visitor takes over
  useEffect(() => {
    if (!inView || touched || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % stackCategories.length), 2800);
    return () => clearInterval(id);
  }, [inView, touched, reduce]);

  const select = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  const cat = stackCategories[active];

  return (
    <section id="stack" data-stage="7" aria-labelledby="stack-title" className="section-y relative overflow-hidden">
      <div className="container-x">
        <div className="max-w-3xl">
          <SectionLabel index="06">Technology</SectionLabel>
          <RevealLines
            id="stack-title"
            className="h-section mt-8"
            lines={[
              "A focused stack,",
              <span key="l1">
                chosen for <span className="serif-em text-emerald-soft">scale.</span>
              </span>,
            ]}
          />
        </div>

        <div ref={ref} className="mt-14 grid items-center gap-12 md:mt-20 lg:grid-cols-12 lg:gap-8">
          {/* Universe */}
          <Reveal className="lg:col-span-7">
            <div className="relative mx-auto aspect-square w-full max-w-[600px]">
              <div aria-hidden className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgb(62_230_160/0.12),transparent_70%)] blur-xl" />
              {[82, 56, 30].map((s, i) => (
                <div
                  key={s}
                  aria-hidden
                  className={`absolute rounded-full border ${i === 1 ? "border-dashed border-line" : "border-line"}`}
                  style={{ inset: `${(100 - s) / 2}%` }}
                />
              ))}

              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
                <defs>
                  <linearGradient id="st-beam" x1="0" x2="1">
                    <stop offset="0" stopColor="#3ee6a0" />
                    <stop offset="1" stopColor="#8f6bff" />
                  </linearGradient>
                </defs>
                {stackCategories.map((c, i) => {
                  const a = (i / stackCategories.length) * Math.PI * 2 - Math.PI / 2;
                  const on = i === active;
                  return (
                    <line
                      key={c.id}
                      x1={50 + Math.cos(a) * 15}
                      y1={50 + Math.sin(a) * 15}
                      x2={50 + Math.cos(a) * (RADIUS - 5)}
                      y2={50 + Math.sin(a) * (RADIUS - 5)}
                      stroke={on ? "url(#st-beam)" : "rgb(236 238 233 / 0.08)"}
                      strokeWidth={on ? 0.35 : 0.2}
                      className={on ? "flow-dash" : ""}
                      style={on ? { strokeDasharray: "1 1.5" } : undefined}
                    />
                  );
                })}
              </svg>

              {/* active technologies on the inner orbit */}
              <AnimatePresence mode="popLayout">
                {cat.items.map((it, j) => {
                  const a = (j / cat.items.length) * Math.PI * 2 - Math.PI / 2 + active * 0.4;
                  return (
                    <motion.div
                      key={`${cat.id}-${it.name}`}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.6, ease, delay: j * 0.05 }}
                      className="absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-emerald/30 bg-ink-2 text-fg shadow-[0_0_24px_-6px_rgb(62_230_160/0.6)] md:size-11"
                      style={{ left: `${50 + Math.cos(a) * 26}%`, top: `${50 + Math.sin(a) * 26}%` }}
                      aria-hidden
                    >
                      <BrandIcon name={it.icon} className="size-4 md:size-[1.15rem]" />
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* core */}
              <div className="absolute left-1/2 top-1/2 grid size-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-emerald/40 bg-[radial-gradient(circle_at_40%_30%,#173528,#0a0d0b_70%)] shadow-[0_0_60px_-10px_rgb(62_230_160/0.5),inset_0_0_30px_rgb(62_230_160/0.15)]">
                <span className="text-center font-mono text-[0.5625rem] uppercase leading-tight tracking-[0.2em] text-emerald-soft md:text-[0.6875rem]">
                  Full
                  <br />
                  Stack
                </span>
              </div>

              {/* categories */}
              <div role="tablist" aria-label="Technology categories" aria-orientation="horizontal">
                {stackCategories.map((c, i) => {
                  const a = (i / stackCategories.length) * Math.PI * 2 - Math.PI / 2;
                  const on = i === active;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="tab"
                      id={`tab-${c.id}`}
                      aria-selected={on}
                      aria-controls="stack-panel"
                      tabIndex={on ? 0 : -1}
                      onPointerEnter={(e) => e.pointerType === "mouse" && select(i)}
                      onFocus={() => select(i)}
                      onClick={() => select(i)}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                          e.preventDefault();
                          const n = (i + 1) % stackCategories.length;
                          document.getElementById(`tab-${stackCategories[n].id}`)?.focus();
                        }
                        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                          e.preventDefault();
                          const n = (i - 1 + stackCategories.length) % stackCategories.length;
                          document.getElementById(`tab-${stackCategories[n].id}`)?.focus();
                        }
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1.5 text-[0.6875rem] font-medium transition-all duration-500 ease-[var(--ease-out-expo)] sm:px-4 sm:py-2 sm:text-sm ${
                        on
                          ? "scale-105 border-transparent bg-fg text-ink shadow-[0_0_40px_-6px_rgb(62_230_160/0.6)]"
                          : "border-line-2 bg-ink-2/90 text-muted hover:text-fg"
                      }`}
                      style={{ left: `${50 + Math.cos(a) * RADIUS}%`, top: `${50 + Math.sin(a) * RADIUS}%` }}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Detail panel */}
          <div className="lg:col-span-5">
            <div
              id="stack-panel"
              role="tabpanel"
              aria-labelledby={`tab-${cat.id}`}
              className="relative min-h-[19rem] border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-emerald">
                    {String(active + 1).padStart(2, "0")} / {String(stackCategories.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-[2.5rem] font-medium leading-none tracking-[-0.04em] md:text-5xl">
                    {cat.label}
                  </h3>
                  <p className="mt-4 max-w-sm leading-relaxed text-muted">{cat.blurb}</p>
                  <ul className="mt-8 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
                    {cat.items.map((it, j) => (
                      <motion.li
                        key={it.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease, delay: 0.08 + j * 0.05 }}
                        className="flex items-center gap-4 bg-ink-2 px-5 py-4"
                      >
                        <BrandIcon name={it.icon} className="size-[1.1rem] text-fg/80" />
                        <span className="text-[0.9375rem]">{it.name}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
