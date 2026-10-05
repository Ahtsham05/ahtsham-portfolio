"use client";

import { animate, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { CalendarCheck, Check, Sparkles } from "lucide-react";
import { useAppReady } from "@/lib/ready";
import { useFinePointer, useReducedMotionPref } from "@/lib/hooks";
import { RevealLines } from "@/components/ui/Reveal";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { AnchorButton, goTo } from "../ui/Anchor";
import { VehicleArt } from "../visuals/VehicleArt";
import { SHAPES } from "../visuals/shapes";

const ease = [0.16, 1, 0.3, 1] as const;
const HERO_SHAPE = "coupe";

const specs = [
  ["01", "Rental websites"],
  ["02", "Booking systems"],
  ["03", "AI automation"],
  ["04", "WhatsApp & CRM"],
] as const;

/** Glass UI chip floating around the car — shows the "system" around the website. */
function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgb(255_255_255/0.07),rgb(255_255_255/0.02))] px-3.5 py-3 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.9)] backdrop-blur-xl ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function RentalHero() {
  const ready = useAppReady();
  const fine = useFinePointer();
  const reduce = useReducedMotionPref();
  const section = useRef<HTMLElement>(null);
  const carBox = useRef<HTMLDivElement>(null);

  // Pointer → springs → parallax layers + lighting CSS vars
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const typeX = useTransform(sx, (v) => v * -48);
  const typeY = useTransform(sy, (v) => v * -18);
  const carX = useTransform(sx, (v) => v * 18);
  const carY = useTransform(sy, (v) => v * 6);
  const glowX = useTransform(sx, (v) => v * 90);
  const chipX = useTransform(sx, (v) => v * 36);
  const chipY = useTransform(sy, (v) => v * 22);
  const chip2X = useTransform(sx, (v) => v * 56);
  const textX = useTransform(sx, (v) => v * -6);

  // Drive-in: the car rolls in and its wheels turn with the distance travelled
  const drive = useMotionValue(0);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const unsubs = [
      sx.on("change", (v) => {
        el.style.setProperty("--sheen", String(Math.round(330 + (v + 0.5) * 640)));
        el.style.setProperty("--beam", (0.3 + (v + 0.5) * 0.7).toFixed(3));
      }),
      sy.on("change", (v) => el.style.setProperty("--beam-tilt", (v * 7).toFixed(2))),
      drive.on("change", (x) => {
        const w = carBox.current?.offsetWidth ?? 1000;
        const userUnits = (x / w) * 1200;
        const deg = (userUnits / SHAPES[HERO_SHAPE].wheels.r) * (180 / Math.PI);
        carBox.current?.style.setProperty("--wheel-rot", `${deg.toFixed(1)}deg`);
      }),
    ];
    return () => unsubs.forEach((u) => u());
  }, [sx, sy, drive]);

  useEffect(() => {
    if (!ready) return;
    if (reduce) {
      drive.set(0);
      return;
    }
    const from = -(window.innerWidth * 1.1);
    drive.set(from);
    const controls = animate(drive, 0, { duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 });
    // after parking, sweep a light across the bodywork once
    const sweep = window.setTimeout(() => {
      const el = section.current;
      if (!el) return;
      el.style.setProperty("--sheen", "-200");
      requestAnimationFrame(() => el.style.setProperty("--sheen", "1100"));
    }, 2500);
    return () => {
      controls.stop();
      clearTimeout(sweep);
    };
  }, [ready, reduce, drive]);

  const onMove = (e: React.PointerEvent) => {
    if (!fine || reduce || e.pointerType !== "mouse" || !section.current) return;
    const r = section.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const fade = (delay: number, y = 18) => ({
    initial: { opacity: 0, y },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1.1, ease, delay },
  });

  return (
    <section
      ref={section}
      id="top"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-labelledby="hero-title"
      className="relative isolate flex flex-col overflow-hidden pt-28 md:pt-36 lg:min-h-[max(100svh,720px)] lg:pt-[clamp(8rem,17vh,10.5rem)]"
      style={{ ["--sheen" as string]: 1100, ["--beam" as string]: 0.6 }}
    >
      {/* ── Atmosphere ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#060706_0%,#070807_55%,#0b0e0c_78%,#070807_100%)]" />
        {/* studio ceiling light */}
        <div className="absolute left-1/2 top-0 h-px w-[70vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute left-1/2 top-[-12vh] h-[34vh] w-[80vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgb(236_238_233/0.08),transparent_65%)]" />
        <div className="absolute right-[-12%] top-[8%] h-[70vh] w-[55vw] rounded-full bg-[radial-gradient(circle,rgb(143_107_255/0.13),transparent_62%)] blur-2xl" />
        <motion.div
          style={{ x: glowX }}
          className="absolute bottom-[-18vh] right-[-8%] h-[62vh] w-[95vw] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgb(62_230_160/0.16),rgb(62_230_160/0.04)_45%,transparent_70%)] lg:w-[75vw]"
        />
        {/* floor plane */}
        <div className="absolute inset-x-0 bottom-0 h-[42%] [perspective:600px]">
          <div className="bg-grid absolute inset-x-[-50%] bottom-0 top-0 origin-bottom opacity-40 [mask-image:linear-gradient(to_top,#000_10%,transparent_85%)] [transform:rotateX(62deg)]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      {/* Giant backdrop typography */}
      <motion.p
        aria-hidden
        style={{ x: typeX, y: typeY }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: 2, delay: 0.6 }}
        className="pointer-events-none absolute inset-x-0 bottom-[30%] -z-10 select-none whitespace-nowrap text-center font-medium uppercase leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgb(236_238_233/0.07)] max-lg:hidden lg:text-[13.5vw]"
      >
        Built for the road.
      </motion.p>

      <div className="container-x relative z-10">
        <motion.div style={{ x: textX }} className="max-w-[60rem]">
          <motion.p {...fade(0.1, 10)} className="eyebrow flex items-center gap-3">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald/60" />
              <span className="relative size-2 rounded-full bg-emerald" />
            </span>
            Car rental web specialist
          </motion.p>

          <RevealLines
            as="h1"
            id="hero-title"
            play={ready}
            delay={0.15}
            stagger={0.1}
            className="display mt-6 text-[clamp(2.6rem,6.2vw,6rem)] text-fg"
            lines={[
              "Turn more searches",
              <span key="l1">
                into <span className="serif-em text-silver pr-[0.06em]">car rental</span>
              </span>,
              <span key="l2">
                bookings<span className="text-emerald">.</span>
              </span>,
            ]}
          />

          <div className="mt-8 grid gap-8 lg:max-w-[34rem]">
            <motion.p {...fade(0.5)} className="lede">
              I design and build high-converting websites, booking experiences and AI-powered automations for modern
              car rental businesses.
            </motion.p>
            <motion.div {...fade(0.6)} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <AnchorButton href="#contact" size="lg">
                Get Your Rental Website
              </AnchorButton>
              <AnchorButton href="#services" variant="outline" size="lg" icon="down">
                See What I Build
              </AnchorButton>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── The car ── */}
      <div className="relative mt-10 flex-1 lg:absolute lg:inset-0 lg:mt-0">
        <motion.div
          style={{ x: carX, y: carY }}
          className="relative ml-[-22%] w-[124%] sm:ml-[-6%] sm:w-[108%] lg:absolute lg:bottom-[8%] lg:right-[-7%] lg:m-0 lg:w-[min(66vw,1040px)] xl:right-[-4%]"
        >
          {/* studio backlight that separates the dark bodywork from the background */}
          <div aria-hidden className="pointer-events-none absolute inset-x-[8%] bottom-[22%] top-[-10%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgb(220_255_240/0.10),rgb(62_230_160/0.06)_40%,transparent_70%)] blur-xl" />
          <motion.div
            ref={carBox}
            style={{ x: drive }}
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <VehicleArt
              shape={HERO_SHAPE}
              lights
              reflection
              sheen
              title="Studio-lit illustration of a grand-touring coupe, headlights on"
              className="w-full overflow-visible"
            />
          </motion.div>

          {/* Floating product chips (illustrative UI) */}
          <motion.div
            style={{ x: chipX, y: chipY }}
            {...fade(2.4, 14)}
            className="absolute left-[40%] top-[-14%] hidden md:block lg:hidden xl:left-[38%] xl:top-[-24%] xl:block"
          >
            <Chip>
              <p className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                <CalendarCheck className="size-3.5 text-emerald" aria-hidden /> Availability
              </p>
              <p className="mt-1.5 text-sm font-medium">GT Coupe · Fri → Mon</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-emerald-soft">
                <span className="size-1.5 rounded-full bg-emerald" /> Available · 3 days
              </p>
            </Chip>
          </motion.div>
          <motion.div
            style={{ x: chip2X }}
            {...fade(2.6, 14)}
            className="absolute right-[9%] top-[-4%] hidden xl:block"
          >
            <Chip className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-full bg-violet/20 text-violet-soft">
                <Sparkles className="size-4" aria-hidden />
              </span>
              <span>
                <span className="block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">AI assistant</span>
                <span className="mt-0.5 block text-sm">3 cars match your dates</span>
              </span>
            </Chip>
          </motion.div>
          <motion.div
            style={{ x: chipX }}
            {...fade(2.8, 14)}
            className="absolute bottom-[16%] left-[-2%] hidden lg:block"
          >
            <Chip className="flex items-center gap-2.5 py-2.5">
              <BrandIcon name="whatsapp" className="size-4 text-emerald" />
              <span className="text-xs">Booking confirmed</span>
              <Check className="size-3.5 text-emerald" aria-hidden />
            </Chip>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Spec sheet + scroll cue ── */}
      <div className="container-x relative z-10 mt-6 pb-8 lg:mt-auto lg:pb-10">
        <motion.div {...fade(0.9)} className="flex items-end justify-between gap-8">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-10">
            {specs.map(([n, label]) => (
              <div key={n} className="flex items-baseline gap-2.5">
                <dt className="font-mono text-[0.625rem] text-emerald">{n}</dt>
                <dd className="text-sm text-muted">{label}</dd>
              </div>
            ))}
          </dl>
          <a
            href="#why"
            onClick={(e) => goTo(e, "#why")}
            className="group hidden shrink-0 items-center gap-3 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-muted transition-colors hover:text-fg md:flex"
          >
            Scroll
            <span className="relative block h-10 w-px overflow-hidden bg-line-2">
              <span className="cr-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-emerald" />
            </span>
          </a>
        </motion.div>
      </div>
      <style>{`.cr-scroll-cue{animation:cr-cue 2.2s cubic-bezier(.65,0,.35,1) infinite}@keyframes cr-cue{from{transform:translateY(-100%)}to{transform:translateY(200%)}}`}</style>
    </section>
  );
}
