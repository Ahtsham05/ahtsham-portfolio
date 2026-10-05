"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotionPref } from "@/lib/hooks";

const LAYERS = [
  { name: "Frontend", tech: "React · Next.js · TypeScript" },
  { name: "Backend", tech: "Node.js · Express · REST" },
  { name: "Database", tech: "PostgreSQL · MongoDB · Prisma" },
  { name: "Authentication", tech: "Auth0 · Clerk · RBAC" },
  { name: "Payments", tech: "Stripe · Subscriptions" },
  { name: "AI", tech: "OpenAI · Claude · Gemini" },
  { name: "Automation", tech: "n8n · Webhooks · WhatsApp" },
];

/**
 * Isometric stack of the product layers I build. A signal travels down
 * through the stack; hovering a layer (or its legend row) lifts it out.
 */
export function LayerStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotionPref();
  const [pulse, setPulse] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || reduce || hover !== null) return;
    const id = setInterval(() => setPulse((p) => (p + 1) % LAYERS.length), 900);
    return () => clearInterval(id);
  }, [inView, reduce, hover]);

  const active = hover ?? pulse;

  return (
    <div ref={ref} className="grid items-center gap-10 sm:grid-cols-[1fr_auto] lg:grid-cols-1 xl:grid-cols-[1fr_auto]">
      {/* Stack */}
      <div className="relative mx-auto aspect-[1/1.05] w-full max-w-[420px] [perspective:1800px]">
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 size-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(62_230_160/0.12),transparent_65%)] blur-2xl"
        />
        <div
          className="absolute left-1/2 top-[54%] h-[46%] w-[62%] [transform-style:preserve-3d]"
          style={{ transform: "translate(-50%, -50%) rotateX(58deg) rotateZ(-40deg)" }}
        >
          {LAYERS.map((l, i) => {
            const z = (LAYERS.length - 1 - i) * 30;
            const isActive = active === i;
            const lifted = hover === i;
            return (
              <div
                key={l.name}
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(null)}
                className="absolute inset-0 rounded-[14px] border transition-all duration-700 ease-[var(--ease-out-expo)]"
                style={{
                  transform: `translateZ(${z + (lifted ? 34 : 0)}px)`,
                  borderColor: isActive ? "rgb(62 230 160 / 0.7)" : "rgb(236 238 233 / 0.12)",
                  background: isActive
                    ? "linear-gradient(135deg, rgb(62 230 160 / 0.20), rgb(143 107 255 / 0.10))"
                    : "linear-gradient(135deg, rgb(20 24 22 / 0.92), rgb(11 13 12 / 0.92))",
                  boxShadow: isActive
                    ? "0 0 40px -6px rgb(62 230 160 / 0.45), inset 0 0 24px rgb(62 230 160 / 0.12)"
                    : "0 18px 30px -18px rgb(0 0 0 / 0.9)",
                  opacity: hover !== null && !lifted ? 0.55 : 1,
                }}
              >
                {/* surface detail */}
                <div className="absolute inset-3 rounded-[8px] border border-white/[0.05] bg-[radial-gradient(rgb(236_238_233/0.08)_1px,transparent_1px)] [background-size:10px_10px]" />
                <span
                  className={`absolute bottom-3 left-4 font-mono text-[0.625rem] uppercase tracking-[0.2em] transition-colors duration-500 ${
                    isActive ? "text-emerald-soft" : "text-muted/70"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")} {l.name}
                </span>
                <span
                  className={`absolute right-4 top-3 size-1.5 rounded-full transition-colors duration-500 ${
                    isActive ? "bg-emerald shadow-[0_0_10px_rgb(62_230_160)]" : "bg-white/15"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <ol className="mx-auto w-full max-w-[420px] space-y-0.5 sm:w-64 lg:w-full xl:w-64">
        {LAYERS.map((l, i) => {
          const isActive = active === i;
          return (
            <li key={l.name}>
              <button
                type="button"
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                className="group flex w-full items-baseline gap-3 rounded-md py-1.5 text-left"
              >
                <span className={`font-mono text-[0.625rem] ${isActive ? "text-emerald" : "text-dim"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className={`block text-sm transition-colors ${isActive ? "text-fg" : "text-muted"}`}>
                    {l.name}
                  </span>
                  <span
                    className={`grid transition-all duration-500 ease-[var(--ease-out-expo)] ${
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <span className="overflow-hidden font-mono text-[0.6875rem] text-dim">{l.tech}</span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
