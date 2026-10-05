"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { cr, crNav } from "@/content/carrentals/content";
import { Monogram } from "@/components/ui/Monogram";
import { Magnetic } from "@/components/ui/Magnetic";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { goTo } from "../ui/Anchor";
import { useAppReady } from "@/lib/ready";

const ease = [0.16, 1, 0.3, 1] as const;

function Brand({ onClick }: { onClick?: (e: React.MouseEvent) => void }) {
  return (
    <a href="#top" onClick={onClick} aria-label={`${cr.brand} — car rental websites, back to top`} className="group flex items-center gap-3">
      <Monogram className="h-6 w-auto text-fg" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.8125rem] font-medium tracking-[0.2em] text-fg">AHTSHAM LABS</span>
        <span className="mt-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.24em] text-emerald">{cr.specialistLabel}</span>
      </span>
    </a>
  );
}

export function RentalNav() {
  const ready = useAppReady();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    let raf = 0;
    const ids = crNav.map((l) => l.href.slice(1));
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 40);
      const mid = window.innerHeight * 0.45;
      let current = "";
      for (const id of ids) {
        const r = document.getElementById(id)?.getBoundingClientRect();
        if (r && r.top <= mid && r.bottom >= mid) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Lock scroll while the fullscreen menu is open
  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const nav = (e: React.MouseEvent, href: string) => {
    setOpen(false);
    goTo(e, href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1, ease, delay: 0.6 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className={`container-x transition-[padding] duration-700 ease-[var(--ease-out-expo)] ${scrolled ? "pt-2.5" : "pt-4 md:pt-5"}`}>
          <nav
            aria-label="Car rental page"
            className={`relative flex items-center justify-between rounded-full pl-4 pr-2 transition-all duration-700 ease-[var(--ease-out-expo)] md:pl-5 ${
              scrolled
                ? "h-14 border border-line-2 bg-ink/75 shadow-[0_20px_60px_-30px_rgb(0_0_0/0.9)] backdrop-blur-xl"
                : "h-16 border border-transparent bg-transparent"
            }`}
          >
            <Brand onClick={(e) => nav(e, "#top")} />

            <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center xl:flex">
              {crNav.map((l) => {
                const isActive = active === l.href.slice(1);
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => nav(e, l.href)}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative block whitespace-nowrap rounded-full px-3 py-2 text-[0.8125rem] transition-colors 2xl:px-3.5 duration-300 ${
                        isActive ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="cr-nav-active"
                          className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Magnetic className="hidden sm:inline-flex">
                <a
                  href="#contact"
                  onClick={(e) => nav(e, "#contact")}
                  data-cursor="cta"
                  className="group inline-flex h-10 items-center gap-2 rounded-full bg-fg px-4.5 text-sm font-medium text-ink transition-colors hover:bg-white"
                >
                  Get My Website
                  <ArrowRight className="size-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5" aria-hidden />
                </a>
              </Magnetic>

              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="cr-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative z-[60] grid size-11 place-items-center rounded-full border border-line-2 bg-white/[0.03] xl:hidden"
              >
                <span className="relative block h-3 w-5">
                  <span className={`absolute left-0 h-px w-5 bg-fg transition-all duration-500 ease-[var(--ease-out-expo)] ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 h-px bg-fg transition-all duration-500 ease-[var(--ease-out-expo)] ${open ? "top-1.5 w-5 -rotate-45" : "top-3 w-3.5"}`} />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="cr-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[45] flex flex-col overflow-y-auto bg-ink/95 backdrop-blur-2xl xl:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div aria-hidden className="pointer-events-none absolute -right-1/3 bottom-0 h-[70vw] w-[90vw] rounded-full bg-[radial-gradient(circle,rgb(62_230_160/0.12),transparent_65%)] blur-2xl" />
            {/* headlight streak */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[5.5rem] h-px bg-gradient-to-r from-transparent via-emerald/60 to-transparent" />

            <div className="container-x flex flex-1 flex-col justify-between gap-10 pb-10 pt-28">
              <ul>
                {crNav.map((l, i) => (
                  <li key={l.href} className="overflow-hidden border-b border-line">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.05 }}
                    >
                      <a href={l.href} onClick={(e) => nav(e, l.href)} className="group flex items-baseline gap-4 py-3.5">
                        <span className="font-mono text-[0.6875rem] text-emerald">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-[clamp(1.75rem,8vw,2.75rem)] font-medium leading-none tracking-[-0.04em] transition-colors group-hover:text-emerald-soft">
                          {l.label}
                        </span>
                      </a>
                    </motion.div>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.5 }}
                className="space-y-6"
              >
                <a
                  href="#contact"
                  onClick={(e) => nav(e, "#contact")}
                  className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-fg font-medium text-ink"
                >
                  Get My Website <ArrowRight className="size-4" aria-hidden />
                </a>
                <div className="flex items-center justify-between gap-4">
                  <Link href="/" className="text-sm text-muted underline-offset-4 hover:text-fg hover:underline">
                    Main portfolio
                  </Link>
                  <div className="flex gap-2">
                    {(
                      [
                        ["linkedin", site.socials.linkedin, "LinkedIn"],
                        ["github", site.socials.github, "GitHub"],
                        ["upwork", site.socials.upwork, "Upwork"],
                      ] as const
                    ).map(([icon, href, label]) => (
                      <a
                        key={icon}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="grid size-11 place-items-center rounded-full border border-line-2 text-muted hover:text-fg"
                      >
                        <BrandIcon name={icon} className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
