import {
  BarChart3,
  Bot,
  CalendarCheck,
  CalendarRange,
  CarFront,
  CreditCard,
  Layers,
  MapPin,
  MessageCircle,
  RefreshCw,
  ScanSearch,
  Smartphone,
  UserRound,
  Workflow,
  Wrench,
} from "lucide-react";
import { featureGroups } from "@/content/carrentals/content";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const ICONS: Record<string, typeof CarFront> = {
  "Fleet management": Wrench,
  "Vehicle detail pages": CarFront,
  Availability: CalendarRange,
  "Online booking": CalendarCheck,
  "Payment integration": CreditCard,
  "Customer accounts": UserRound,
  "Location pages": MapPin,
  "Multi-location support": Layers,
  SEO: ScanSearch,
  WhatsApp: MessageCircle,
  "CRM integration": Workflow,
  "AI assistant": Bot,
  "Automated follow-ups": RefreshCw,
  Analytics: BarChart3,
  "Mobile-first design": Smartphone,
};

const layout = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
const cols = ["sm:grid-cols-3", "sm:grid-cols-2", "sm:grid-cols-3 lg:grid-cols-1", "sm:grid-cols-2"];
const accent = ["text-emerald", "text-emerald", "text-violet-soft", "text-emerald"];

/** Illustrative trend line — deliberately unlabeled, no numbers implied. */
function Spark() {
  return (
    <svg viewBox="0 0 300 80" className="h-20 w-full" aria-hidden preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3ee6a0" stopOpacity="0.25" />
          <stop offset="1" stopColor="#3ee6a0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 64 C 40 60 60 66 90 52 S 150 46 180 36 S 240 30 300 12 L 300 80 L 0 80 Z" fill="url(#spark-fill)" />
      <path d="M0 64 C 40 60 60 66 90 52 S 150 46 180 36 S 240 30 300 12" fill="none" stroke="#3ee6a0" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function RentalFeatures() {
  // Reorder so the two big groups sit diagonally: Fleet | AI / Locations | Growth
  const groups = [featureGroups[0], featureGroups[2], featureGroups[1], featureGroups[3]];
  return (
    <section id="features" aria-labelledby="features-title" className="section-y relative">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel index="10">Features</SectionLabel>
            <RevealLines
              id="features-title"
              className="h-section mt-8"
              lines={[
                "Every feature a rental",
                <span key="l1">
                  business <span className="serif-em text-silver">actually uses.</span>
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="lede max-w-sm">Pick what you need now. Everything is built so the rest can be added later.</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-12">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.06} className={layout[gi]}>
              <div className="surface relative h-full overflow-hidden rounded-3xl p-5 sm:p-6">
                {gi === 1 && (
                  <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-[radial-gradient(circle,rgb(143_107_255/0.14),transparent_65%)]" />
                )}
                <div className="relative flex items-baseline justify-between">
                  <h3 className="text-lg font-medium tracking-[-0.02em]">{g.title}</h3>
                  <span className="font-mono text-[0.625rem] text-dim">{String(g.items.length).padStart(2, "0")}</span>
                </div>
                <ul className={`relative mt-5 grid gap-2 ${cols[gi]}`}>
                  {g.items.map((f) => {
                    const Icon = ICONS[f.name] ?? CarFront;
                    return (
                      <li
                        key={f.name}
                        className="group/f rounded-2xl border border-line bg-white/[0.015] p-4 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.035]"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`grid size-9 shrink-0 place-items-center rounded-xl border border-line-2 bg-ink ${accent[gi]}`}>
                            <Icon className="size-4" aria-hidden />
                          </span>
                          <p className="text-[0.9375rem] font-medium">{f.name}</p>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted">{f.body}</p>
                      </li>
                    );
                  })}
                </ul>
                {gi === 3 && (
                  <div className="relative mt-4 rounded-2xl border border-line bg-white/[0.015] px-4 pb-2 pt-4">
                    <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-dim">Analytics dashboard · illustrative</p>
                    <Spark />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
