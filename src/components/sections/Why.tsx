import { principles } from "@/content/content";
import { Reveal, RevealLines } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";

const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const };

/** A single-line mark for each principle. */
function Glyph({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 48 48" className="size-12 text-fg/40 transition-colors duration-500 group-hover:text-emerald" aria-hidden>
      {i === 0 && (
        <>
          <circle cx="24" cy="24" r="16" {...s} />
          <circle cx="24" cy="24" r="9" {...s} />
          <circle cx="24" cy="24" r="2.5" fill="currentColor" />
          <path d="M24 2 v8 M24 38 v8 M2 24 h8 M38 24 h8" {...s} />
        </>
      )}
      {i === 1 && (
        <>
          <rect x="8" y="30" width="32" height="8" rx="2" {...s} />
          <rect x="12" y="20" width="24" height="8" rx="2" {...s} />
          <rect x="16" y="10" width="16" height="8" rx="2" {...s} className="transition-transform duration-500 group-hover:-translate-y-1" />
        </>
      )}
      {i === 2 && (
        <>
          <rect x="6" y="9" width="36" height="28" rx="5" {...s} />
          <path d="M6 16 h36" {...s} />
          <path d="M24 24 l0 13 l3.5 -3 l2.5 5 l2 -1 l-2.4 -5 h4.4 z" fill="currentColor" className="transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1" />
        </>
      )}
      {i === 3 && (
        <path
          d="M14 24 c0 -5 4 -8 8 -4 l4 8 c4 4 8 1 8 -4 s-4 -8 -8 -4 l-4 8 c-4 4 -8 1 -8 -4 Z"
          {...s}
          className="origin-center transition-transform duration-700 group-hover:rotate-180 [transform-box:fill-box]"
        />
      )}
    </svg>
  );
}

export function Why() {
  return (
    <section id="why" data-stage="8" aria-labelledby="why-title" className="section-y relative">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="07">Why work with me</SectionLabel>
            <RevealLines
              id="why-title"
              className="h-section mt-8"
              lines={[
                <span key="l1">
                  More than a <span className="serif-em text-emerald-soft">developer.</span>
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="lede max-w-md">
              You get a partner who thinks about your business, your users and your next stage of growth — not just the
              next ticket.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 border-t border-line md:mt-20">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 0.05} y={16}>
              <div className="group relative grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-3 border-b border-line py-8 md:grid-cols-12 md:gap-x-8 md:py-10">
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-gradient-to-r from-emerald to-violet transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
                <span className="font-mono text-xs text-emerald md:col-span-1">{p.n}</span>
                <h3 className="text-[1.625rem] font-medium leading-tight tracking-[-0.035em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2 md:col-span-5 md:text-[2.5rem]">
                  {p.title}
                </h3>
                <p className="col-start-2 max-w-md leading-relaxed text-muted md:col-span-4 md:col-start-auto">{p.body}</p>
                <div className="hidden justify-end md:col-span-2 md:flex">
                  <Glyph i={i} />
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
