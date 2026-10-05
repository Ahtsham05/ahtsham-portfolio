"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "p" | "span";
};

/** Fade + rise when scrolled into view (once). */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </Comp>
  );
}

type LinesProps = {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** When provided, animation is driven by this flag instead of viewport. */
  play?: boolean;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
};

/** Masked line-by-line text reveal — each line rises from behind a clip. */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  play,
  as = "h2",
  id,
}: LinesProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const controlled = play !== undefined;

  return (
    <Comp
      id={id}
      className={className}
      initial={reduce ? false : "hidden"}
      animate={controlled ? (play ? "show" : "hidden") : undefined}
      whileInView={controlled ? undefined : "show"}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block will-change-transform ${lineClassName ?? ""}`}
            variants={{
              hidden: { y: "110%", rotate: 2 },
              show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
