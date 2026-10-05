import { Calendar, Check, CreditCard, Lock, MapPin, Plane, Building2, Hotel } from "lucide-react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { VehicleArt } from "./VehicleArt";

/** Tiny UI vignettes for each service card — illustrative, not screenshots. */

export function WebsiteVignette() {
  return (
    <div className="overflow-hidden rounded-xl border border-line-2 bg-ink shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 rounded-full bg-white/15" />
        ))}
        <span className="mx-auto rounded-full bg-white/[0.04] px-3 py-0.5 font-mono text-[0.5625rem] text-dim">yourrentals.com</span>
      </div>
      <div className="relative px-4 pb-3 pt-4 sm:px-5">
        <div className="flex items-center justify-between">
          <span className="text-[0.625rem] font-semibold tracking-[0.2em]">YOUR BRAND</span>
          <span className="hidden gap-3 text-[0.5625rem] text-muted sm:flex">
            <span>Fleet</span>
            <span>Locations</span>
            <span>Chauffeur</span>
          </span>
          <span className="rounded-full bg-fg px-2 py-0.5 text-[0.5625rem] font-medium text-ink">Book</span>
        </div>
        <div className="mt-5 grid grid-cols-[1fr_1.4fr] items-end gap-2">
          <div>
            <p className="text-[0.95rem] font-medium leading-tight tracking-[-0.03em] sm:text-lg">
              Drive something <span className="serif-em text-emerald-soft">extraordinary.</span>
            </p>
            <div className="mt-3 flex gap-1.5">
              <span className="h-4 w-14 rounded-full bg-white/10" />
              <span className="h-4 w-10 rounded-full border border-white/10" />
            </div>
          </div>
          <VehicleArt shape="sedan" lights className="w-full overflow-visible" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5 rounded-lg border border-line bg-white/[0.02] p-1.5">
          {["Pickup", "Dates", "Search"].map((l, i) => (
            <span
              key={l}
              className={`rounded-md px-2 py-1.5 text-[0.5625rem] ${i === 2 ? "bg-emerald text-center font-medium text-ink" : "bg-white/[0.04] text-muted"}`}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BookingVignette() {
  return (
    <div className="space-y-2 rounded-xl border border-line-2 bg-ink p-3">
      {[
        [MapPin, "Pickup", "Airport — Arrivals"],
        [Calendar, "Dates", "Fri 14 → Mon 17"],
      ].map(([Icon, label, value]) => {
        const I = Icon as typeof MapPin;
        return (
          <div key={label as string} className="flex items-center gap-2.5 rounded-lg bg-white/[0.04] px-3 py-2">
            <I className="size-3.5 text-emerald" aria-hidden />
            <span className="flex-1">
              <span className="block font-mono text-[0.5rem] uppercase tracking-[0.18em] text-dim">{label as string}</span>
              <span className="block text-xs">{value as string}</span>
            </span>
          </div>
        );
      })}
      <div className="grid grid-cols-7 gap-1 px-1 pt-1">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className={`grid h-5 place-items-center rounded text-[0.5rem] ${
              i >= 4 && i <= 7 ? "bg-emerald/20 text-emerald-soft" : i === 10 ? "text-dim line-through" : "text-muted"
            }`}
          >
            {i + 10}
          </span>
        ))}
      </div>
      <div className="rounded-lg bg-fg py-2 text-center text-xs font-medium text-ink">Check availability</div>
    </div>
  );
}

export function FleetVignette() {
  return (
    <div className="rounded-xl border border-line-2 bg-[radial-gradient(ellipse_at_50%_100%,rgb(62_230_160/0.10),transparent_65%)] p-3">
      <VehicleArt shape="suv" lights className="mx-auto w-[88%] overflow-visible" />
      <div className="mt-2 flex items-end justify-between">
        <div>
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-dim">Luxury SUV</p>
          <p className="text-sm font-medium">Your vehicle</p>
        </div>
        <p className="text-sm">
          $420<span className="text-[0.625rem] text-muted">/day</span>
        </p>
      </div>
    </div>
  );
}

export function LocationsVignette() {
  const pins = [
    { x: "22%", y: "30%", Icon: Plane, label: "Airport" },
    { x: "62%", y: "22%", Icon: Building2, label: "City" },
    { x: "44%", y: "64%", Icon: Hotel, label: "Hotel" },
    { x: "78%", y: "66%", Icon: MapPin, label: "Branch" },
  ];
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line-2 bg-ink">
      <svg viewBox="0 0 200 125" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="none">
        <path d="M-5 90 C 40 70 70 100 110 80 S 170 40 210 55" fill="none" stroke="rgb(236 238 233 / 0.08)" strokeWidth="6" />
        <path d="M60 -5 C 70 40 50 80 80 130" fill="none" stroke="rgb(236 238 233 / 0.06)" strokeWidth="4" />
        <path d="M140 -5 C 130 40 150 90 120 130" fill="none" stroke="rgb(236 238 233 / 0.06)" strokeWidth="3" />
        <path d="M44 38 C 80 30 110 40 124 28" fill="none" stroke="rgb(62 230 160 / 0.5)" strokeDasharray="3 4" className="flow-dash" />
      </svg>
      {pins.map(({ x, y, Icon, label }) => (
        <span key={label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}>
          <span className="flex items-center gap-1 rounded-full border border-white/10 bg-ink/90 py-1 pl-1 pr-2 text-[0.5625rem]">
            <span className="grid size-4 place-items-center rounded-full bg-emerald/15 text-emerald">
              <Icon className="size-2.5" aria-hidden />
            </span>
            {label}
          </span>
        </span>
      ))}
    </div>
  );
}

export function PaymentsVignette() {
  return (
    <div className="space-y-2.5">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(135deg,#1b2a24,#0d1110_45%,#1c1736)] p-3.5">
        <div className="flex items-center justify-between">
          <CreditCard className="size-4 text-fg/70" aria-hidden />
          <BrandIcon name="stripe" className="size-4 text-fg/60" />
        </div>
        <p className="mt-5 font-mono text-xs tracking-[0.2em] text-fg/80">•••• •••• •••• 4242</p>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 text-xs">
        <span className="flex items-center gap-1.5 text-muted">
          <Lock className="size-3" aria-hidden /> Deposit
        </span>
        <span className="flex items-center gap-1.5 text-emerald-soft">
          <Check className="size-3.5" aria-hidden /> Paid
        </span>
      </div>
    </div>
  );
}
