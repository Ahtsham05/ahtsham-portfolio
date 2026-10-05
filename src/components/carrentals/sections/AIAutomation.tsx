"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Check, Database, Globe, Mail, RotateCcw, Star, UserPlus } from "lucide-react";
import { automationSteps } from "@/content/carrentals/content";
import { brandPath } from "@/components/ui/BrandIcon";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useInView, useReducedMotionPref } from "@/lib/hooks";

type NodeId = "website" | "lead" | "crm" | "whatsapp" | "email" | "booking" | "review";

/** Orbit order follows the flow: Website → Lead → (AI) → CRM → WhatsApp → Email → Booking → Review */
const NODES: { id: NodeId; label: string; Icon?: typeof Globe }[] = [
  { id: "website", label: "Website", Icon: Globe },
  { id: "lead", label: "Lead", Icon: UserPlus },
  { id: "crm", label: "CRM", Icon: Database },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "email", label: "Email", Icon: Mail },
  { id: "booking", label: "Booking", Icon: CalendarCheck },
  { id: "review", label: "Review", Icon: Star },
];

const C = 300;
const R = 222;
const pos = (i: number) => {
  const a = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
  return { x: Math.round((C + Math.cos(a) * R) * 100) / 100, y: Math.round((C + Math.sin(a) * R) * 100) / 100 };
};

function Graph({ active, aiActive, done }: { active: string | null; aiActive: boolean; done: boolean }) {
  return (
    <svg viewBox="0 0 600 600" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <radialGradient id="ai-halo">
          <stop offset="0" stopColor="#8f6bff" stopOpacity="0.28" />
          <stop offset="0.5" stopColor="#3ee6a0" stopOpacity="0.08" />
          <stop offset="1" stopColor="#3ee6a0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ai-core" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#2a2148" />
          <stop offset="1" stopColor="#0a0b0c" />
        </radialGradient>
        <linearGradient id="ai-beam" x1="0" x2="1">
          <stop offset="0" stopColor="#3ee6a0" />
          <stop offset="1" stopColor="#8f6bff" />
        </linearGradient>
      </defs>

      <circle cx={C} cy={C} r="230" fill="url(#ai-halo)" />
      <circle cx={C} cy={C} r={R} fill="none" stroke="rgb(236 238 233 / 0.07)" />
      <circle cx={C} cy={C} r="150" fill="none" stroke="rgb(143 107 255 / 0.18)" strokeDasharray="1 6" className="origin-center animate-spin-slow [transform-box:fill-box]" />

      {/* flow ring between consecutive nodes */}
      {NODES.map((n, i) => {
        if (i === NODES.length - 1) return null;
        const a = pos(i);
        const b = pos(i + 1);
        return <line key={`ring-${n.id}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgb(236 238 233 / 0.06)" />;
      })}

      {NODES.map((n, i) => {
        const p = pos(i);
        const lit = active === n.id || done;
        const ix = C + (p.x - C) * 0.38;
        const iy = C + (p.y - C) * 0.38;
        const ex = C + (p.x - C) * 0.83;
        const ey = C + (p.y - C) * 0.83;
        return (
          <g key={n.id}>
            <line x1={ix} y1={iy} x2={ex} y2={ey} stroke="rgb(236 238 233 / 0.07)" />
            <line x1={ix} y1={iy} x2={ex} y2={ey} stroke="url(#ai-beam)" strokeWidth="1.5" className="flow-dash transition-opacity duration-500" style={{ opacity: active === n.id ? 1 : done ? 0.35 : 0 }} />
            {active === n.id && (
              <circle r="3.5" fill="#f2f0ea">
                <animate attributeName="cx" from={ex} to={ix} dur="0.9s" repeatCount="indefinite" />
                <animate attributeName="cy" from={ey} to={iy} dur="0.9s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={p.x} cy={p.y} r="42" fill="none" stroke="rgb(62 230 160 / 0.3)" className="transition-opacity duration-500" style={{ opacity: active === n.id ? 1 : 0 }} />
            <circle cx={p.x} cy={p.y} r="32" fill="#0c0f0d" stroke={lit ? "rgb(62 230 160 / 0.8)" : "rgb(236 238 233 / 0.14)"} className="transition-[stroke] duration-500" />
            {n.Icon ? (
              <n.Icon x={p.x - 10} y={p.y - 10} width={20} height={20} strokeWidth={1.6} color={lit ? "#f2f0ea" : "rgb(236 238 233 / 0.5)"} />
            ) : (
              <g transform={`translate(${p.x - 10} ${p.y - 10}) scale(${20 / 24})`}>
                <path d={brandPath("whatsapp")} fill={lit ? "#f2f0ea" : "rgb(236 238 233 / 0.5)"} />
              </g>
            )}
            <text x={p.x} y={p.y + 56} textAnchor="middle" fontSize="11" letterSpacing="1.5" className="font-mono transition-[fill] duration-500 max-sm:[font-size:17px]" fill={lit ? "#f2f0ea" : "#757c77"}>
              {n.label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* core */}
      <circle cx={C} cy={C} r="84" fill="url(#ai-core)" stroke={aiActive ? "rgb(185 165 255 / 0.9)" : "rgb(143 107 255 / 0.45)"} className="transition-[stroke] duration-500" />
      <circle cx={C} cy={C} r="84" fill="none" stroke="rgb(143 107 255 / 0.4)" strokeWidth="10" opacity={aiActive ? 0.7 : 0.15} className="animate-pulse-soft origin-center transition-opacity duration-500 [transform-box:fill-box]" />
      <text x={C} y={C - 4} textAnchor="middle" fontSize="38" className="font-serif italic" fill="#f2f0ea">
        AI
      </text>
      <text x={C} y={C + 20} textAnchor="middle" fontSize="8.5" letterSpacing="2" className="font-mono max-sm:[font-size:12px]" fill="#b9a5ff">
        RENTAL ASSISTANT
      </text>
    </svg>
  );
}

export function AIAutomation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, "-15% 0px");
  const reduce = useReducedMotionPref();
  const [rawStep, setStep] = useState(-1);
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    let s = -1;
    let timer: ReturnType<typeof setTimeout>;
    const advance = () => {
      s += 1;
      setStep(s);
      if (s < automationSteps.length) timer = setTimeout(advance, 1450);
      else
        timer = setTimeout(() => {
          s = -1;
          setStep(-1);
          timer = setTimeout(advance, 700);
        }, 3600);
    };
    timer = setTimeout(advance, 400);
    return () => clearTimeout(timer);
  }, [inView, reduce, runKey]);

  const step = reduce ? automationSteps.length : rawStep;
  const current = step >= 0 && step < automationSteps.length ? automationSteps[step] : null;
  const done = step >= automationSteps.length;

  return (
    <section id="automation" aria-labelledby="automation-title" className="section-y relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-[15%] h-[90vh] w-[80vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(143_107_255/0.11),transparent_62%)]" />
      </div>

      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel index="08">AI + Automation</SectionLabel>
            <RevealLines
              id="automation-title"
              className="h-section mt-8"
              lines={[
                "Your rental business",
                <span key="l1">
                  shouldn’t follow up <span className="serif-em text-violet-soft">manually.</span>
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="lede max-w-sm">
              Inquiries answered in seconds, CRM kept up to date, confirmations and review requests sent on time —
              without anyone copying details between apps.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="mt-14 grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="relative mx-auto aspect-square w-full max-w-[560px] lg:order-2 lg:col-span-7 lg:max-w-none">
            <Graph active={current?.node === "ai" ? null : (current?.node ?? null)} aiActive={current?.node === "ai" || done} done={done} />
          </Reveal>

          <Reveal delay={0.1} className="min-w-0 lg:col-span-5">
            <div className="surface overflow-hidden rounded-3xl">
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <p className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                  <span className={`size-1.5 rounded-full ${done ? "bg-emerald" : "animate-pulse bg-violet"}`} />
                  Sample workflow
                </p>
                <button
                  type="button"
                  onClick={() => setRunKey((k) => k + 1)}
                  className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-dim transition-colors hover:text-fg"
                >
                  <RotateCcw className="size-3" aria-hidden /> Replay
                </button>
              </div>
              <ol className="px-5 py-3">
                {automationSteps.map((s, i) => {
                  const state = i < step || done ? "done" : i === step ? "active" : "todo";
                  return (
                    <li key={s.title} className="relative flex gap-4 py-2.5">
                      {i < automationSteps.length - 1 && (
                        <span aria-hidden className={`absolute left-[0.6875rem] top-9 h-[calc(100%-1.5rem)] w-px transition-colors duration-500 ${state === "done" ? "bg-emerald/50" : "bg-line-2"}`} />
                      )}
                      <span
                        className={`relative z-10 mt-0.5 grid size-[1.375rem] shrink-0 place-items-center rounded-full border text-[0.5625rem] transition-all duration-500 ${
                          state === "done"
                            ? "border-emerald bg-emerald text-ink"
                            : state === "active"
                              ? "border-violet bg-violet/20 text-violet-soft shadow-[0_0_14px_rgb(143_107_255/0.6)]"
                              : "border-line-2 text-dim"
                        }`}
                      >
                        {state === "done" ? <Check className="size-3" aria-hidden /> : i + 1}
                      </span>
                      <div className="min-w-0">
                        <p className={`text-[0.9375rem] transition-colors duration-500 ${state === "todo" ? "text-muted" : "text-fg"}`}>{s.title}</p>
                        <p
                          className={`mt-1 truncate font-mono text-[0.6875rem] transition-all duration-500 ${
                            state === "active" ? "text-violet-soft opacity-100" : state === "done" ? "text-dim opacity-100" : "h-0 opacity-0"
                          }`}
                        >
                          {s.log}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 border-t border-line pt-12 text-center md:mt-28">
          <RevealLines
            as="p"
            className="mx-auto max-w-4xl text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.04em]"
            lines={[
              <span key="a" className="text-muted">I don’t just build websites.</span>,
              <span key="b">
                I build <span className="serif-em text-violet-soft">systems</span> around them.
              </span>,
            ]}
          />
        </div>
      </div>
    </section>
  );
}
