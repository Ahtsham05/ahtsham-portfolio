"use client";

import { motion } from "motion/react";
import { site } from "@/content/site";
import { useAppReady } from "@/lib/ready";
import { useMediaQuery } from "@/lib/hooks";
import { RevealLines } from "../ui/Reveal";
import { ButtonLink } from "../ui/Button";
import { HeroVisual } from "../three/HeroVisual";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ready = useAppReady();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const fade = (delay: number, y = 18) => ({
    initial: { opacity: 0, y },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1.1, ease, delay },
  });

  return (
    <section
      id="top"
      data-stage="0"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 md:pt-36 lg:min-h-[100svh] lg:pt-40"
    >
      {/* Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-[38%] left-1/2 h-[90vh] w-[130vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgb(62_230_160/0.16),rgb(62_230_160/0.04)_40%,transparent_68%)]" />
        <div className="absolute right-[-10%] top-[20%] h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(circle,rgb(143_107_255/0.12),transparent_62%)] blur-2xl" />
        <div className="bg-grid mask-radial absolute inset-0 opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="container-x relative">
        {/* 3D composition — absolute on desktop, stacked on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.8, ease, delay: 0.2 }}
          className="pointer-events-none absolute right-[-11%] top-[-2rem] hidden aspect-square w-[52%] max-w-[760px] lg:block xl:right-[-6%] xl:top-[-4rem] xl:w-[58%]"
        >
          {desktop && <HeroVisual />}
        </motion.div>

        <div className="relative z-10 max-w-[56rem]">
          <motion.p {...fade(0.1, 10)} className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald/60" />
              <span className="relative size-2 rounded-full bg-emerald" />
            </span>
            Full-stack <span className="text-dim">•</span> SaaS <span className="text-dim">•</span> AI Automation
          </motion.p>

          <RevealLines
            as="h1"
            id="hero-title"
            play={ready}
            delay={0.18}
            stagger={0.1}
            className="display mt-7 text-[clamp(2.85rem,6.4vw,6.25rem)] text-fg"
            lines={[
              "From idea",
              <span key="l1">
                to <span className="serif-em text-shine pr-[0.06em]">intelligent</span>
              </span>,
              <span key="l2">
                digital product<span className="text-emerald">.</span>
              </span>,
            ]}
          />

          <motion.p {...fade(0.55)} className="lede mt-8 max-w-[34rem]">
            I design and build high-performance websites, scalable SaaS products, and AI-powered automations that help
            businesses move faster.
          </motion.p>

          <motion.div {...fade(0.65)} className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="/#work">View My Work</ButtonLink>
            <ButtonLink href="/#contact" variant="outline">
              Let&apos;s Build Something
            </ButtonLink>
          </motion.div>
        </div>

        {/* Mobile / tablet visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 1.4, ease, delay: 0.5 }}
          className="pointer-events-none relative -mx-[var(--gutter)] mt-6 aspect-square max-h-[520px] w-[calc(100%+2*var(--gutter))] lg:hidden"
        >
          {!desktop && <HeroVisual />}
        </motion.div>

        {/* Stats */}
        <motion.dl
          {...fade(0.85)}
          className="relative z-10 mt-4 grid grid-cols-2 border-t border-line md:grid-cols-4 lg:mt-28"
        >
          {site.stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-6 md:py-8 ${i > 0 ? "md:pl-8" : ""} ${i % 2 === 1 ? "border-l border-line pl-5" : ""} ${
                i > 1 ? "border-t border-line md:border-t-0" : ""
              } ${i === 2 ? "md:border-l" : ""}`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span
                  className={`block text-[2rem] leading-none tracking-[-0.04em] md:text-[2.5rem] ${
                    /\d/.test(s.value) ? "font-medium" : "serif-em"
                  }`}
                >
                  {s.value}
                </span>
                <span className="mt-3 block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
