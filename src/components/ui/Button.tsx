import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "ghost" | "outline";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow] duration-500 ease-[var(--ease-out-expo)] whitespace-nowrap";

const sizes = {
  md: "h-12 px-6 text-[0.9375rem]",
  sm: "h-10 px-4.5 text-sm",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-ink hover:bg-white shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_10px_40px_-10px_rgb(62_230_160/0.45)] hover:shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_14px_50px_-8px_rgb(62_230_160/0.6)]",
  outline:
    "border border-line-2 text-fg hover:border-emerald/50 hover:bg-emerald/[0.06] bg-white/[0.02]",
  ghost: "text-fg hover:text-emerald-soft",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  external?: boolean;
  magnetic?: boolean;
  icon?: "right" | "up" | "none";
  className?: string;
} & Omit<ComponentProps<"a">, "href">;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
  magnetic = true,
  icon = "right",
  className,
  ...rest
}: Props) {
  const Icon = icon === "up" ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon !== "none" && (
        <span className="relative z-10 grid size-4 place-items-center overflow-hidden">
          <Icon
            aria-hidden
            className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-[140%]"
          />
          <Icon
            aria-hidden
            className="absolute size-4 -translate-x-[140%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0"
          />
        </span>
      )}
    </>
  );
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className ?? ""}`;

  const el = external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} data-cursor="cta" {...rest}>
      {content}
    </a>
  ) : (
    <Link href={href} className={cls} data-cursor="cta" {...rest}>
      {content}
    </Link>
  );

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
