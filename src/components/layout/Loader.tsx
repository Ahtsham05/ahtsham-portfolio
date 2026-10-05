"use client";

import { useEffect, useRef, useState } from "react";
import { Monogram } from "../ui/Monogram";
import { setAppReady } from "@/lib/ready";

const WORDS = ["Building", "digital", "experiences"];
const KEY = "ay-intro";

/**
 * Short cinematic intro: the monogram draws itself, a counter runs to 100,
 * then the curtain lifts to reveal the hero. Shown once per session.
 */
export function Loader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"run" | "exit" | "done">("run");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.loaded === "1") {
      setAppReady();
      const r = requestAnimationFrame(() => setPhase("done"));
      return () => cancelAnimationFrame(r);
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 350 : 1650;
    html.style.overflow = "hidden";
    window.scrollTo(0, 0);
    const stopLenis = window.setTimeout(() => window.__lenis?.stop(), 0);

    let raf = 0;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round(ease(t) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setPhase("exit");
        // Hero animations begin while the curtain is still lifting.
        window.setTimeout(setAppReady, reduce ? 0 : 380);
        window.setTimeout(
          () => {
            setPhase("done");
            html.style.overflow = "";
            html.dataset.loaded = "1";
            window.__lenis?.start();
            try {
              sessionStorage.setItem(KEY, "1");
            } catch {}
          },
          reduce ? 50 : 1100,
        );
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(stopLenis);
      html.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      id="site-loader"
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${progress}%`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-[clip-path] duration-[1000ms] ease-[var(--ease-in-out-quart)]"
      style={{ clipPath: phase === "exit" ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)" }}
    >
      {/* ambient light */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgb(62 230 160 / 0.12), rgb(143 107 255 / 0.06) 40%, transparent 65%)",
        }}
      />

      <div
        className="relative flex flex-col items-center transition-all duration-700 ease-[var(--ease-out-expo)]"
        style={{
          opacity: phase === "exit" ? 0 : 1,
          transform: phase === "exit" ? "translateY(-24px)" : "none",
          filter: phase === "exit" ? "blur(6px)" : "none",
        }}
      >
        <Monogram draw className="h-12 w-auto text-fg" />

        <p className="mt-9 flex gap-[0.6em] font-mono text-[0.6875rem] uppercase tracking-[0.32em] text-muted">
          {WORDS.map((w, i) => (
            <span key={w} className="overflow-hidden">
              <span
                className="loader-word inline-block"
                style={{ animationDelay: `${0.25 + i * 0.12}s` }}
              >
                {w}
              </span>
            </span>
          ))}
        </p>

        <div className="mt-8 flex w-56 items-center gap-4">
          <div className="relative h-px flex-1 overflow-hidden bg-line-2">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald to-violet"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="w-9 text-right font-mono text-[0.6875rem] tabular-nums text-fg">
            {String(progress).padStart(3, "0")}
          </span>
        </div>
      </div>

      <style>{`
        .monogram-path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 1.2s cubic-bezier(.65,0,.35,1) forwards; }
        .monogram-path + .monogram-path { animation-delay: .25s; }
        @keyframes draw { to { stroke-dashoffset: 0; } }
        .loader-word { transform: translateY(110%); animation: rise .9s cubic-bezier(.16,1,.3,1) forwards; }
        @keyframes rise { to { transform: translateY(0); } }
      `}</style>
    </div>
  );
}
