"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Lock, MessageSquareText, RotateCcw, Search, Send, Sparkles, UserRoundCheck } from "lucide-react";
import { fleet, formatRate, type Vehicle } from "@/content/carrentals/fleet";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useInView, useReducedMotionPref } from "@/lib/hooks";
import { VehicleMedia } from "../visuals/VehicleMedia";

const ease = [0.16, 1, 0.3, 1] as const;
const DAYS = 3;
const suvs = ["range-rover-sport", "mercedes-g-class", "cadillac-escalade"]
  .map((id) => fleet.find((v) => v.id === id))
  .filter(Boolean) as Vehicle[];

type Msg =
  | { kind: "user"; text: string }
  | { kind: "ai"; text: string }
  | { kind: "cars" }
  | { kind: "compare" }
  | { kind: "pay" };

type Reply = "compare" | "book" | "pickup";

const SCRIPT: Msg[] = [
  { kind: "user", text: "I need a luxury SUV in Dubai from Friday to Monday." },
  { kind: "ai", text: "I found 3 suitable vehicles for Friday → Monday (3 days). Would you like to compare them?" },
  { kind: "cars" },
];

const REPLIES: Record<Reply, { label: string; user: string; answer: Msg[] }> = {
  compare: {
    label: "Compare them",
    user: "Yes, compare them.",
    answer: [{ kind: "ai", text: "Here’s a quick side-by-side for your dates:" }, { kind: "compare" }],
  },
  book: {
    label: "Book the Range Rover",
    user: "Book the Range Rover Sport.",
    answer: [
      { kind: "ai", text: "Great choice. I’ve held the Range Rover Sport for Friday → Monday. Pay the deposit to confirm:" },
      { kind: "pay" },
    ],
  },
  pickup: {
    label: "Airport pickup?",
    user: "Can I collect it at the airport?",
    answer: [{ kind: "ai", text: "Yes — collect at Airport Arrivals or choose hotel delivery. I’ll send the meeting point on WhatsApp once you book." }],
  },
};

function Bubble({ msg }: { msg: Msg }) {
  if (msg.kind === "user")
    return (
      <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-fg px-4 py-2.5 text-[0.9375rem] text-ink">{msg.text}</div>
    );
  if (msg.kind === "ai")
    return (
      <div className="flex max-w-[88%] gap-2.5">
        <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-violet/20 text-violet-soft">
          <Sparkles className="size-3.5" aria-hidden />
        </span>
        <div className="rounded-2xl rounded-tl-md border border-line-2 bg-white/[0.04] px-4 py-2.5 text-[0.9375rem]">{msg.text}</div>
      </div>
    );
  if (msg.kind === "cars")
    return (
      <ul className="cr-snap -mx-1 flex gap-2.5 overflow-x-auto px-1 pb-1 pl-10">
        {suvs.map((v) => (
          <li key={v.id} className="w-44 shrink-0 rounded-2xl border border-line-2 bg-ink p-3">
            <VehicleMedia vehicle={v} sizes="11rem" />
            <p className="mt-2 truncate text-sm font-medium">{v.model}</p>
            <p className="text-xs text-muted">
              {formatRate(v.dailyRate)}/day · {v.seats} seats
            </p>
            <span className="mt-2.5 flex items-center justify-center gap-1 rounded-full border border-line-2 py-1.5 text-xs">
              View <ArrowRight className="size-3" aria-hidden />
            </span>
          </li>
        ))}
      </ul>
    );
  if (msg.kind === "compare")
    return (
      <div className="ml-10 overflow-hidden rounded-2xl border border-line-2">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/[0.04] font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-dim">
            <tr>
              <th className="px-3 py-2 font-normal">Vehicle</th>
              <th className="px-3 py-2 font-normal">Seats</th>
              <th className="px-3 py-2 font-normal">Fuel</th>
              <th className="px-3 py-2 text-right font-normal">{DAYS} days</th>
            </tr>
          </thead>
          <tbody>
            {suvs.map((v) => (
              <tr key={v.id} className="border-t border-line">
                <td className="px-3 py-2">{v.model}</td>
                <td className="px-3 py-2 text-muted">{v.seats}</td>
                <td className="px-3 py-2 text-muted">{v.fuel}</td>
                <td className="px-3 py-2 text-right">{formatRate(v.dailyRate * DAYS)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  return (
    <div className="ml-10 flex items-center justify-between gap-3 rounded-2xl border border-emerald/40 bg-emerald/[0.06] p-3.5">
      <div>
        <p className="text-sm font-medium">Range Rover Sport · Fri → Mon</p>
        <p className="mt-0.5 text-xs text-muted">Secure deposit link · demo</p>
      </div>
      <span className="flex items-center gap-1.5 rounded-full bg-fg px-3.5 py-2 text-xs font-medium text-ink">
        <Lock className="size-3" aria-hidden /> Pay $400
      </span>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex items-center gap-2.5" aria-label="Assistant is typing">
      <span className="grid size-7 place-items-center rounded-full bg-violet/20 text-violet-soft">
        <Sparkles className="size-3.5" aria-hidden />
      </span>
      <span className="flex gap-1 rounded-2xl rounded-tl-md border border-line-2 bg-white/[0.04] px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 animate-bounce rounded-full bg-violet-soft" style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </span>
    </div>
  );
}

const capabilities = [
  { Icon: MessageSquareText, title: "Understands natural requests", body: "Car type, dates, location and budget — from one message." },
  { Icon: Search, title: "Checks real availability", body: "Answers from your live fleet and pricing, not guesses." },
  { Icon: Check, title: "Recommends and books", body: "Suggests the right car and sends a secure booking link." },
  { Icon: UserRoundCheck, title: "Hands over to your team", body: "Escalates to a person on WhatsApp whenever needed." },
];

export function AIChatDemo() {
  const box = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const inView = useInView(box, "-20% 0px");
  const reduce = useReducedMotionPref();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [queue, setQueue] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [used, setUsed] = useState<Reply[]>([]);
  const [run, setRun] = useState(0);
  const started = useRef(-1);

  // Start the opening conversation once per run, the first time it's on screen.
  useEffect(() => {
    if (!inView || started.current === run) return;
    started.current = run;
    const t = setTimeout(() => setQueue(SCRIPT), reduce ? 0 : 500);
    return () => clearTimeout(t);
  }, [inView, run, reduce]);

  // Drain the queue: user lines appear directly, assistant lines after a
  // typing indicator. With reduced motion everything lands at once.
  useEffect(() => {
    if (!queue.length) return;
    const [next] = queue;
    const deliver = () => {
      setTyping(false);
      setMsgs((x) => [...x, next]);
      setQueue((q) => q.slice(1));
    };
    let t: ReturnType<typeof setTimeout>;
    if (reduce) {
      t = setTimeout(() => {
        setMsgs((x) => [...x, ...queue]);
        setQueue([]);
      }, 0);
    } else if (next.kind === "user") t = setTimeout(deliver, 450);
    else if (!typing) t = setTimeout(() => setTyping(true), 350);
    else t = setTimeout(deliver, next.kind === "ai" ? 1100 : 500);
    return () => clearTimeout(t);
  }, [queue, typing, reduce]);

  // keep the newest message in view inside the chat window
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [msgs, typing, reduce]);

  const ask = (r: Reply) => {
    setUsed((u) => [...u, r]);
    setQueue((q) => [...q, { kind: "user", text: REPLIES[r].user }, ...REPLIES[r].answer]);
  };

  const replay = () => {
    setMsgs([]);
    setQueue([]);
    setUsed([]);
    setTyping(false);
    setRun((n) => n + 1);
  };

  const scriptDone = msgs.length >= SCRIPT.length && !queue.length;
  const options = (Object.keys(REPLIES) as Reply[]).filter((r) => !used.includes(r));

  return (
    <section id="assistant" aria-labelledby="assistant-title" className="section-y relative">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index="08.1">AI rental assistant</SectionLabel>
          <RevealLines
            id="assistant-title"
            className="h-section mt-8"
            lines={[
              "A booking assistant",
              <span key="l1">
                that never <span className="serif-em text-violet-soft">sleeps.</span>
              </span>,
            ]}
          />
          <Reveal delay={0.1}>
            <p className="lede mt-8 max-w-md">
              An AI assistant trained on your fleet, prices and policies answers customers instantly — on your website or
              WhatsApp.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {capabilities.map(({ Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={0.1 + i * 0.05} className="flex gap-3">
                <Icon className="mt-0.5 size-4 shrink-0 text-violet-soft" aria-hidden />
                <div>
                  <p className="text-[0.9375rem] font-medium">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1} className="min-w-0 lg:col-span-6 lg:col-start-7">
          <div ref={box} className="relative">
            <div aria-hidden className="pointer-events-none absolute -inset-10 rounded-[48px] bg-[radial-gradient(ellipse_at_50%_40%,rgb(143_107_255/0.16),transparent_65%)] blur-xl" />
            <div className="relative flex h-[34rem] flex-col overflow-hidden rounded-[28px] border border-line-2 bg-ink-2/90 shadow-[0_60px_120px_-50px_rgb(0_0_0/0.95)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="relative grid size-9 place-items-center rounded-full bg-gradient-to-br from-violet/40 to-emerald/30">
                    <Sparkles className="size-4" aria-hidden />
                    <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-ink-2 bg-emerald" />
                  </span>
                  <div>
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-violet-soft">AI Rental Assistant</p>
                    <p className="text-xs text-muted">Replies instantly</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={replay}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line-2 px-3 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-dim transition-colors hover:text-fg"
                >
                  <RotateCcw className="size-3" aria-hidden /> Replay
                </button>
              </div>

              <div ref={scroller} data-lenis-prevent className="cr-snap flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
                <p className="text-center font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-dim">Example experience · not a live business</p>
                <AnimatePresence initial={false}>
                  {msgs.map((m, i) => (
                    <motion.div key={`${run}-${i}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}>
                      <Bubble msg={m} />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {typing && <Typing />}
              </div>

              <div className="border-t border-line p-4">
                <div className="mb-3 flex min-h-8 flex-wrap gap-2">
                  {scriptDone &&
                    options.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => ask(r)}
                        disabled={queue.length > 0}
                        className="rounded-full border border-violet/40 bg-violet/10 px-3.5 py-1.5 text-xs text-violet-soft transition-colors hover:bg-violet/20"
                      >
                        {REPLIES[r].label}
                      </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 rounded-full border border-line-2 bg-white/[0.03] py-1.5 pl-4 pr-1.5">
                  <span className="flex-1 truncate text-sm text-dim">Ask about cars, dates or pickup…</span>
                  <span className="grid size-8 place-items-center rounded-full bg-fg text-ink" aria-hidden>
                    <Send className="size-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
