"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/ui/Magnetic";
import { scrollToTarget } from "@/components/layout/SmoothScroll";

/** Smooth-scroll to an in-page anchor and keep the URL hash in sync. */
export function goTo(e: React.MouseEvent, hash: string) {
  if (!hash.startsWith("#")) return;
  e.preventDefault();
  requestAnimationFrame(() => scrollToTarget(hash));
  history.replaceState(null, "", hash);
}

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow] duration-500 ease-[var(--ease-out-expo)] whitespace-nowrap";

const sizes = {
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-7 text-base",
  sm: "h-10 px-4.5 text-sm",
};

const variants = {
  primary:
    "bg-fg text-ink hover:bg-white shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_10px_40px_-10px_rgb(62_230_160/0.45)] hover:shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_14px_50px_-8px_rgb(62_230_160/0.6)]",
  outline: "border border-line-2 text-fg hover:border-emerald/50 hover:bg-emerald/[0.06] bg-white/[0.02]",
};

/**
 * In-page CTA styled like the portfolio's ButtonLink. Handles `#hash` targets
 * with smooth scrolling; any other href behaves as a normal link.
 */
export function AnchorButton({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = "right",
  className,
  magnetic = true,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  icon?: "right" | "down" | "none";
  className?: string;
  magnetic?: boolean;
}) {
  const Icon = icon === "down" ? ArrowDown : ArrowRight;
  const shift = icon === "down" ? "group-hover:translate-y-[140%]" : "group-hover:translate-x-[140%]";
  const enter = icon === "down" ? "-translate-y-[140%] group-hover:translate-y-0" : "-translate-x-[140%] group-hover:translate-x-0";
  const el = (
    <a
      href={href}
      onClick={(e) => goTo(e, href)}
      data-cursor="cta"
      className={`${base} ${sizes[size]} ${variants[variant]} ${className ?? ""}`}
    >
      <span className="relative z-10">{children}</span>
      {icon !== "none" && (
        <span className="relative z-10 grid size-4 place-items-center overflow-hidden">
          <Icon aria-hidden className={`size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] ${shift}`} />
          <Icon aria-hidden className={`absolute size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] ${enter}`} />
        </span>
      )}
    </a>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

/** Plain in-page link with smooth scrolling (for footers, inline text). */
export function HashLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a href={href} onClick={(e) => goTo(e, href)} className={className}>
      {children}
    </a>
  );
}
