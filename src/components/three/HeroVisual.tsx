"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { BrandIcon } from "../ui/BrandIcon";
import { ORBIT_NODES } from "./nodes";
import { useAppReady } from "@/lib/ready";
import { useInView, useMediaQuery, useReducedMotionPref } from "@/lib/hooks";

const CoreCanvas = dynamic(() => import("./CoreScene"), { ssr: false });

const LABELS: Record<string, string> = {
  react: "React",
  next: "Next.js",
  node: "Node",
  postgres: "Postgres",
  stripe: "Stripe",
  supabase: "Supabase",
  n8n: "n8n",
};

/** Where each label sits in the CSS-only composition (percent of the square). */
const STATIC_POS: Record<string, [number, number]> = {
  postgres: [26, 30],
  react: [73, 27],
  n8n: [86, 47],
  node: [79, 66],
  next: [30, 70],
  stripe: [14, 50],
  supabase: [55, 84],
};

/**
 * True when the browser can actually create a WebGL context. Hardware acceleration
 * can be switched off or the GPU blocklisted, in which case three.js would throw.
 */
function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ?? canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/** Catches a failed renderer creation so the hero falls back instead of crashing. */
class WebGLBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Interactive "AI core" — the hero's 3D composition. Three.js mounts only after
 * the intro and an idle frame, and only when WebGL is available; otherwise a
 * CSS composition with the same content takes its place.
 */
export function HeroVisual() {
  const ready = useAppReady();
  const reduce = useReducedMotionPref();
  const lite = useMediaQuery("(max-width: 767px)");
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, "100px");
  const labelRefs = useRef<(HTMLElement | null)[]>([]);
  const coreRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "webgl" | "css">("pending");
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!ready || mode !== "pending") return;
    const decide = () => setMode(canUseWebGL() ? "webgl" : "css");
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: object) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(decide, { timeout: 900 });
    else setTimeout(decide, 200);
  }, [ready, mode]);

  const css = mode === "css";

  return (
    <div ref={wrap} className="relative h-full w-full" aria-hidden>
      {/* CSS composition — placeholder while loading, and the full visual without WebGL */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${live ? "opacity-0" : "opacity-100"}`}>
        <div className="absolute left-1/2 top-1/2 size-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(62_230_160/0.25),transparent_62%)] blur-2xl" />
        <div className="absolute right-[8%] top-[30%] size-[50%] rounded-full bg-[radial-gradient(circle,rgb(143_107_255/0.16),transparent_65%)] blur-2xl" />
        {[38, 58, 78].map((s, i) => (
          <div
            key={s}
            className={`absolute left-1/2 top-1/2 rounded-full border ${i === 1 ? "border-violet/20" : "border-emerald/15"}`}
            style={{ width: `${s}%`, height: `${s * 0.42}%`, transform: `translate(-50%,-50%) rotate(${[-14, 18, -32][i]}deg)` }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 size-[46%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-emerald/10" />
        <div className="absolute left-1/2 top-1/2 size-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald/40 bg-[radial-gradient(circle_at_35%_30%,rgb(62_230_160/0.35),rgb(10_20_16)_58%)] shadow-[inset_0_0_40px_rgb(62_230_160/0.4),0_0_80px_rgb(62_230_160/0.25),0_0_140px_rgb(143_107_255/0.15)]" />

        {css && (
          <>
            <span className="serif-em absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[2.6rem] leading-none text-white [text-shadow:0_0_24px_rgb(62_230_160/0.9),0_0_60px_rgb(143_107_255/0.6)] md:text-[3.25rem]">
              AI
            </span>
            {ORBIT_NODES.map((n, i) => {
              const [x, y] = STATIC_POS[n.id];
              return (
                <div
                  key={n.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="hero-float flex flex-col items-center gap-2" style={{ animationDelay: `${i * -0.9}s` }}>
                    <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line-2 bg-ink/80 px-2.5 py-1 text-[0.6875rem] font-medium text-fg/90 md:text-xs">
                      <BrandIcon name={n.id} className="size-3 text-fg/80" />
                      {LABELS[n.id]}
                    </span>
                    <span className="size-2 rounded-full bg-emerald-soft shadow-[0_0_12px_4px_rgb(62_230_160/0.5)]" />
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {mode === "webgl" && (
        <div className={`absolute inset-0 transition-opacity duration-[1400ms] ${live ? "opacity-100" : "opacity-0"}`}>
          <WebGLBoundary onError={() => setMode("css")}>
            <CoreCanvas
              labelRefs={labelRefs}
              coreRef={coreRef}
              lite={lite}
              reduce={reduce}
              active={inView}
              onReady={() => setLive(true)}
            />
          </WebGLBoundary>
        </div>
      )}

      {/* DOM overlays positioned every frame from 3D space */}
      {mode === "webgl" && (
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 delay-300 ${
            live ? "opacity-100" : "opacity-0"
          }`}
        >
          <div ref={coreRef} className="absolute left-0 top-0 z-[2] text-center will-change-transform">
            <span className="serif-em block text-[2.6rem] leading-none text-white [text-shadow:0_0_24px_rgb(62_230_160/0.9),0_0_60px_rgb(143_107_255/0.6)] md:text-[3.25rem]">
              AI
            </span>
          </div>
          {ORBIT_NODES.map((n, i) => (
            <div
              key={n.id}
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className="absolute left-0 top-0 will-change-transform"
            >
              <span className="flex translate-y-[-130%] items-center gap-1.5 whitespace-nowrap rounded-full border border-line-2 bg-ink/80 px-2.5 py-1 text-[0.6875rem] font-medium text-fg/90 shadow-[0_8px_30px_-10px_rgb(0_0_0/0.9)] md:text-xs">
                <BrandIcon name={n.id} className="size-3 text-fg/80" />
                {LABELS[n.id]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
