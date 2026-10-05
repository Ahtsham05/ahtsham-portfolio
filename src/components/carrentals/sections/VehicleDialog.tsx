"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { ArrowRight, Check, Cog, Fuel, Users, X, CalendarDays } from "lucide-react";
import { formatRate, vehicleName, type Vehicle } from "@/content/carrentals/fleet";
import { selectVehicle } from "@/lib/carrentals/events";
import { demoCalendar } from "@/lib/carrentals/booking";
import { scrollToTarget } from "@/components/layout/SmoothScroll";
import { VehicleMedia } from "../visuals/VehicleMedia";

const ease = [0.16, 1, 0.3, 1] as const;

/** "Vehicle page" preview — what each car's detail page could look like. */
export function VehicleDialog({ vehicle, onClose }: { vehicle: Vehicle | null; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    if (!vehicle) return;
    opener.current = document.activeElement;
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtn.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [vehicle, onClose]);

  const book = () => {
    if (!vehicle) return;
    selectVehicle(vehicle.id);
    onClose();
    window.setTimeout(() => scrollToTarget("#booking"), 120);
  };

  return (
    <AnimatePresence>
      {vehicle && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <button type="button" aria-label="Close vehicle preview" onClick={onClose} className="absolute inset-0 bg-ink/80 backdrop-blur-md" tabIndex={-1} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="vehicle-dialog-title"
            data-lenis-prevent
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease }}
            className="relative max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-t-[28px] border border-line-2 bg-ink-2 sm:rounded-[28px]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-ink-2/90 px-5 py-3 backdrop-blur-xl sm:px-8">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                Vehicle page preview <span className="text-dim">· demo</span>
              </p>
              <button
                ref={closeBtn}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid size-10 place-items-center rounded-full border border-line-2 text-muted transition-colors hover:text-fg"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
              <div>
                <div className="relative overflow-hidden rounded-2xl border border-line bg-[radial-gradient(ellipse_at_50%_100%,rgb(62_230_160/0.16),transparent_60%),radial-gradient(ellipse_at_50%_0%,rgb(236_238_233/0.06),transparent_55%)] px-4 pb-6 pt-12 sm:px-8">
                  <span aria-hidden className="pointer-events-none absolute inset-x-0 top-4 select-none text-center text-[clamp(3rem,10vw,6rem)] font-medium uppercase leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgb(236_238_233/0.08)]">
                    {vehicle.model}
                  </span>
                  <VehicleMedia vehicle={vehicle} reflection sizes="(min-width: 1024px) 50vw, 90vw" className="relative" />
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2" aria-hidden>
                  {["Exterior", "Interior", "Details", "Boot"].map((g, i) => (
                    <div
                      key={g}
                      className={`grid aspect-[4/3] place-items-end rounded-xl border p-2 font-mono text-[0.5625rem] uppercase tracking-[0.16em] ${
                        i === 0 ? "border-emerald/40 bg-emerald/[0.06] text-emerald-soft" : "border-line bg-white/[0.02] text-dim"
                      }`}
                    >
                      {g}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-line p-4">
                  <p className="flex items-center justify-between font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-dim">
                    <span>Availability · next 14 days</span>
                    <span className="flex items-center gap-3 normal-case tracking-normal">
                      <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-emerald/60" /> Free</span>
                      <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-white/10" /> Booked</span>
                    </span>
                  </p>
                  <ol className="mt-3 grid grid-cols-7 gap-1.5 sm:grid-cols-14" aria-label="Demo availability for the next 14 days">
                    {demoCalendar(vehicle.id).map((free, i) => (
                      <li
                        key={i}
                        aria-label={`Day ${i + 1}: ${free ? "available" : "booked"}`}
                        className={`h-7 rounded-md ${free ? "bg-emerald/25 ring-1 ring-inset ring-emerald/30" : "bg-white/[0.06]"}`}
                      />
                    ))}
                  </ol>
                </div>
              </div>

              <div className="flex flex-col">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-emerald">
                  {vehicle.category} · {vehicle.year}
                </p>
                <h3 id="vehicle-dialog-title" className="mt-3 text-4xl font-medium tracking-[-0.04em]">
                  <span className="block text-base font-normal tracking-[0.18em] text-muted uppercase">{vehicle.brand}</span>
                  {vehicle.model}
                </h3>

                <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                  {(
                    [
                      [Cog, "Transmission", vehicle.transmission],
                      [Users, "Seats", `${vehicle.seats} seats`],
                      [Fuel, "Fuel", vehicle.fuel],
                      [CalendarDays, "Year", String(vehicle.year)],
                    ] as const
                  ).map(([Icon, k, v]) => (
                    <div key={k} className="bg-ink-2 p-4">
                      <dt className="flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-dim">
                        <Icon className="size-3.5" aria-hidden /> {k}
                      </dt>
                      <dd className="mt-1.5 text-sm">{v}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-6 space-y-2.5">
                  {vehicle.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-fg/85">
                      <Check className="size-4 text-emerald" aria-hidden /> {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <div className="flex items-end justify-between border-t border-line pt-5">
                    <p className="text-sm text-muted">Daily rate</p>
                    <p className="text-3xl font-medium tracking-[-0.03em]">
                      {formatRate(vehicle.dailyRate)}
                      <span className="text-sm font-normal text-muted"> /day</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={book}
                    data-cursor="cta"
                    className="group mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-fg font-medium text-ink transition-colors hover:bg-white"
                  >
                    Check availability for {vehicleName(vehicle)}
                    <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden />
                  </button>
                  <p className="mt-3 text-center text-xs text-dim">Demo vehicle and pricing — replaced with your real fleet.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
