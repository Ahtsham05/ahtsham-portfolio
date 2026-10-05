"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { ArrowRight, Calendar, Check, Cog, LoaderCircle, Lock, MapPin, RotateCcw, Users } from "lucide-react";
import { formatRate, vehicleName } from "@/content/carrentals/fleet";
import { bookingProvider, isoDate, locations, rentalDays, type BookingQuery, type Quote } from "@/lib/carrentals/booking";
import { SELECT_VEHICLE } from "@/lib/carrentals/events";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VehicleMedia } from "../visuals/VehicleMedia";
import { VehicleArt } from "../visuals/VehicleArt";

const ease = [0.16, 1, 0.3, 1] as const;
const noopSubscribe = () => () => {};
type Status = "idle" | "loading" | "results";

const fieldShell =
  "group relative flex items-center gap-3 rounded-2xl border border-line-2 bg-white/[0.03] px-4 py-3 transition-colors focus-within:border-emerald/60 hover:border-white/20";
const fieldLabel = "block font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-dim";
const control = "w-full bg-transparent text-[0.9375rem] text-fg outline-none focus-visible:outline-none";

const fmtDate = (iso: string) =>
  iso ? new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : "—";

function Steps({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em]" aria-label="Booking steps">
      {["Search", "Choose", "Confirm"].map((s, i) => (
        <li key={s} className="flex items-center gap-2" aria-current={i === current ? "step" : undefined}>
          <span
            className={`grid size-5 place-items-center rounded-full border text-[0.5625rem] transition-colors duration-500 ${
              i < current ? "border-emerald bg-emerald text-ink" : i === current ? "border-emerald text-emerald" : "border-line-2 text-dim"
            }`}
          >
            {i < current ? <Check className="size-3" aria-hidden /> : i + 1}
          </span>
          <span className={`${i <= current ? "text-fg/90" : "text-dim"} ${i === current ? "" : "max-sm:sr-only"}`}>{s}</span>
          {i < 2 && <span aria-hidden className="mx-0.5 h-px w-3 bg-line-2 sm:mx-1 sm:w-5" />}
        </li>
      ))}
    </ol>
  );
}

export function BookingDemo() {
  const uid = useId();
  const [query, setQuery] = useState<BookingQuery>({
    pickupLocation: locations[0].id,
    returnLocation: locations[0].id,
    pickupDate: "",
    returnDate: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [chosen, setChosen] = useState<string | null>(null);
  const [preferred, setPreferred] = useState<string | null>(null);

  // Default dates depend on "today", which only exists in the browser — the
  // server snapshot is empty so hydration matches, then the client fills in.
  const today = useSyncExternalStore(noopSubscribe, () => isoDate(0), () => "");
  const withDefaults = (q: BookingQuery): BookingQuery => ({
    ...q,
    pickupDate: q.pickupDate || (today ? isoDate(3) : ""),
    returnDate: q.returnDate || (today ? isoDate(6) : ""),
  });
  const current = withDefaults(query);

  // A vehicle chosen in the fleet showcase gets pinned to the top of the results.
  useEffect(() => {
    const on = (e: Event) => setPreferred((e as CustomEvent<string>).detail);
    window.addEventListener(SELECT_VEHICLE, on);
    return () => window.removeEventListener(SELECT_VEHICLE, on);
  }, []);

  const set = <K extends keyof BookingQuery>(k: K, v: BookingQuery[K]) => {
    setQuery((q) => {
      const next = { ...withDefaults(q), [k]: v };
      if (k === "pickupDate" && typeof v === "string" && next.returnDate <= v) {
        const d = new Date(`${v}T12:00:00`);
        d.setDate(d.getDate() + 1);
        next.returnDate = d.toISOString().slice(0, 10);
      }
      return next;
    });
    if (status === "results") setStatus("idle");
    setChosen(null);
  };

  const search = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setStatus("loading");
    setChosen(null);
    const result = await bookingProvider.searchAvailability({ ...current, vehicleId: preferred ?? undefined });
    const pinned = preferred ? [...result].sort((a, b) => Number(b.vehicle.id === preferred) - Number(a.vehicle.id === preferred)) : result;
    setQuotes(pinned);
    setStatus("results");
  };

  const days = current.pickupDate && current.returnDate ? rentalDays(current.pickupDate, current.returnDate) : 0;
  const pick = quotes.find((q) => q.vehicle.id === chosen);
  const locName = (id: string) => locations.find((l) => l.id === id)?.name ?? "";
  const step = chosen ? 2 : status === "results" ? 1 : 0;

  return (
    <section id="booking" aria-labelledby="booking-title" className="section-y relative">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-[-15%] top-[10%] h-[80vh] w-[70vw] rounded-full bg-[radial-gradient(circle,rgb(143_107_255/0.09),transparent_62%)]" />
      </div>

      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel index="05">Booking experience</SectionLabel>
            <RevealLines
              id="booking-title"
              className="display mt-8 text-[clamp(2.4rem,6vw,5.5rem)] uppercase"
              lines={[
                "Booking should feel",
                <span key="l1" className="serif-em normal-case text-emerald-soft">
                  this simple.
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="lede max-w-sm">
              Try it. Pick locations and dates, then search — this is a working demo of the flow I build, minus the real
              payment.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <div className="relative overflow-hidden rounded-[32px] border border-line-2 bg-[linear-gradient(180deg,#121513,#0b0d0c)] shadow-[0_60px_120px_-60px_rgb(0_0_0/0.9)]">
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald/60 to-transparent" />

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-8">
              <Steps current={step} />
              <span className="rounded-full border border-line-2 px-3 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted">
                Example experience
              </span>
            </div>

            {/* Search bar */}
            <form onSubmit={search} className="grid gap-3 p-5 sm:p-8 md:grid-cols-2 xl:grid-cols-[1fr_1fr_0.8fr_0.8fr_auto]">
              {(
                [
                  ["pickupLocation", "Pickup location"],
                  ["returnLocation", "Return location"],
                ] as const
              ).map(([k, label]) => (
                <label key={k} className={fieldShell} htmlFor={`${uid}-${k}`}>
                  <MapPin className="size-4 shrink-0 text-emerald" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className={fieldLabel}>{label}</span>
                    <select
                      id={`${uid}-${k}`}
                      value={current[k]}
                      onChange={(e) => set(k, e.target.value)}
                      className={`${control} -ml-1 mt-0.5 cursor-pointer appearance-none truncate bg-ink-2 [&>option]:bg-ink-2`}
                    >
                      {locations.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>
              ))}
              {(
                [
                  ["pickupDate", "Pickup date"],
                  ["returnDate", "Return date"],
                ] as const
              ).map(([k, label]) => (
                <label key={k} className={fieldShell} htmlFor={`${uid}-${k}`}>
                  <Calendar className="size-4 shrink-0 text-emerald" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className={fieldLabel}>{label}</span>
                    <input
                      id={`${uid}-${k}`}
                      type="date"
                      required
                      value={current[k]}
                      min={k === "returnDate" ? current.pickupDate || undefined : today || undefined}
                      onChange={(e) => e.target.value && set(k, e.target.value)}
                      className={`${control} cr-date mt-0.5`}
                    />
                  </span>
                </label>
              ))}
              <button
                type="submit"
                disabled={status === "loading" || !days}
                data-cursor="cta"
                className="group flex h-full min-h-14 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-fg px-6 font-medium text-ink shadow-[0_10px_40px_-10px_rgb(62_230_160/0.55)] transition-colors hover:bg-white disabled:opacity-70 md:col-span-2 xl:col-span-1"
              >
                {status === "loading" ? (
                  <>
                    Searching <LoaderCircle className="size-4 animate-spin" aria-hidden />
                  </>
                ) : (
                  <>
                    Search Available Cars
                    <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden />
                  </>
                )}
              </button>
            </form>

            {/* Results */}
            <div className="border-t border-line px-5 pb-6 pt-6 sm:px-8 sm:pb-8" aria-live="polite">
              <AnimatePresence mode="wait">
                {status === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-3 py-10 text-center"
                  >
                    <div className="flex -space-x-6 opacity-60" aria-hidden>
                      {(["coupe", "suv", "sedan"] as const).map((s) => (
                        <VehicleArt key={s} shape={s} className="w-28 overflow-visible" />
                      ))}
                    </div>
                    <p className="text-sm text-muted">
                      {days ? `${days} day${days > 1 ? "s" : ""} · ${fmtDate(current.pickupDate)} → ${fmtDate(current.returnDate)}` : "Choose your dates"}
                    </p>
                    <p className="text-xs text-dim">Search to see live availability and totals.</p>
                  </motion.div>
                )}

                {status === "loading" && (
                  <motion.ul key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {[0, 1, 2].map((i) => (
                      <li key={i} className="h-44 animate-pulse rounded-2xl border border-line bg-white/[0.03]" style={{ animationDelay: `${i * 120}ms` }} />
                    ))}
                    <li className="sr-only">Checking availability…</li>
                  </motion.ul>
                )}

                {status === "results" && (
                  <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-6 xl:grid-cols-[1fr_22rem]">
                    <div>
                      <p className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
                        <span>
                          <span className="text-fg">{quotes.filter((q) => q.available).length} cars available</span> ·{" "}
                          {days} day{days > 1 ? "s" : ""} · {locName(current.pickupLocation)}
                        </span>
                        <button type="button" onClick={() => setStatus("idle")} className="inline-flex items-center gap-1.5 text-xs text-dim hover:text-fg">
                          <RotateCcw className="size-3" aria-hidden /> Edit search
                        </button>
                      </p>
                      <ul className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                        {quotes.map((q, i) => {
                          const isChosen = chosen === q.vehicle.id;
                          const isPreferred = preferred === q.vehicle.id;
                          return (
                            <motion.li
                              key={q.vehicle.id}
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, ease, delay: i * 0.05 }}
                            >
                              <button
                                type="button"
                                disabled={!q.available}
                                onClick={() => setChosen(q.vehicle.id)}
                                aria-pressed={isChosen}
                                className={`group relative flex w-full flex-col rounded-2xl border p-4 text-left transition-all duration-500 ${
                                  isChosen
                                    ? "border-emerald/70 bg-emerald/[0.07] shadow-[0_0_0_1px_rgb(62_230_160/0.3),0_20px_50px_-20px_rgb(62_230_160/0.35)]"
                                    : q.available
                                      ? "border-line bg-white/[0.02] hover:border-white/20"
                                      : "cursor-not-allowed border-line bg-transparent opacity-45"
                                }`}
                              >
                                <span className="flex items-center justify-between font-mono text-[0.5625rem] uppercase tracking-[0.18em]">
                                  <span className="text-dim">{q.vehicle.category}</span>
                                  {isPreferred && <span className="rounded-full bg-violet/20 px-2 py-0.5 text-violet-soft">Your pick</span>}
                                  {!q.available && <span className="text-[#ff9b8a]">Booked</span>}
                                  {isChosen && <Check className="size-4 text-emerald" aria-hidden />}
                                </span>
                                <span className="mt-2 block px-2">
                                  <VehicleMedia vehicle={q.vehicle} lights={q.available} sizes="(min-width: 1280px) 15vw, 45vw" />
                                </span>
                                <span className="mt-2 text-sm font-medium">{vehicleName(q.vehicle)}</span>
                                <span className="mt-1 flex items-center gap-3 text-xs text-muted">
                                  <span className="flex items-center gap-1">
                                    <Cog className="size-3" aria-hidden /> {q.vehicle.transmission}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Users className="size-3" aria-hidden /> {q.vehicle.seats}
                                  </span>
                                </span>
                                <span className="mt-3 flex items-end justify-between border-t border-line pt-3">
                                  <span className="text-xs text-muted">{formatRate(q.vehicle.dailyRate)}/day</span>
                                  <span className="text-base font-medium">{q.available ? formatRate(q.total) : "—"}</span>
                                </span>
                              </button>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Summary */}
                    <aside className="rounded-2xl border border-line-2 bg-ink-2/80 p-5 xl:sticky xl:top-24 xl:self-start" aria-label="Booking summary">
                      <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">Booking summary</p>
                      {pick ? (
                        <motion.div key={pick.vehicle.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
                          <p className="mt-3 text-xl font-medium tracking-[-0.03em]">{vehicleName(pick.vehicle)}</p>
                          <dl className="mt-4 space-y-2.5 text-sm">
                            {(
                              [
                                ["Pickup", `${locName(current.pickupLocation)} · ${fmtDate(current.pickupDate)}`],
                                ["Return", `${locName(current.returnLocation)} · ${fmtDate(current.returnDate)}`],
                                ["Rate", `${formatRate(pick.vehicle.dailyRate)} × ${days} day${days > 1 ? "s" : ""}`],
                              ] as const
                            ).map(([k, v]) => (
                              <div key={k} className="flex justify-between gap-4">
                                <dt className="text-dim">{k}</dt>
                                <dd className="text-right text-fg/90">{v}</dd>
                              </div>
                            ))}
                          </dl>
                          <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
                            <span className="text-sm text-muted">Total</span>
                            <span className="text-2xl font-medium tracking-[-0.03em]">{formatRate(pick.total)}</span>
                          </div>
                          <button
                            type="button"
                            disabled
                            aria-describedby={`${uid}-pay-note`}
                            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-fg/90 text-sm font-medium text-ink opacity-80"
                          >
                            <Lock className="size-3.5" aria-hidden /> Continue to secure checkout
                          </button>
                          <p id={`${uid}-pay-note`} className="mt-3 text-center text-xs text-dim">
                            Demo — in a live build this connects to Stripe.
                          </p>
                        </motion.div>
                      ) : (
                        <p className="mt-3 text-sm text-muted">Select a car to see the full price breakdown — no hidden fees, no surprises.</p>
                      )}
                    </aside>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
