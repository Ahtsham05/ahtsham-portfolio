"use client";

import { useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { processSteps } from "@/content/carrentals/content";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rim } from "../visuals/Rim";

const N = processSteps.length;

export function RentalProcess() {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 60%", "end 60%"] });
  // spoke k points to the marker when step k is active
  const raw = useTransform(scrollYProgress, (p) => -p * (N - 1) * 60);
  const rotate = useSpring(raw, { stiffness: 80, damping: 22 });
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.min(N - 1, Math.max(0, Math.round(p * (N - 1))))));

  return (
    <section id="process" aria-labelledby="process-title" className="section-y relative">
      <div className="container-x">
        <SectionLabel index="13">Process</SectionLabel>
        <RevealLines
          id="process-title"
          className="display mt-8 text-[clamp(2.6rem,7vw,6.25rem)] uppercase"
          lines={[
            "From fleet",
            <span key="l1">
              to <span className="serif-em normal-case text-emerald-soft">bookings.</span>
            </span>,
          ]}
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <div className="sticky top-[max(6rem,calc(50svh-17rem))]">
              <Reveal className="relative mx-auto w-[min(78vw,30rem)] lg:w-full lg:max-w-[32rem]">
                <div aria-hidden className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(62_230_160/0.14),transparent_65%)] blur-2xl" />
                <div className="[transform:perspective(1400px)_rotateY(-16deg)_rotateX(6deg)]">
                  <Rim
                    rotate={rotate}
                    active={active}
                    center={
                      <div className="text-center">
                        <p className="font-mono text-[clamp(1.1rem,2.4vw,1.6rem)] font-medium tabular-nums">{String(active + 1).padStart(2, "0")}</p>
                        <p className="mt-0.5 font-mono text-[0.5rem] uppercase tracking-[0.22em] text-emerald">{processSteps[active].title}</p>
                      </div>
                    }
                  />
                </div>
                <div aria-hidden className="mx-auto mt-2 h-6 w-3/4 rounded-[50%] bg-[radial-gradient(ellipse,rgb(0_0_0/0.8),transparent_70%)]" />
              </Reveal>
            </div>
          </div>

          <ol ref={list} className="lg:col-span-5 lg:col-start-8 lg:py-[12vh]">
            {processSteps.map((s, i) => (
              <li
                key={s.title}
                className={`border-t border-line py-8 transition-opacity duration-500 lg:min-h-[34vh] ${i === active ? "opacity-100" : "lg:opacity-40"}`}
              >
                <div className="flex items-baseline gap-5">
                  <span className={`font-mono text-sm transition-colors duration-500 ${i === active ? "text-emerald" : "text-dim"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium uppercase leading-none tracking-[-0.03em]">{s.title}</h3>
                    <p className="lede mt-4 max-w-sm">{s.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
