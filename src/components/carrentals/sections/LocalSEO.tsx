"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FileText, Search } from "lucide-react";
import { seoExamples } from "@/content/carrentals/content";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useInView, useReducedMotionPref } from "@/lib/hooks";

const ease = [0.16, 1, 0.3, 1] as const;

/** Types each example search, then lights up the page built for it. */
export function LocalSEO() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, "-10% 0px");
  const reduce = useReducedMotionPref();
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!inView || reduce) return;
    const q = seoExamples[active].query;
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const type = () => {
      i += 1;
      setTyped(q.slice(0, i));
      if (i < q.length) t = setTimeout(type, 45 + Math.random() * 40);
      else t = setTimeout(() => setActive((a) => (a + 1) % seoExamples.length), 2600);
    };
    t = setTimeout(type, 350);
    return () => clearTimeout(t);
  }, [active, inView, reduce]);

  const ex = seoExamples[active];
  // Reduced motion: no typing, the query is simply shown.
  const shown = reduce ? ex.query : typed;

  return (
    <section id="seo" aria-labelledby="seo-title" className="section-y relative">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index="11">Local search</SectionLabel>
          <RevealLines
            id="seo-title"
            className="h-section mt-8"
            lines={[
              "Be there when",
              <span key="l1">
                they’re <span className="serif-em text-emerald-soft">ready to rent.</span>
              </span>,
            ]}
          />
          <Reveal delay={0.1}>
            <p className="lede mt-8 max-w-md">
              Build dedicated pages that help customers discover your business when they’re ready to rent — one for each
              location, vehicle type and service you offer.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-10 space-y-3 text-sm text-muted">
              {["Location and service pages with clear, local content", "Fast, mobile-friendly pages search engines can crawl", "Structured data for your business, vehicles and locations"].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-emerald" /> {t}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-dim">
              SEO is earned over time — I build the right foundations; I don’t promise rankings.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="min-w-0 lg:col-span-7">
          <div ref={ref} className="surface relative overflow-hidden rounded-[28px] p-4 sm:p-6">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[radial-gradient(circle,rgb(62_230_160/0.1),transparent_65%)]" />

            {/* search bar */}
            <div className="relative flex items-center gap-3 rounded-full border border-line-2 bg-ink px-5 py-3.5">
              <Search className="size-4 text-muted" aria-hidden />
              <span className="flex-1 truncate text-[0.9375rem]" aria-live="polite">
                {shown}
                <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-emerald" aria-hidden />
              </span>
              <span className="hidden font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-dim sm:block">Example search</span>
            </div>

            {/* result for the active query */}
            <div className="relative mt-5 min-h-[9rem]">
              <AnimatePresence mode="wait">
                <motion.article
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: shown === ex.query ? 1 : 0.35, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease }}
                  className="rounded-2xl border border-emerald/30 bg-emerald/[0.04] p-5"
                >
                  <p className="flex items-center gap-2 font-mono text-[0.6875rem] text-muted">
                    <span className="grid size-5 place-items-center rounded-full bg-white/10 text-[0.5rem] font-semibold text-fg">YB</span>
                    yourrentals.com <span className="text-dim">{ex.path.split("/").filter(Boolean).join(" › ")}</span>
                  </p>
                  <h3 className="mt-2.5 text-lg font-medium tracking-[-0.02em] text-emerald-soft">{ex.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{ex.body}</p>
                </motion.article>
              </AnimatePresence>
            </div>

            {/* site structure */}
            <div className="mt-6 rounded-2xl border border-line bg-ink/60 p-5">
              <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-dim">Your site structure</p>
              <ul className="mt-4 space-y-1 font-mono text-xs">
                <li className="text-fg/80">yourrentals.com/</li>
                {seoExamples.map((e, i) => (
                  <li key={e.path}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={`flex w-full items-center gap-2 rounded-lg py-1.5 pl-5 pr-2 text-left transition-colors duration-300 ${
                        i === active ? "bg-emerald/10 text-emerald-soft" : "text-muted hover:text-fg"
                      }`}
                    >
                      <span aria-hidden className="text-dim">└</span>
                      <FileText className="size-3.5 shrink-0" aria-hidden />
                      <span className="truncate">{e.path}</span>
                      <span className="ml-auto hidden truncate pl-3 font-sans text-[0.6875rem] text-dim sm:block">“{e.query}”</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
