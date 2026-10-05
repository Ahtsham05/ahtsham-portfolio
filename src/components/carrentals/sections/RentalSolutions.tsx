"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import {
  BellRing,
  CalendarCheck,
  CalendarDays,
  CarFront,
  CircleCheck,
  CreditCard,
  MousePointerClick,
  Search,
} from "lucide-react";
import { journey } from "@/content/carrentals/content";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VehicleArt } from "../visuals/VehicleArt";
import { SHAPES } from "../visuals/shapes";

const ICONS = [Search, CarFront, CalendarCheck, CalendarDays, MousePointerClick, CreditCard, CircleCheck, BellRing];
const ease = [0.16, 1, 0.3, 1] as const;
const N = journey.length;

function Heading({ id }: { id?: string }) {
  return (
    <>
      <SectionLabel index="02">The solution</SectionLabel>
      <RevealLines
        id={id}
        className="h-section mt-8"
        lines={[
          "One digital experience.",
          <span key="l1">
            From <span className="serif-em text-emerald-soft">discovery</span> to booking.
          </span>,
        ]}
      />
    </>
  );
}

/** Desktop: pinned scene — a car drives the customer journey as you scroll. */
function RoadJourney() {
  const wrap = useRef<HTMLDivElement>(null);
  const road = useRef<HTMLDivElement>(null);
  const car = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const lit = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const carLeft = useTransform(scrollYProgress, (p) => `calc(${p * 100}% - 19.5rem)`);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(N - 1, Math.floor(p * (N - 1) + 0.2)));
    // roll the wheels by the distance travelled
    const roadW = road.current?.offsetWidth ?? 1000;
    const carW = car.current?.offsetWidth ?? 312;
    const units = ((p * roadW) / carW) * 1200;
    car.current?.style.setProperty("--wheel-rot", `${((units / SHAPES.coupe.wheels.r) * (180 / Math.PI)).toFixed(1)}deg`);
  });

  const step = journey[active];
  const Icon = ICONS[active];

  return (
    <div ref={wrap} className="relative h-[340vh]">
      <div className="sticky top-0 flex h-[100svh] min-h-[640px] flex-col justify-between overflow-hidden pb-14 pt-[clamp(6.5rem,13vh,8.5rem)]">
        {/* oversized backdrop of the current step */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[22%] -z-10 flex justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease }}
              className="whitespace-nowrap text-[12vw] font-medium uppercase leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgb(236_238_233/0.06)]"
            >
              {step.title}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="container-x grid grid-cols-12 items-end gap-10">
          <div className="col-span-7">
            <Heading id="solution-title" />
          </div>
          <div className="col-span-4 col-start-9">
            <div className="flex items-baseline gap-3 font-mono text-sm text-muted">
              <span className="text-5xl font-medium tabular-nums tracking-[-0.04em] text-fg">
                {String(active + 1).padStart(2, "0")}
              </span>
              / {String(N).padStart(2, "0")}
            </div>
            <div className="relative mt-6 min-h-[8.5rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease }}
                >
                  <p className="flex items-center gap-3 text-2xl font-medium tracking-[-0.03em]">
                    <span className="grid size-10 place-items-center rounded-full border border-emerald/30 bg-emerald/10 text-emerald">
                      <Icon className="size-4.5" aria-hidden />
                    </span>
                    {step.title}
                  </p>
                  <p className="lede mt-4">{step.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* the road */}
        <div className="container-x">
          <div ref={road} className="relative mx-6 pt-40">
            {/* road surface + lane markings */}
            <div aria-hidden className="absolute inset-x-[-1.5rem] bottom-[3.25rem] h-16 translate-y-full bg-[linear-gradient(180deg,rgb(236_238_233/0.04),transparent)] [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]" />
            {/* car (positioned along the road) */}
            <motion.div
              ref={car}
              style={{ left: carLeft }}
              className="pointer-events-none absolute bottom-[3.25rem] w-[19.5rem] translate-y-[16.5%]"
              aria-hidden
            >
              <VehicleArt shape="coupe" lights reflection className="w-full overflow-visible" />
            </motion.div>

            <div className="relative h-px bg-line-2">
              <motion.div style={{ width: lit }} className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald/30 via-emerald to-violet shadow-[0_0_14px_rgb(62_230_160/0.6)]" />
            </div>
            <ol className="relative flex h-12 justify-between">
              {journey.map((j, i) => {
                const on = i <= active;
                return (
                  <li key={j.title} className="relative flex w-0 flex-col items-center">
                    <span
                      className={`-mt-[5px] block size-[9px] rounded-full border transition-all duration-500 ${
                        i === active
                          ? "scale-125 border-emerald bg-emerald shadow-[0_0_14px_rgb(62_230_160/0.9)]"
                          : on
                            ? "border-emerald/70 bg-ink"
                            : "border-line-2 bg-ink"
                      }`}
                    />
                    <span
                      className={`absolute top-5 w-[7.5rem] font-mono text-[0.625rem] uppercase leading-snug tracking-[0.16em] transition-colors duration-500 ${
                        i === 0 ? "left-0 -translate-x-1" : i === N - 1 ? "right-0 translate-x-1 text-right" : "left-1/2 -translate-x-1/2 text-center"
                      } ${i === active ? "text-fg" : on ? "text-muted" : "text-dim"}`}
                    >
                      {j.title}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile & tablet: vertical timeline with a scroll-linked progress line. */
function TimelineJourney() {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="container-x section-y">
      <Heading />
      <ol ref={list} className="relative mt-14 space-y-3 pl-12">
        <span aria-hidden className="absolute bottom-6 left-[1.1875rem] top-6 w-px bg-line-2" />
        <motion.span
          aria-hidden
          style={{ scaleY }}
          className="absolute bottom-6 left-[1.1875rem] top-6 w-px origin-top bg-gradient-to-b from-emerald to-violet"
        />
        {journey.map((j, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal as="li" key={j.title} y={16} className="relative">
              <span className="absolute -left-12 top-4 grid size-10 place-items-center rounded-full border border-line-2 bg-ink text-emerald">
                <Icon className="size-4" aria-hidden />
              </span>
              <div className="surface rounded-2xl p-5">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-medium tracking-[-0.02em]">{j.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{j.body}</p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}

export function RentalSolutions() {
  return (
    <section id="journey" aria-label="The solution: one digital experience from discovery to booking" className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgb(62_230_160/0.06),transparent_65%)]" />
      </div>
      <div className="hidden lg:block">
        <RoadJourney />
      </div>
      <div className="lg:hidden">
        <TimelineJourney />
      </div>
    </section>
  );
}
