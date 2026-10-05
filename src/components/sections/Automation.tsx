"use client";

import { useEffect, useRef, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { brandPath } from "../ui/BrandIcon";
import { Reveal, RevealLines } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { useInView, useReducedMotionPref } from "@/lib/hooks";

const TOOLS = [
  { id: "n8n", label: "n8n" },
  { id: "openai", label: "OpenAI" },
  { id: "claude", label: "Claude" },
  { id: "gemini", label: "Gemini" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "stripe", label: "Stripe" },
  { id: "crm", label: "CRM" },
  { id: "database", label: "Database" },
  { id: "email", label: "Email" },
];

const STEPS = [
  { name: "Lead", tools: ["email", "n8n"], log: ["lead.received", "“Booking system for 3 clinics”"] },
  { name: "AI Analysis", tools: ["claude", "openai", "gemini"], log: ["ai.analyse", "intent: build · urgency: high"] },
  { name: "Decision", tools: ["n8n"], log: ["decision", "route → priority pipeline"] },
  { name: "Automation", tools: ["n8n", "stripe"], log: ["automation", "proposal + payment link drafted"] },
  { name: "CRM", tools: ["crm", "database"], log: ["crm.sync", "deal created · owner assigned"] },
  { name: "WhatsApp", tools: ["whatsapp"], log: ["whatsapp.send", "personalised intro delivered"] },
  { name: "Analytics", tools: ["database"], log: ["analytics", "funnel + response time updated"] },
];

const capabilities = [
  { title: "Lead qualification", body: "Score, enrich and route every enquiry the moment it arrives." },
  { title: "Document processing", body: "Extract structured data from invoices, forms and PDFs." },
  { title: "AI assistants", body: "Support and ops agents grounded in your own business data." },
];

const C = 300; // svg center
const R = 218; // tool ring radius

function Engine({ activeTools, running }: { activeTools: string[]; running: boolean }) {
  return (
    <svg viewBox="0 0 600 600" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="eng-core" cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="#1d3a2e" />
          <stop offset="1" stopColor="#0a0d0b" />
        </radialGradient>
        <radialGradient id="eng-halo">
          <stop offset="0" stopColor="#3ee6a0" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#8f6bff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#8f6bff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="eng-beam" x1="0" x2="1">
          <stop offset="0" stopColor="#3ee6a0" />
          <stop offset="1" stopColor="#8f6bff" />
        </linearGradient>
      </defs>

      <circle cx={C} cy={C} r="200" fill="url(#eng-halo)" />
      <circle cx={C} cy={C} r={R} fill="none" stroke="rgb(236 238 233 / 0.08)" />
      <circle cx={C} cy={C} r={R - 70} fill="none" stroke="rgb(236 238 233 / 0.06)" strokeDasharray="2 6" className="origin-center animate-spin-slow [transform-box:fill-box]" />
      <circle cx={C} cy={C} r="96" fill="none" stroke="rgb(62 230 160 / 0.25)" strokeDasharray="1 5" className="origin-center animate-[spin_30s_linear_infinite_reverse] [transform-box:fill-box]" />

      {TOOLS.map((t, i) => {
        const a = (i / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
        const x = C + Math.cos(a) * R;
        const y = C + Math.sin(a) * R;
        const lit = activeTools.includes(t.id);
        const ix = C + Math.cos(a) * 70;
        const iy = C + Math.sin(a) * 70;
        const ex = C + Math.cos(a) * (R - 34);
        const ey = C + Math.sin(a) * (R - 34);
        return (
          <g key={t.id}>
            <line x1={ix} y1={iy} x2={ex} y2={ey} stroke="rgb(236 238 233 / 0.07)" />
            <line
              x1={ix}
              y1={iy}
              x2={ex}
              y2={ey}
              stroke="url(#eng-beam)"
              strokeWidth="1.5"
              className="flow-dash transition-opacity duration-500"
              style={{ opacity: lit ? 1 : 0 }}
            />
            {lit && running && (
              <circle r="3.5" fill="#eceee9">
                <animate attributeName="cx" from={ex} to={ix} dur="0.9s" repeatCount="indefinite" />
                <animate attributeName="cy" from={ey} to={iy} dur="0.9s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              cx={x}
              cy={y}
              r="31"
              fill="#0c0f0d"
              stroke={lit ? "rgb(62 230 160 / 0.8)" : "rgb(236 238 233 / 0.14)"}
              className="transition-[stroke] duration-500"
            />
            <circle
              cx={x}
              cy={y}
              r="40"
              fill="none"
              stroke="rgb(62 230 160 / 0.25)"
              className="transition-opacity duration-500"
              style={{ opacity: lit ? 1 : 0 }}
            />
            <g transform={`translate(${x - 11} ${y - 11}) scale(${22 / 24})`}>
              <path
                d={brandPath(t.id)}
                fill={lit ? "#eceee9" : "rgb(236 238 233 / 0.45)"}
                className="transition-[fill] duration-500"
              />
            </g>
            <text
              x={x}
              y={y + 52}
              textAnchor="middle"
              fontSize="11"
              className="font-mono transition-[fill] duration-500"
              fill={lit ? "#eceee9" : "#757c77"}
              letterSpacing="1"
            >
              {t.label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* core */}
      <circle cx={C} cy={C} r="68" fill="url(#eng-core)" stroke="rgb(62 230 160 / 0.6)" />
      <circle cx={C} cy={C} r="68" fill="none" stroke="rgb(62 230 160 / 0.35)" strokeWidth="8" opacity={running ? 0.6 : 0.2} className="animate-pulse-soft origin-center [transform-box:fill-box]" />
      <text x={C} y={C + 4} textAnchor="middle" fontSize="40" className="font-serif italic" fill="#eceee9">
        AI
      </text>
      <text x={C} y={C + 28} textAnchor="middle" fontSize="9" letterSpacing="2.5" className="font-mono" fill="#8ff2c6">
        ENGINE
      </text>
    </svg>
  );
}

export function Automation() {
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
      if (s < STEPS.length) timer = setTimeout(advance, 1500);
      else timer = setTimeout(() => {
        s = -1;
        setStep(-1);
        timer = setTimeout(advance, 600);
      }, 3200);
    };
    timer = setTimeout(advance, 400);
    return () => clearTimeout(timer);
  }, [inView, reduce, runKey]);

  const step = reduce ? STEPS.length : rawStep;
  const activeTools = step >= 0 && step < STEPS.length ? STEPS[step].tools : [];
  const running = step >= 0 && step < STEPS.length;
  const done = step >= STEPS.length;

  return (
    <section id="ai" data-stage="6" aria-labelledby="ai-title" className="section-y relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[30%] h-[80vh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(143_107_255/0.1),transparent_62%)]" />
      </div>

      <div className="container-x">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="04">AI + Automation</SectionLabel>
            <RevealLines
              id="ai-title"
              className="h-section mt-8"
              lines={[
                "Turn repetitive work",
                <span key="l1">
                  into <span className="serif-em text-violet-soft">intelligent</span> systems.
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="lede max-w-md">
              I connect AI models to the tools your business already runs on — so leads, documents and follow-ups handle
              themselves, and your team focuses on the work that matters.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-16 md:mt-20">
          <div ref={ref} className="surface relative overflow-hidden rounded-[28px]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 md:px-8">
              <p className="flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                <span className={`size-1.5 rounded-full ${running ? "animate-pulse bg-emerald" : "bg-dim"}`} />
                Example workflow · Lead qualification
              </p>
              <button
                type="button"
                onClick={() => {
                  setStep(-1);
                  setRunKey((k) => k + 1);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-line-2 px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg"
              >
                <RotateCcw className="size-3" aria-hidden /> Replay
              </button>
            </div>

            <div className="grid lg:grid-cols-12">
              <div className="relative min-w-0 border-line p-4 sm:p-8 lg:col-span-7 lg:border-r">
                <div className="mx-auto aspect-square w-full max-w-[560px]">
                  <Engine activeTools={activeTools} running={running} />
                </div>
              </div>

              <div className="flex min-w-0 flex-col border-t border-line lg:col-span-5 lg:border-t-0">
                <ol className="relative space-y-1 p-5 md:p-8" aria-label="Workflow steps">
                  <span aria-hidden className="absolute bottom-10 left-[2.15rem] top-10 w-px bg-line md:left-[2.9rem]" />
                  {STEPS.map((s, i) => {
                    const state = i < step || done ? "done" : i === step ? "running" : "queued";
                    return (
                      <li key={s.name} className="relative flex items-center gap-4 py-1.5">
                        <span
                          className={`relative z-10 grid size-7 shrink-0 place-items-center rounded-full border text-[0.625rem] transition-all duration-500 ${
                            state === "done"
                              ? "border-emerald/60 bg-emerald/15 text-emerald"
                              : state === "running"
                                ? "border-violet bg-violet/20 text-fg shadow-[0_0_18px_rgb(143_107_255/0.6)]"
                                : "border-line-2 bg-ink-2 text-dim"
                          }`}
                        >
                          {state === "done" ? <Check className="size-3.5" aria-hidden /> : <span className="font-mono">{i + 1}</span>}
                        </span>
                        <span
                          className={`flex-1 text-[0.9375rem] transition-colors duration-500 ${
                            state === "queued" ? "text-dim" : "text-fg"
                          }`}
                        >
                          {s.name}
                        </span>
                        <span
                          className={`font-mono text-[0.625rem] uppercase tracking-[0.16em] transition-colors duration-500 ${
                            state === "done" ? "text-emerald/80" : state === "running" ? "text-violet-soft" : "text-dim/60"
                          }`}
                        >
                          {state}
                        </span>
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-auto border-t border-line bg-black/30 p-5 font-mono text-[0.6875rem] leading-6 md:p-8 md:text-xs">
                  <p className="mb-2 uppercase tracking-[0.18em] text-dim">Execution log</p>
                  <div className="h-[10.5rem] overflow-hidden" aria-live="polite">
                    {STEPS.slice(0, Math.max(0, Math.min(step + 1, STEPS.length))).map((s, i) => (
                      <p key={`${runKey}-${s.name}`} className="log-line flex min-w-0 gap-3 whitespace-nowrap">
                        <span className="shrink-0 text-dim">{String(i + 1).padStart(2, "0")}</span>
                        <span className="shrink-0 text-emerald-soft">{s.log[0]}</span>
                        <span className="min-w-0 truncate text-muted">{s.log[1]}</span>
                      </p>
                    ))}
                    {done && <p className="log-line text-fg">✓ completed — 0 manual steps</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-line bg-line md:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.06} className="bg-ink p-6 md:p-8">
              <p className="font-mono text-[0.6875rem] text-violet-soft">0{i + 1}</p>
              <h3 className="mt-4 text-lg font-medium tracking-[-0.02em]">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
      <style>{`.log-line{animation:log-in .5s cubic-bezier(.16,1,.3,1) both}@keyframes log-in{from{opacity:0;transform:translateY(6px)}}`}</style>
    </section>
  );
}
