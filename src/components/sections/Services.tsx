import { services } from "@/content/content";
import { Reveal, RevealLines } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { TiltCard } from "../ui/TiltCard";
import { ServiceVisual } from "../visuals/ServiceVisuals";

export function Services() {
  return (
    <section id="services" data-stage="3" aria-labelledby="services-title" className="section-y relative">
      <div className="container-x">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="02">What I build</SectionLabel>
            <RevealLines
              id="services-title"
              className="h-section mt-8"
              lines={[
                "Digital products built",
                <span key="l1">
                  to do <span className="serif-em text-emerald-soft">real work.</span>
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="lede max-w-md">
              Most projects start with a website. The best ones grow into products, connected systems — and eventually,
              intelligence.
            </p>
            {/* the progression, in one line */}
            <ol className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-dim">
              {services.map((s, i) => (
                <li key={s.stage} className="flex items-center gap-2.5">
                  <span className={i === services.length - 1 ? "text-violet-soft" : "text-muted"}>
                    {s.stageLabel.replace("The ", "")}
                  </span>
                  {i < services.length - 1 && <span aria-hidden className="h-px w-5 bg-line-2" />}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5">
          {services.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 2) * 0.08}>
              <TiltCard className="surface group h-full rounded-[22px]">
                <article className="flex h-full flex-col p-6 md:p-8">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
                      <span className="text-emerald">{s.stage}</span> — {s.stageLabel}
                    </span>
                    <span className="flex gap-1" aria-hidden>
                      {services.map((_, j) => (
                        <span
                          key={j}
                          className={`h-1 w-3 rounded-full ${j <= i ? "bg-emerald/70" : "bg-white/10"}`}
                        />
                      ))}
                    </span>
                  </div>

                  <div className="relative my-6 aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-[radial-gradient(ellipse_at_50%_120%,rgb(62_230_160/0.08),transparent_60%)] md:my-8">
                    <div className="bg-grid absolute inset-0 opacity-40 [background-size:24px_24px]" />
                    <div className="relative h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]">
                      <ServiceVisual kind={s.visual} />
                    </div>
                  </div>

                  <h3 className="text-[1.625rem] font-medium tracking-[-0.03em] md:text-[2rem]">{s.title}</h3>
                  <p className="mt-3 max-w-[34rem] leading-relaxed text-muted">{s.body}</p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    {s.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[0.6875rem] text-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
