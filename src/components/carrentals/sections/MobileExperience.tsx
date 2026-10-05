import { Calendar, Check, ChevronLeft, CreditCard, MapPin, Search, Users, Cog, Fuel } from "lucide-react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VehicleArt } from "../visuals/VehicleArt";

/** Phone frame with a dynamic-island notch. Screens are decorative mockups. */
function Phone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative aspect-[9/19] w-full rounded-[2.2rem] border border-white/15 bg-[#0b0d0c] p-[5px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.95),inset_0_0_0_1px_rgb(255_255_255/0.04)] ${className ?? ""}`}
    >
      <div className="relative h-full overflow-hidden rounded-[1.85rem] bg-ink">
        <div className="absolute left-1/2 top-2 z-10 h-[0.9rem] w-[34%] -translate-x-1/2 rounded-full bg-black" />
        <div className="flex h-full flex-col px-3 pb-3 pt-8 text-[0.625rem] leading-tight">{children}</div>
      </div>
    </div>
  );
}

function TopBar({ title, back }: { title: string; back?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      {back ? <ChevronLeft className="size-3.5 text-muted" /> : <span className="text-[0.5rem] font-semibold tracking-[0.2em]">YOUR BRAND</span>}
      <span className="text-[0.5625rem] text-muted">{title}</span>
      <span className="size-3.5 rounded-full border border-white/15" />
    </div>
  );
}

const PrimaryBtn = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-auto rounded-full bg-fg py-2 text-center text-[0.625rem] font-medium text-ink">{children}</div>
);

function HomeScreen() {
  return (
    <>
      <TopBar title="" />
      <p className="mt-4 text-[0.95rem] font-medium leading-[1.05] tracking-[-0.03em]">
        Premium cars,
        <br />
        <span className="serif-em text-emerald-soft">delivered.</span>
      </p>
      <div className="-mx-2 mt-2">
        <VehicleArt shape="coupe" lights className="w-full overflow-visible" />
      </div>
      <div className="mt-2 space-y-1.5 rounded-xl border border-white/10 bg-white/[0.04] p-2">
        <p className="flex items-center gap-1.5 text-muted">
          <MapPin className="size-2.5 text-emerald" /> Airport — Arrivals
        </p>
        <p className="flex items-center gap-1.5 text-muted">
          <Calendar className="size-2.5 text-emerald" /> Fri 14 → Mon 17
        </p>
        <div className="flex items-center justify-center gap-1 rounded-lg bg-emerald py-1.5 font-medium text-ink">
          <Search className="size-2.5" /> Search cars
        </div>
      </div>
      <div className="mt-2 flex gap-1">
        {["SUV", "Sedan", "Sports"].map((c, i) => (
          <span key={c} className={`rounded-full px-2 py-1 text-[0.5rem] ${i === 0 ? "bg-fg text-ink" : "border border-white/10 text-muted"}`}>
            {c}
          </span>
        ))}
      </div>
    </>
  );
}

function VehicleScreen() {
  return (
    <>
      <TopBar title="Vehicle" back />
      <div className="relative -mx-3 mt-3 bg-[radial-gradient(ellipse_at_50%_80%,rgb(62_230_160/0.18),transparent_65%)] px-2 pb-1 pt-4">
        <VehicleArt shape="suv" lights reflection className="w-full overflow-visible" />
      </div>
      <p className="mt-2 text-[0.5rem] uppercase tracking-[0.2em] text-muted">Luxury SUV</p>
      <p className="text-[0.85rem] font-medium tracking-[-0.02em]">Range Rover Sport</p>
      <div className="mt-2 grid grid-cols-3 gap-1">
        {[
          [Cog, "Auto"],
          [Users, "5"],
          [Fuel, "Hybrid"],
        ].map(([I, t]) => {
          const Icon = I as typeof Cog;
          return (
            <span key={t as string} className="flex items-center justify-center gap-1 rounded-lg border border-white/10 py-1 text-[0.5rem] text-muted">
              <Icon className="size-2.5 text-emerald" /> {t as string}
            </span>
          );
        })}
      </div>
      <div className="mt-2 flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`h-7 flex-1 rounded-md ${i === 0 ? "border border-emerald/50 bg-emerald/10" : "bg-white/[0.05]"}`} />
        ))}
      </div>
      <div className="mt-auto flex items-end justify-between pb-2">
        <span className="text-muted">from</span>
        <span className="text-sm font-medium">
          $420<span className="text-[0.5rem] text-muted">/day</span>
        </span>
      </div>
      <PrimaryBtn>Select dates</PrimaryBtn>
    </>
  );
}

function DatesScreen() {
  const days = Array.from({ length: 35 }, (_, i) => i - 2);
  return (
    <>
      <TopBar title="Dates" back />
      <p className="mt-4 text-[0.8rem] font-medium">March</p>
      <div className="mt-2 grid grid-cols-7 gap-y-1 text-center text-[0.5rem] text-dim">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
        {days.map((d) => {
          const inRange = d >= 14 && d <= 17;
          const edge = d === 14 || d === 17;
          return (
            <span
              key={d}
              className={`grid h-5 place-items-center ${d < 1 || d > 31 ? "opacity-0" : ""} ${
                edge ? "rounded-full bg-emerald font-medium text-ink" : inRange ? "bg-emerald/15 text-emerald-soft" : d === 9 || d === 22 ? "text-white/20 line-through" : "text-fg/70"
              }`}
            >
              {d}
            </span>
          );
        })}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        {[
          ["Pickup", "Fri 14 · 10:00"],
          ["Return", "Mon 17 · 10:00"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-white/10 p-1.5">
            <p className="text-[0.4375rem] uppercase tracking-[0.18em] text-dim">{k}</p>
            <p className="mt-0.5 text-[0.5625rem]">{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 flex items-center gap-1 text-[0.5625rem] text-emerald-soft">
        <span className="size-1 rounded-full bg-emerald" /> Available · 3 days
      </p>
      <PrimaryBtn>Continue</PrimaryBtn>
    </>
  );
}

function BookingScreen() {
  return (
    <>
      <TopBar title="Booking" back />
      <div className="mt-4 rounded-xl border border-white/10 p-2">
        <p className="text-[0.75rem] font-medium">Range Rover Sport</p>
        <p className="mt-0.5 text-[0.5rem] text-muted">Fri 14 → Mon 17 · Airport</p>
      </div>
      <p className="mt-3 text-[0.4375rem] uppercase tracking-[0.18em] text-dim">Extras</p>
      {[
        ["Child seat", true],
        ["Additional driver", false],
        ["Full insurance", true],
      ].map(([l, on]) => (
        <div key={l as string} className="mt-1.5 flex items-center justify-between">
          <span className="text-muted">{l as string}</span>
          <span className={`flex h-3 w-5 items-center rounded-full p-px ${on ? "justify-end bg-emerald" : "bg-white/15"}`}>
            <span className="size-2.5 rounded-full bg-white" />
          </span>
        </div>
      ))}
      <div className="mt-3 space-y-1 border-t border-white/10 pt-2">
        <p className="flex justify-between text-muted">
          <span>3 days × $420</span>
          <span>$1,260</span>
        </p>
        <p className="flex justify-between text-muted">
          <span>Extras</span>
          <span>$95</span>
        </p>
        <p className="flex justify-between text-[0.75rem] font-medium">
          <span>Total</span>
          <span>$1,355</span>
        </p>
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-white/[0.05] px-2 py-1.5 text-muted">
        <CreditCard className="size-2.5" /> •••• 4242
      </div>
      <div className="mt-auto flex items-center justify-center gap-1 rounded-full bg-fg py-2 text-[0.625rem] font-medium text-ink">
        <BrandIcon name="stripe" className="size-2.5" /> Pay deposit
      </div>
    </>
  );
}

function ConfirmScreen() {
  return (
    <>
      <TopBar title="" />
      <div className="mt-6 flex flex-col items-center text-center">
        <span className="grid size-11 place-items-center rounded-full border border-emerald/40 bg-emerald/15 text-emerald shadow-[0_0_30px_rgb(62_230_160/0.35)]">
          <Check className="size-5" />
        </span>
        <p className="mt-3 text-[0.85rem] font-medium tracking-[-0.02em]">Booking confirmed</p>
        <p className="mt-1 text-[0.5rem] text-muted">Ref · YB-20418</p>
      </div>
      <div className="mt-4 space-y-1.5 rounded-xl border border-white/10 p-2 text-[0.5625rem]">
        <p className="flex justify-between">
          <span className="text-dim">Car</span> Range Rover Sport
        </p>
        <p className="flex justify-between">
          <span className="text-dim">Pickup</span> Fri 14 · 10:00
        </p>
        <p className="flex justify-between">
          <span className="text-dim">Paid</span> $400 deposit
        </p>
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-xl bg-emerald/10 p-2 text-[0.5625rem] text-emerald-soft">
        <BrandIcon name="whatsapp" className="size-3" /> Details sent on WhatsApp
      </div>
      <div className="mt-auto rounded-full border border-white/15 py-2 text-center text-[0.625rem]">Add to calendar</div>
    </>
  );
}

const screens = [
  { label: "Homepage", Screen: HomeScreen },
  { label: "Vehicle", Screen: VehicleScreen },
  { label: "Dates", Screen: DatesScreen },
  { label: "Booking", Screen: BookingScreen },
  { label: "Confirmation", Screen: ConfirmScreen },
];

/** Fan the row in 3D: outer phones turn toward the centre. */
const tilt = ["xl:[transform:perspective(1400px)_rotateY(22deg)_translateY(40px)]", "xl:[transform:perspective(1400px)_rotateY(11deg)_translateY(14px)]", "xl:scale-[1.06]", "xl:[transform:perspective(1400px)_rotateY(-11deg)_translateY(14px)]", "xl:[transform:perspective(1400px)_rotateY(-22deg)_translateY(40px)]"];

export function MobileExperience() {
  return (
    <section id="mobile" aria-labelledby="mobile-title" className="section-y relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-[70%] w-[110vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgb(62_230_160/0.08),transparent_62%)]" />
      </div>

      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel index="06">Mobile-first</SectionLabel>
            <RevealLines
              id="mobile-title"
              className="h-section mt-8"
              lines={[
                "Designed for the screen",
                <span key="l1">
                  your customers <span className="serif-em text-emerald-soft">actually use.</span>
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="lede max-w-sm">
              Renters often book from a phone — at the airport, in a hotel lobby, between meetings. Every screen is
              designed thumb-first, then scaled up to desktop.
            </p>
          </Reveal>
        </div>

        <p className="sr-only">Example mobile booking flow: homepage, vehicle page, date selection, booking and confirmation.</p>
      </div>

      <div className="relative mt-16" aria-hidden>
        {/* connecting rail */}
        <div className="pointer-events-none absolute inset-x-0 top-[44%] hidden h-px xl:block">
          <svg className="h-2 w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 2">
            <line x1="0" y1="1" x2="100" y2="1" stroke="rgb(62 230 160 / 0.35)" strokeWidth="0.15" className="flow-dash" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>

        <ol className="cr-snap flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(var(--gutter),calc((100vw-1320px)/2+var(--gutter)))] pb-6 [scroll-padding-inline:var(--gutter)] xl:justify-center xl:gap-[clamp(0.75rem,1.6vw,1.75rem)] xl:overflow-visible">
          {screens.map(({ label, Screen }, i) => (
            <li key={label} className="w-[62vw] max-w-[15rem] shrink-0 snap-center sm:w-[34vw] xl:w-[clamp(11rem,14vw,14.5rem)]">
              <Reveal delay={i * 0.08} y={40}>
                <div className={`transition-transform duration-700 ease-[var(--ease-out-expo)] hover:!transform-none ${tilt[i]}`}>
                  <Phone>
                    <Screen />
                  </Phone>
                </div>
                <p className="mt-5 flex items-center justify-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                  <span className="text-emerald">{String(i + 1).padStart(2, "0")}</span> {label}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
