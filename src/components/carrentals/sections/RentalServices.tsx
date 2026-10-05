import { Sparkles } from "lucide-react";
import { services } from "@/content/carrentals/content";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  BookingVignette,
  FleetVignette,
  LocationsVignette,
  PaymentsVignette,
  WebsiteVignette,
} from "../visuals/ServiceVignettes";

const vignettes = {
  website: WebsiteVignette,
  booking: BookingVignette,
  fleet: FleetVignette,
  locations: LocationsVignette,
  payments: PaymentsVignette,
} as const;

const span: Record<string, string> = {
  website: "lg:col-span-2",
  booking: "",
  fleet: "",
  locations: "",
  payments: "",
  automation: "lg:col-span-3",
};

export function RentalServices() {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y relative">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionLabel index="03">What I build</SectionLabel>
            <RevealLines
              id="services-title"
              className="h-section mt-8"
              lines={[
                "Everything a modern",
                <span key="l1">
                  rental business needs <span className="serif-em text-silver">online.</span>
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="lede max-w-sm">
              Start with a website, or build the complete system. Every piece is designed to work together.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Vignette = s.key in vignettes ? vignettes[s.key as keyof typeof vignettes] : null;
            const wide = s.key === "website";
            const auto = s.key === "automation";
            return (
              <Reveal as="li" key={s.key} delay={(i % 3) * 0.07} className={`${span[s.key]} ${wide || auto ? "md:col-span-2" : ""}`}>
                <TiltCard max={3} className="surface h-full rounded-3xl">
                  <article
                    className={`relative grid h-full gap-8 overflow-hidden rounded-3xl p-6 sm:p-8 ${
                      wide ? "lg:grid-cols-[1fr_1.2fr] lg:items-center" : ""
                    } ${auto ? "lg:grid-cols-[0.9fr_1.6fr] lg:items-center" : ""}`}
                  >
                    {auto && (
                      <div aria-hidden className="pointer-events-none absolute -right-20 -top-28 size-96 rounded-full bg-[radial-gradient(circle,rgb(143_107_255/0.14),transparent_65%)]" />
                    )}
                    <div className={`relative flex flex-col ${wide ? "lg:h-full lg:justify-between" : ""}`}>
                      <p className="font-mono text-[0.6875rem] text-emerald">{String(i + 1).padStart(2, "0")}</p>
                      <div>
                      <h3 className="mt-4 text-[1.6rem] font-medium leading-tight tracking-[-0.035em]">{s.title}</h3>
                      <p className="mt-3 max-w-md leading-relaxed text-muted">{s.body}</p>
                      {!auto && (
                        <ul className="mt-5 flex flex-wrap gap-1.5">
                          {s.points.map((p) => (
                            <li key={p} className="rounded-full border border-line-2 px-2.5 py-1 text-xs text-fg/80">
                              {p}
                            </li>
                          ))}
                        </ul>
                      )}
                      </div>
                    </div>

                    {Vignette && (
                      <div className={`relative ${wide ? "" : "order-first"}`}>
                        <Vignette />
                      </div>
                    )}

                    {auto && (
                      <ul className="relative grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {s.points.map((p, k) => (
                          <li
                            key={p}
                            className="group/item relative flex items-center gap-2.5 rounded-xl border border-line bg-white/[0.02] px-3 py-3 text-sm text-fg/85 transition-colors hover:border-violet/40"
                          >
                            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-violet/15 font-mono text-[0.5625rem] text-violet-soft">
                              {k === 0 ? <Sparkles className="size-3" aria-hidden /> : String(k + 1).padStart(2, "0")}
                            </span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
