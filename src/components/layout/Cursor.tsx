"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

type Mode = "default" | "link" | "project" | "cta" | "hidden";

/**
 * Desktop-only cursor: a precise dot plus a trailing ring that reacts
 * to links, CTAs and project cards. Never mounted on touch devices.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("View project");
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const html = document.documentElement;
    html.classList.add("has-cursor");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let visible = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        ringPos.x = pos.x;
        ringPos.y = pos.y;
        dot.current?.style.setProperty("opacity", "1");
        ring.current?.style.setProperty("opacity", "1");
      }
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const el = t?.closest<HTMLElement>("[data-cursor], a, button, [role='button'], input, textarea, select");
      if (!el) return setMode("default");
      const tag = el.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return setMode("hidden");
      const m = el.dataset.cursor as Mode | undefined;
      if (m === "project") {
        setLabel(el.dataset.cursorLabel ?? "View project");
        return setMode("project");
      }
      if (m === "cta") return setMode("cta");
      if (m === "hidden") return setMode("hidden");
      setMode("link");
    };

    const onLeave = () => {
      visible = false;
      dot.current?.style.setProperty("opacity", "0");
      ring.current?.style.setProperty("opacity", "0");
    };

    const loop = () => {
      const k = reduce ? 1 : 0.18;
      ringPos.x += (pos.x - ringPos.x) * k;
      ringPos.y += (pos.y - ringPos.y) * k;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      html.classList.remove("has-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize =
    mode === "project" ? "h-11 w-auto px-5" : mode === "link" ? "size-14" : mode === "cta" ? "size-20" : "size-9";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <div ref={ring} className="absolute left-0 top-0 opacity-0 transition-opacity duration-300">
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-full border transition-all duration-500 ease-[var(--ease-out-expo)] ${ringSize} ${
            mode === "project"
              ? "border-transparent bg-fg text-ink"
              : mode === "cta"
                ? "border-emerald/40 bg-emerald/[0.06]"
                : mode === "link"
                  ? "border-fg/50 bg-fg/[0.04]"
                  : mode === "hidden"
                    ? "scale-0 border-transparent"
                    : "border-fg/25"
          }`}
        >
          {mode === "project" && (
            <span className="flex items-center gap-2 whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.18em]">
              {label} <ArrowRight className="size-3.5" />
            </span>
          )}
        </div>
      </div>
      <div ref={dot} className="absolute left-0 top-0 opacity-0 transition-opacity duration-300">
        <div
          className={`size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald transition-transform duration-300 ${
            mode === "project" || mode === "hidden" ? "scale-0" : ""
          }`}
        />
      </div>
    </div>
  );
}
