"use client";

import { useEffect, useState } from "react";
import { setAppReady } from "@/lib/ready";
import { cr } from "@/content/carrentals/content";
import { VehicleArt } from "../visuals/VehicleArt";

const KEY = "al-cr-intro";

/**
 * Opening titles: a light line sweeps across the dark, a car is traced
 * along it, the headlights flick on — then the frame opens like a letterbox.
 * Shown once per session.
 */
export function RentalLoader() {
  const [phase, setPhase] = useState<"run" | "exit" | "done">("run");

  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.crLoaded === "1") {
      setAppReady();
      const r = requestAnimationFrame(() => setPhase("done"));
      return () => cancelAnimationFrame(r);
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduce ? 300 : 2350;
    html.style.overflow = "hidden";
    window.scrollTo(0, 0);
    const stopLenis = window.setTimeout(() => window.__lenis?.stop(), 0);

    const exit = window.setTimeout(() => {
      setPhase("exit");
      window.setTimeout(setAppReady, reduce ? 0 : 250);
    }, hold);
    const done = window.setTimeout(
      () => {
        setPhase("done");
        html.style.overflow = "";
        html.dataset.crLoaded = "1";
        window.__lenis?.start();
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
      },
      hold + (reduce ? 50 : 1100),
    );

    return () => {
      [stopLenis, exit, done].forEach(clearTimeout);
      html.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;
  const exiting = phase === "exit";

  return (
    <div id="cr-loader" role="status" aria-label={`Loading ${cr.brand}`} className="fixed inset-0 z-[100]">
      {/* letterbox halves — they part to reveal the page */}
      {(["top", "bottom"] as const).map((side) => (
        <div
          key={side}
          className={`absolute inset-x-0 h-1/2 bg-ink transition-transform duration-[1050ms] ease-[var(--ease-in-out-quart)] ${
            side === "top" ? "top-0" : "bottom-0"
          }`}
          style={{ transform: exiting ? `translateY(${side === "top" ? "-100%" : "100%"})` : "none" }}
        />
      ))}

      <div
        className="absolute inset-0 flex flex-col items-center justify-center transition-[opacity,filter] duration-500"
        style={{ opacity: exiting ? 0 : 1, filter: exiting ? "blur(6px)" : "none" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[50vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-[50%] opacity-70 blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgb(62 230 160 / 0.10), rgb(143 107 255 / 0.05) 45%, transparent 70%)" }}
        />

        <div className="relative w-[min(78vw,560px)]" style={{ ["--draw-delay" as string]: "0.55s" }}>
          <VehicleArt shape="coupe" tone="outline" draw lights className="w-full overflow-visible text-fg/75" />
          {/* the light line the car is traced along */}
          <div className="absolute inset-x-[-12vw] top-[83.8%] h-px overflow-hidden">
            <div className="cr-loader-line absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-transparent via-emerald to-transparent" />
            <div className="cr-loader-head absolute top-1/2 h-[3px] w-24 -translate-y-1/2 rounded-full bg-emerald-soft shadow-[0_0_18px_4px_rgb(62_230_160/0.7)]" />
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="overflow-hidden">
            <span className="cr-loader-rise block text-[0.95rem] font-medium tracking-[0.42em] text-fg [animation-delay:0.9s]">
              AHTSHAM LABS
            </span>
          </p>
          <p className="mt-3 overflow-hidden">
            <span className="cr-loader-rise block font-mono text-[0.625rem] uppercase tracking-[0.32em] text-muted [animation-delay:1.05s]">
              {cr.niche}
            </span>
          </p>
        </div>
      </div>

      <style>{`
        .cr-loader-line { transform: scaleX(0); animation: cr-line 1.1s cubic-bezier(.65,0,.35,1) .1s forwards; }
        @keyframes cr-line { to { transform: scaleX(1); } }
        .cr-loader-head { left: -10%; opacity: 0; animation: cr-head 1.1s cubic-bezier(.65,0,.35,1) .1s forwards; }
        @keyframes cr-head { 0% { left: -10%; opacity: 1 } 90% { opacity: 1 } 100% { left: 105%; opacity: 0 } }
        .cr-loader-rise { transform: translateY(110%); animation: cr-rise .9s cubic-bezier(.16,1,.3,1) forwards; }
        @keyframes cr-rise { to { transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          .cr-loader-line { transform: none; animation: none; }
          .cr-loader-head { display: none; }
          .cr-loader-rise { transform: none; animation: none; }
        }
      `}</style>
    </div>
  );
}
