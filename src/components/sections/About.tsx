import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal, RevealLines } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { LayerStack } from "../visuals/LayerStack";

const lifecycle = ["Architecture", "Interface", "Backend", "Payments", "Auth", "Deployment", "Automation"];

export function About() {
  return (
    <section id="about" data-stage="1" aria-labelledby="about-title" className="section-y relative">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-20%] top-[10%] -z-10 h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(circle,rgb(62_230_160/0.07),transparent_65%)]"
      />
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-6">
          <SectionLabel index="01">About</SectionLabel>
          <RevealLines
            id="about-title"
            className="h-section mt-8"
            lines={[
              "I don’t just",
              "write code.",
              <span key="l1">
                I build <span className="serif-em text-emerald-soft">systems.</span>
              </span>,
            ]}
          />

          <Reveal delay={0.1} className="mt-10 max-w-xl space-y-5">
            <p className="text-lg leading-relaxed text-fg/90">
              I’m a full-stack developer focused on building SaaS products, modern web experiences, and AI-powered
              business systems.
            </p>
            <p className="lede">
              I work across the entire product lifecycle — from architecture and interface design to backend systems,
              payments, authentication, deployment, and automation. One person, accountable for the whole system.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10">
            <ul className="flex max-w-xl flex-wrap gap-2" aria-label="What I cover">
              {lifecycle.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted"
                >
                  {s}
                </li>
              ))}
            </ul>
            <Link
              href="/#process"
              className="group mt-10 inline-flex items-center gap-2 text-sm text-fg underline-offset-8 hover:underline"
            >
              How I work
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6 lg:pl-6">
          <LayerStack />
        </Reveal>
      </div>
    </section>
  );
}
