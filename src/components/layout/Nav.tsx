"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { navLinks, site } from "@/content/site";
import { Monogram } from "../ui/Monogram";
import { Magnetic } from "../ui/Magnetic";
import { scrollToTarget } from "./SmoothScroll";
import { useAppReady } from "@/lib/ready";
import { BrandIcon } from "../ui/BrandIcon";

const ease = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const pathname = usePathname();
  const ready = useAppReady();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav section whose area contains the viewport's midline
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = navLinks.map((l) => l.href.split("#")[1]);
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // Lock scroll while the mobile menu is open
  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onAnchor = (e: React.MouseEvent, href: string) => {
    const hash = href.slice(href.indexOf("#"));
    setOpen(false);
    if (pathname === "/" && hash.length > 1) {
      e.preventDefault();
      // wait a tick so the menu can release scroll lock
      requestAnimationFrame(() => scrollToTarget(hash));
      history.replaceState(null, "", hash);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 1, ease, delay: 0.5 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="container-x pt-3 md:pt-4">
          <nav
            aria-label="Primary"
            className={`relative flex h-14 items-center justify-between rounded-full pl-4 pr-2 transition-all duration-700 ease-[var(--ease-out-expo)] md:pl-5 ${
              scrolled
                ? "border border-line-2 bg-ink/70 shadow-[0_20px_60px_-30px_rgb(0_0_0/0.9)] backdrop-blur-xl"
                : "border border-transparent bg-transparent"
            }`}
          >
            <Link
              href="/"
              aria-label={`${site.name} — home`}
              className="flex items-center gap-3 text-fg"
              onClick={(e) => {
                setOpen(false);
                if (pathname === "/") {
                  e.preventDefault();
                  if (window.__lenis) window.__lenis.scrollTo(0);
                  else window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <Monogram className="h-6 w-auto" />
              <span className="hidden text-sm font-medium tracking-[-0.01em] sm:inline">
                {site.name}
              </span>
            </Link>

            <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
              {navLinks.map((l) => {
                const id = l.href.split("#")[1];
                const isActive = active === id;
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={(e) => onAnchor(e, l.href)}
                      className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                        isActive ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Magnetic className="hidden md:inline-flex">
                <Link
                  href="/#contact"
                  onClick={(e) => onAnchor(e, "/#contact")}
                  data-cursor="cta"
                  className="group inline-flex h-10 items-center gap-2 rounded-full bg-fg px-4.5 text-sm font-medium text-ink transition-colors hover:bg-white"
                >
                  Let&apos;s Talk
                  <ArrowRight className="size-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>

              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative z-[60] grid size-11 place-items-center rounded-full border border-line-2 bg-white/[0.03] md:hidden"
              >
                <span className="relative block h-3 w-5">
                  <span
                    className={`absolute left-0 h-px w-5 bg-fg transition-all duration-500 ease-[var(--ease-out-expo)] ${
                      open ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 h-px bg-fg transition-all duration-500 ease-[var(--ease-out-expo)] ${
                      open ? "top-1.5 w-5 -rotate-45" : "top-3 w-3.5"
                    }`}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[45] flex flex-col bg-ink/95 backdrop-blur-2xl md:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 2.75rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 2.75rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 2.75rem)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -left-1/3 top-1/4 h-[70vw] w-[70vw] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgb(62 230 160 / 0.14), transparent 65%)" }}
            />
            <div className="container-x flex flex-1 flex-col justify-between pb-10 pt-28">
              <ul className="space-y-1">
                {[...navLinks, { label: "Contact", href: "/#contact" }].map((l, i) => (
                  <li key={l.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.8, ease, delay: 0.2 + i * 0.06 }}
                    >
                      <Link
                        href={l.href}
                        onClick={(e) => onAnchor(e, l.href)}
                        className="group flex items-baseline gap-4 py-2"
                      >
                        <span className="font-mono text-xs text-emerald">0{i + 1}</span>
                        <span className="text-[2.75rem] font-medium leading-none tracking-[-0.04em] transition-colors group-hover:text-emerald-soft">
                          {i % 2 === 1 ? <span className="serif-em">{l.label}</span> : l.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.55 }}
                className="space-y-6"
              >
                <div className="hairline" />
                <a href={`mailto:${site.email}`} className="block text-lg text-fg">
                  {site.email}
                </a>
                <div className="flex gap-3">
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
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
