"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { testimonials } from "@/content/testimonials";
import { RevealLines, Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { useReducedMotionPref } from "@/lib/hooks";

const ease = [0.16, 1, 0.3, 1] as const;

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotionPref();
  const n = testimonials.length;
  const t = testimonials[i];

  const go = (d: number) => {
    setDir(d);
    setI((v) => (v + d + n) % n);
  };

  useEffect(() => {
    if (paused || reduce || n < 2) return;
    const id = setTimeout(() => {
      setDir(1);
      setI((v) => (v + 1) % n);
    }, 7000);
    return () => clearTimeout(id);
  }, [i, paused, reduce, n]);

  return (
    <section id="testimonials" data-stage="8" aria-labelledby="testimonials-title" className="section-y relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[70vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(62_230_160/0.06),transparent_65%)]" />
      </div>
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionLabel index="08">Kind words</SectionLabel>
            <RevealLines
              id="testimonials-title"
              className="h-section mt-8"
              lines={[
                <span key="l1">
                  In their <span className="serif-em text-emerald-soft">words.</span>
                </span>,
              ]}
            />
          </div>
          <Reveal className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid size-12 place-items-center rounded-full border border-line-2 text-muted transition-colors hover:border-emerald/50 hover:text-fg"
            >
              <ArrowLeft className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid size-12 place-items-center rounded-full border border-line-2 text-muted transition-colors hover:border-emerald/50 hover:text-fg"
            >
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14 md:mt-20">
          <figure
            className="relative min-h-[22rem] md:min-h-[20rem]"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            aria-roledescription="carousel"
            aria-label="Client testimonials"
          >
            <span aria-hidden className="serif-em pointer-events-none absolute -top-10 right-0 select-none text-[12rem] leading-none text-emerald/[0.08] md:-top-20 md:text-[22rem]">
              “
            </span>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir * 30, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: dir * -30, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease }}
                className="relative"
                aria-live="polite"
              >
                <blockquote className="max-w-5xl text-[1.625rem] leading-[1.25] tracking-[-0.025em] text-fg md:text-[2.75rem] md:leading-[1.15]">
                  <p>
                    <span className="serif-em">“</span>
                    {t.quote}
                    <span className="serif-em">”</span>
                  </p>
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  {t.avatar ? (
                    <Image src={t.avatar} alt={t.name} width={56} height={56} className="size-14 rounded-full object-cover" />
                  ) : (
                    <span className="grid size-14 place-items-center rounded-full border border-emerald/30 bg-[radial-gradient(circle_at_30%_30%,#183a2b,#0b0d0c)] font-mono text-sm text-emerald-soft">
                      {initials(t.name)}
                    </span>
                  )}
                  <span>
                    <span className="block font-medium">{t.name}</span>
                    <span className="block text-sm text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </motion.div>
            </AnimatePresence>
          </figure>

          <div className="mt-12 flex items-center gap-2" role="group" aria-label="Choose testimonial">
            {testimonials.map((_, j) => (
              <button
                key={j}
                type="button"
                onClick={() => {
                  setDir(j > i ? 1 : -1);
                  setI(j);
                }}
                aria-label={`Show testimonial ${j + 1}`}
                aria-current={j === i}
                className="group flex h-6 items-center"
              >
                <span className={`block h-px transition-all duration-700 ease-[var(--ease-out-expo)] ${j === i ? "w-12 bg-emerald" : "w-6 bg-line-2 group-hover:bg-fg/40"}`} />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
