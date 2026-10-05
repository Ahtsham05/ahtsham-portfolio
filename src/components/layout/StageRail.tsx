"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { stages } from "@/content/site";
import { useAppReady } from "@/lib/ready";

/**
 * Fixed "build sequence" rail (xl+). Each section declares `data-stage={n}`;
 * the rail lights every stage up to the one currently in view —
 * walking the visitor from Idea to Growth.
 */
export function StageRail() {
  const pathname = usePathname();
  const ready = useAppReady();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (pathname !== "/") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-stage]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(Number((e.target as HTMLElement).dataset.stage));
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <aside
      aria-hidden
      className={`group fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-1000 xl:block ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      <ol className="relative flex flex-col gap-3.5">
        <span className="absolute bottom-1 left-[3px] top-1 w-px bg-line-2" />
        <span
          className="absolute left-[3px] top-1 w-px bg-gradient-to-b from-emerald to-violet transition-[height] duration-700 ease-[var(--ease-out-expo)]"
          style={{ height: `calc(${(current / (stages.length - 1)) * 100}% - 0.5rem)` }}
        />
        {stages.map((s, i) => {
          const lit = i <= current;
          const isCurrent = i === current;
          return (
            <li key={s} className="relative flex items-center gap-3">
              <span
                className={`relative z-10 block size-[7px] rounded-full border transition-all duration-500 ${
                  isCurrent
                    ? "scale-125 border-emerald bg-emerald shadow-[0_0_12px_rgb(62_230_160/0.8)]"
                    : lit
                      ? "border-emerald/70 bg-ink"
                      : "border-line-2 bg-ink"
                }`}
              />
              <span
                className={`font-mono text-[0.625rem] uppercase tracking-[0.2em] transition-all duration-500 ${
                  "-translate-x-1 rounded bg-ink/80 px-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 " +
                  (isCurrent ? "text-fg" : lit ? "text-muted" : "text-dim")
                }`}
              >
                {s}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.25em] text-muted [writing-mode:vertical-rl] rotate-180 transition-opacity group-hover:opacity-0">
        <span className="text-emerald">{String(current + 1).padStart(2, "0")}</span>
        <span className="mx-1.5 text-dim">/</span>
        {stages[current]}
      </p>
    </aside>
  );
}
