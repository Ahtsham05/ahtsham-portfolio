import { problems } from "@/content/carrentals/content";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { problemVisuals } from "../visuals/ProblemVisuals";

export function RentalProblems() {
  return (
    <section id="why" aria-labelledby="problem-title" className="section-y relative">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel index="01">The problem</SectionLabel>
            <RevealLines
              id="problem-title"
              className="h-section mt-8"
              lines={[
                "Most rental websites",
                <span key="l1">
                  make customers <span className="serif-em text-muted">work too hard.</span>
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="lede max-w-sm">
              Customers comparing rentals have several tabs open. The business that makes choosing and booking easiest
              usually wins.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => {
            const Visual = problemVisuals[i];
            return (
              <Reveal as="li" key={p.title} delay={i * 0.07} className="surface group relative flex flex-col overflow-hidden rounded-3xl">
                <div className="relative aspect-[7/4] border-b border-line bg-[radial-gradient(ellipse_at_50%_120%,rgb(255_155_138/0.06),transparent_60%)] p-4 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]">
                  <Visual />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-[0.6875rem] text-dim">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-xl font-medium tracking-[-0.025em]">{p.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <div className="mt-24 grid gap-6 border-t border-line pt-14 md:mt-32 lg:grid-cols-12">
          <Reveal y={10} className="lg:col-span-3">
            <p className="eyebrow text-emerald">The shift</p>
          </Reveal>
          <RevealLines
            as="p"
            className="text-[clamp(1.9rem,4.4vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.04em] lg:col-span-9"
            lines={[
              <span key="a" className="text-muted">Your website should not just display cars.</span>,
              <span key="b">
                It should help <span className="serif-em text-emerald-soft">rent them.</span>
              </span>,
            ]}
          />
        </div>
      </div>
    </section>
  );
}
