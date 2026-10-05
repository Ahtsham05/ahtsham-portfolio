import Link from "next/link";
import { site } from "@/content/site";
import { BrandIcon } from "../ui/BrandIcon";
import { Monogram } from "../ui/Monogram";

const links = [
  { label: "Projects", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

const socials = [
  { label: "LinkedIn", href: site.socials.linkedin, icon: "linkedin" },
  { label: "GitHub", href: site.socials.github, icon: "github" },
  { label: "Upwork", href: site.socials.upwork, icon: "upwork" },
  { label: "Email", href: `mailto:${site.email}`, icon: "email" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-20">
      {/* animated hairline */}
      <div aria-hidden className="relative h-px w-full overflow-hidden bg-line">
        <div className="footer-sweep absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-emerald to-transparent" />
      </div>

      <div className="container-x">
        <div className="grid items-center gap-10 py-14 md:grid-cols-3">
          <Link href="/" aria-label={`${site.name} — home`} className="flex items-center gap-3 text-fg">
            <Monogram className="h-7 w-auto" />
            <span className="text-sm text-muted">Full-stack · SaaS · AI automation</span>
          </Link>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 md:justify-center">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-2 md:justify-end">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-line-2 text-muted transition-all duration-500 hover:border-emerald/50 hover:text-fg"
                >
                  <BrandIcon name={s.icon} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* oversized signature */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="serif-em -mb-[0.2em] whitespace-nowrap bg-gradient-to-b from-fg/[0.09] to-transparent bg-clip-text text-center text-[14.5vw] leading-[1.05] text-transparent [-webkit-text-stroke:1px_rgb(236_238_233/0.08)]">
          Ahtsham Younas
        </p>
      </div>

      <div className="relative border-t border-line bg-ink">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p>
            Built with code, curiosity <span className="serif-em text-sm text-muted">&amp;</span> caffeine.
          </p>
        </div>
      </div>
      <style>{`.footer-sweep{animation:sweep 6s cubic-bezier(.65,0,.35,1) infinite}@keyframes sweep{from{left:-35%}to{left:100%}}`}</style>
    </footer>
  );
}
