"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/content/projects";
import { Reveal, RevealLines } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { ProjectVisual } from "../visuals/ProjectVisuals";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-5%", "5%"]);
  const flip = index % 2 === 1;
  const href = `/work/${project.slug}`;

  return (
    <article className="group grid items-center gap-8 md:gap-10 lg:grid-cols-12 lg:gap-14">
      <Reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`} y={40}>
        <Link
          href={href}
          data-cursor="project"
          data-cursor-label="View project"
          aria-label={`View case study: ${project.title}`}
          className="block"
        >
          <div
            ref={ref}
            className="relative aspect-[16/11] overflow-hidden rounded-[22px] border border-line bg-ink-2 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)] transition-[border-color] duration-700 group-hover:border-line-2 md:rounded-[28px]"
          >
            <motion.div style={{ y }} className="absolute inset-[-6%_0] transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.025]">
              <ProjectVisual kind={project.visual} />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]" />
            <span className="absolute left-5 top-5 font-mono text-[0.6875rem] tracking-[0.2em] text-fg/70 md:left-7 md:top-6">
              {project.number} / {String(projects.length).padStart(2, "0")}
            </span>
            <span className="absolute bottom-5 right-5 grid size-11 place-items-center rounded-full border border-line-2 bg-ink/70 text-fg backdrop-blur-md transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:bg-fg group-hover:text-ink md:bottom-6 md:right-6 md:size-12">
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </div>
        </Link>
      </Reveal>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <Reveal y={20}>
          <p className="eyebrow">
            <span className="text-emerald">{project.number}</span> — {project.category}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="mt-5 text-[2.5rem] font-medium leading-[0.95] tracking-[-0.045em] md:text-[3.5rem]">
            <Link href={href} className="transition-colors hover:text-emerald-soft">
              {project.title}
            </Link>
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-lg leading-relaxed text-muted">{project.summary}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <dl className="mt-8 space-y-6 border-t border-line pt-6">
            <div>
              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim">Stack</dt>
              <dd className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <span key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6875rem] text-muted">
                    {t}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim">Outcome</dt>
              <dd className="mt-3 text-[1.0625rem] leading-snug text-fg/90">
                <span className="serif-em text-xl text-emerald-soft">“</span>
                {project.outcome}
              </dd>
            </div>
          </dl>
        </Reveal>
        <Reveal delay={0.2}>
          <Link
            href={href}
            className="group/link mt-9 inline-flex items-center gap-3 text-sm font-medium text-fg"
          >
            <span className="relative">
              View Case Study
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-fg/30 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/link:bg-emerald" />
            </span>
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" data-stage="4" aria-labelledby="work-title" className="section-y relative">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-15%] top-0 -z-10 h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(circle,rgb(143_107_255/0.07),transparent_65%)]"
      />
      <div className="container-x">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel index="03">Selected work</SectionLabel>
            <RevealLines
              id="work-title"
              className="h-section mt-8"
              lines={[
                "Products I’ve helped",
                <span key="l1">
                  bring to <span className="serif-em text-emerald-soft">life.</span>
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-4 lg:text-right">
            <p className="lede lg:ml-auto lg:max-w-xs">
              From compliance SaaS to AI-driven operations — each one a complete system, not just a set of screens.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 space-y-28 md:mt-28 md:space-y-36 lg:space-y-44">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
