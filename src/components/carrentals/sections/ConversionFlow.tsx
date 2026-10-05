"use client";

import { conversionStages } from "@/content/carrentals/content";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useReducedMotionPref } from "@/lib/hooks";

const XS = [100, 300, 500, 700, 900];
const CY = 110;
const halfH = (x: number) => 82 - (x / 1000) * 62;

/** Streams of visitors converging into bookings. Purely illustrative — no data implied. */
function Funnel() {
  const reduce = useReducedMotionPref();
  const starts = [36, 58, 80, 102, 124, 146, 168, 186];
  return (
    <svg viewBox="0 0 1000 230" className="h-auto w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="cf-ribbon" x1="0" x2="1">
          <stop offset="0" stopColor="#eceee9" stopOpacity="0.05" />
          <stop offset="0.6" stopColor="#3ee6a0" stopOpacity="0.12" />
          <stop offset="1" stopColor="#8f6bff" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="cf-edge" x1="0" x2="1">
          <stop offset="0" stopColor="#eceee9" stopOpacity="0.1" />
          <stop offset="1" stopColor="#3ee6a0" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id="cf-dot">
          <stop offset="0" stopColor="#eafff6" />
          <stop offset="1" stopColor="#3ee6a0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d={`M0 ${CY - 82} C 300 ${CY - 78}, 620 ${CY - 30}, 1000 ${CY - 20} L 1000 ${CY + 20} C 620 ${CY + 30}, 300 ${CY + 78}, 0 ${CY + 82} Z`}
        fill="url(#cf-ribbon)"
      />
      <path d={`M0 ${CY - 82} C 300 ${CY - 78}, 620 ${CY - 30}, 1000 ${CY - 20}`} fill="none" stroke="url(#cf-edge)" />
      <path d={`M0 ${CY + 82} C 300 ${CY + 78}, 620 ${CY + 30}, 1000 ${CY + 20}`} fill="none" stroke="url(#cf-edge)" />

      {XS.map((x, i) => (
        <g key={x}>
          <line x1={x} x2={x} y1={CY - halfH(x) - 6} y2={CY + halfH(x) + 6} stroke="rgb(236 238 233 / 0.12)" strokeDasharray="2 4" />
          <circle cx={x} cy={CY} r={i === 4 ? 9 : 5} fill={i === 4 ? "#3ee6a0" : "#0b0d0c"} stroke="#3ee6a0" strokeOpacity={0.4 + i * 0.15} />
          {i === 4 && <circle cx={x} cy={CY} r="20" fill="none" stroke="#3ee6a0" strokeOpacity="0.3" className="animate-pulse-soft origin-center [transform-box:fill-box]" />}
        </g>
      ))}

      {!reduce &&
        starts.map((y0, i) => {
          const d = `M -20 ${y0} C 320 ${y0}, 620 ${CY + (y0 - CY) * 0.28}, 1000 ${CY}`;
          // a few streams fade before the end — not every visitor books
          const drops = i % 3 === 1;
          return (
            <g key={y0}>
              <circle r="4" fill="url(#cf-dot)">
                <animateMotion dur={`${4.2 + (i % 4) * 0.7}s`} begin={`${i * -0.65}s`} repeatCount="indefinite" path={d} />
                {drops && <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.45;0.6;1" dur={`${4.2 + (i % 4) * 0.7}s`} begin={`${i * -0.65}s`} repeatCount="indefinite" />}
              </circle>
            </g>
          );
        })}
    </svg>
  );
}

export function ConversionFlow() {
  return (
    <section id="conversion" aria-labelledby="conversion-title" className="section-y relative">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel index="07">Conversion</SectionLabel>
            <RevealLines
              id="conversion-title"
              className="h-section mt-8"
              lines={[
                "Your website should do more",
                <span key="l1">
                  than <span className="serif-em text-muted">look good.</span>
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="lede max-w-sm">
              I design every important interaction around turning traffic into real rental inquiries and bookings.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-16 hidden md:block">
          <div className="relative">
            <Funnel />
          </div>
          <ol className="mt-8 grid grid-cols-5 gap-6">
            {conversionStages.map((s, i) => (
              <li key={s.stage} className="text-center">
                <p className="font-mono text-[0.625rem] text-emerald">{String(i + 1).padStart(2, "0")}</p>
                <h3 className={`mt-2 text-xl font-medium uppercase tracking-[0.08em] ${i === 4 ? "text-emerald-soft" : ""}`}>{s.stage}</h3>
                <p className="mx-auto mt-3 max-w-[14rem] text-sm leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* phones: narrowing stack */}
        <ol className="mt-14 space-y-2 md:hidden">
          {conversionStages.map((s, i) => (
            <Reveal as="li" key={s.stage} y={14} delay={i * 0.05}>
              <div
                className="mx-auto rounded-2xl border border-line bg-[linear-gradient(90deg,rgb(62_230_160/0.04),rgb(143_107_255/0.08))] px-5 py-4"
                style={{ width: `${100 - i * 7}%` }}
              >
                <p className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.625rem] text-emerald">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`text-base font-medium uppercase tracking-[0.08em] ${i === 4 ? "text-emerald-soft" : ""}`}>{s.stage}</span>
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.15}>
          <p className="mt-14 flex items-center justify-center gap-2 text-center text-xs text-dim">
            <span className="size-1 rounded-full bg-dim" /> No inflated stats here — just the interactions that move people
            forward.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
