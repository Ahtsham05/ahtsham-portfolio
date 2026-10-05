import { concepts } from "@/content/carrentals/content";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TiltCard } from "@/components/ui/TiltCard";
import { ExoticMock, LocalMock, LuxuryMock } from "../visuals/ConceptMocks";

const mocks = { luxury: LuxuryMock, local: LocalMock, exotic: ExoticMock } as const;

export function DesignConcepts() {
  return (
    <section id="examples" aria-labelledby="examples-title" className="section-y relative">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel index="12">Examples</SectionLabel>
            <RevealLines
              id="examples-title"
              className="display mt-8 text-[clamp(2.3rem,5.6vw,5rem)] uppercase"
              lines={[
                "What your website",
                <span key="l1" className="serif-em normal-case text-silver">
                  could look like.
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="lede max-w-sm">
              Three directions for three kinds of rental business. These are design concepts — not client projects.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {concepts.map((c, i) => {
            const Mock = mocks[c.key];
            return (
              <Reveal as="li" key={c.key} delay={i * 0.08} className={i === 2 ? "md:col-span-2 xl:col-span-1" : ""}>
                <TiltCard max={4} className="surface h-full rounded-[28px]">
                  <article className="flex h-full flex-col p-4 sm:p-5">
                    <div className="relative">
                      <Mock />
                      <span className="absolute left-3 top-10 rounded-full border border-white/15 bg-ink/80 px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-fg/90 backdrop-blur">
                        Design concept
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col px-2 pb-2 pt-6">
                      <p className="flex items-center justify-between font-mono text-[0.6875rem]">
                        <span className="text-emerald">{String(i + 1).padStart(2, "0")}</span>
                        <span className="uppercase tracking-[0.18em] text-dim">{c.style}</span>
                      </p>
                      <h3 className="mt-3 text-2xl font-medium uppercase tracking-[-0.01em]">{c.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted">{c.body}</p>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
