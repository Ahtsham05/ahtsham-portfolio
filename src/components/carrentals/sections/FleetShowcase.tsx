"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Cog, Fuel, Users } from "lucide-react";
import { formatRate, showcaseFleet, type Vehicle } from "@/content/carrentals/fleet";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VehicleMedia } from "../visuals/VehicleMedia";
import dynamic from "next/dynamic";

// The vehicle page preview only downloads once someone opens a car.
const VehicleDialog = dynamic(() => import("./VehicleDialog").then((m) => m.VehicleDialog));

function VehicleCard({ v, index, onOpen }: { v: Vehicle; index: number; onOpen: () => void }) {
  return (
    <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-[linear-gradient(180deg,#0e110f,#080908)] transition-[border-color] duration-500 hover:border-line-2">
      {/* studio lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute inset-x-0 top-[-20%] h-[60%] bg-[radial-gradient(ellipse_at_50%_0%,rgb(236_238_233/0.07),transparent_65%)]" />
        <div className="absolute inset-x-[-10%] bottom-[12%] h-[60%] bg-[radial-gradient(ellipse_55%_45%_at_50%_62%,rgb(62_230_160/0.14),transparent_100%)] opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
      </div>

      <header className="relative flex items-center justify-between px-6 pt-6">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">{v.category}</span>
        <span className="font-mono text-[0.625rem] tracking-[0.2em] text-dim">
          {String(index + 1).padStart(2, "0")} / {String(showcaseFleet.length).padStart(2, "0")}
        </span>
      </header>

      {/* model name as backdrop type, car in front */}
      <div className="relative mt-6 flex-1">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 select-none whitespace-nowrap text-center text-[5.5rem] font-medium uppercase leading-none tracking-[-0.06em] text-transparent transition-transform duration-1000 ease-[var(--ease-out-expo)] [-webkit-text-stroke:1px_rgb(236_238_233/0.09)] group-hover:-translate-x-3"
        >
          {v.model.split(" ")[0]}
        </span>
        <div className="relative px-4 pt-10 transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:translate-x-2 group-hover:scale-[1.06]">
          <VehicleMedia vehicle={v} reflection sizes="(min-width: 1024px) 26rem, 84vw" />
        </div>
      </div>

      <div className="px-6 pb-6">
        <p className="text-xs uppercase tracking-[0.24em] text-muted">{v.brand}</p>
        <div className="mt-1.5 flex items-end justify-between gap-4">
          <h3 className="text-[1.75rem] font-medium leading-none tracking-[-0.04em]">{v.model}</h3>
          <span className="font-mono text-xs text-dim">{v.year}</span>
        </div>

        {/* specs reveal on hover (always visible on touch) */}
        <div className="grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-expo)] [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:grid-rows-[1fr] [@media(hover:hover)]:group-focus-within:opacity-100">
          <div className="overflow-hidden">
            <dl className="mt-5 grid grid-cols-3 gap-2 text-xs">
              {(
                [
                  [Cog, "Transmission", v.transmission === "Automatic" ? "Auto" : v.transmission],
                  [Users, "Seats", `${v.seats} seats`],
                  [Fuel, "Fuel", v.fuel],
                ] as const
              ).map(([Icon, k, val]) => (
                <div key={k} className="rounded-xl border border-line bg-white/[0.02] px-2.5 py-2">
                  <dt className="sr-only">{k}</dt>
                  <dd className="flex items-center gap-1.5 text-fg/85">
                    <Icon className="size-3.5 shrink-0 text-emerald" aria-hidden />
                    <span className="truncate">{val}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
          <p>
            <span className="text-xs text-muted">from </span>
            <span className="text-xl font-medium tracking-[-0.02em]">{formatRate(v.dailyRate)}</span>
            <span className="text-xs text-muted"> /day</span>
          </p>
          <button
            type="button"
            onClick={onOpen}
            data-cursor="cta"
            className="inline-flex items-center gap-1.5 rounded-full border border-line-2 px-4 py-2 text-sm transition-all duration-500 ease-[var(--ease-out-expo)] after:absolute after:inset-0 after:content-[''] hover:border-transparent hover:bg-fg hover:text-ink [@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:focus-visible:translate-y-0 [@media(hover:hover)]:focus-visible:opacity-100"
          >
            View Vehicle <ArrowRight className="size-3.5" aria-hidden />
            <span className="sr-only">: {v.brand} {v.model}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export function FleetShowcase() {
  const track = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<Vehicle | null>(null);
  const [dialogLoaded, setDialogLoaded] = useState(false);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const close = useCallback(() => setOpen(null), []);

  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 400) + 16), behavior: "smooth" });
  };

  return (
    <section id="fleet" aria-labelledby="fleet-title" className="section-y relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[20%] h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(circle,rgb(62_230_160/0.07),transparent_62%)]" />
      </div>

      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="04">Fleet showcase</SectionLabel>
            <RevealLines
              id="fleet-title"
              className="display mt-8 text-[clamp(2.5rem,6.4vw,5.75rem)] uppercase"
              lines={[
                "Your fleet.",
                <span key="l1" className="serif-em normal-case text-silver">
                  Presented properly.
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="lede max-w-md">
              Every vehicle gets a page that sells it — photos, specs, pricing, availability and a clear path to
              booking.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line-2 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
              <span className="size-1.5 rounded-full bg-violet" /> Demo fleet — replaced with yours
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1} className="mt-14">
        <ul
          ref={track}
          onScroll={update}
          aria-label="Demo fleet"
          className="cr-snap flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 pl-[max(var(--gutter),calc((100vw-1320px)/2+var(--gutter)))] pr-[var(--gutter)] [scroll-padding-left:max(var(--gutter),calc((100vw-1320px)/2+var(--gutter)))]"
        >
          {showcaseFleet.map((v, i) => (
            <li key={v.id} className="w-[min(84vw,25.5rem)] shrink-0 snap-start">
              <VehicleCard
                v={v}
                index={i}
                onOpen={() => {
                  setDialogLoaded(true);
                  setOpen(v);
                }}
              />
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="container-x mt-6 flex items-center gap-6">
        <div className="relative h-px flex-1 bg-line-2">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald to-violet transition-[width] duration-300"
            style={{ width: `${Math.max(12, progress * 100)}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={edge.start}
            aria-label="Previous vehicles"
            className="grid size-12 place-items-center rounded-full border border-line-2 transition-colors hover:border-emerald/50 disabled:opacity-30"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={edge.end}
            aria-label="Next vehicles"
            className="grid size-12 place-items-center rounded-full border border-line-2 transition-colors hover:border-emerald/50 disabled:opacity-30"
          >
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      {dialogLoaded && <VehicleDialog vehicle={open} onClose={close} />}
    </section>
  );
}
