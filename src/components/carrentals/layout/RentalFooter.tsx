import Link from "next/link";
import { site } from "@/content/site";
import { cr } from "@/content/carrentals/content";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Monogram } from "@/components/ui/Monogram";
import { VehicleArt } from "../visuals/VehicleArt";
import { HashLink } from "../ui/Anchor";

const links = [
  { label: "Main Portfolio", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "LinkedIn", href: site.socials.linkedin, icon: "linkedin" },
  { label: "GitHub", href: site.socials.github, icon: "github" },
  { label: "Upwork", href: site.socials.upwork, icon: "upwork" },
];

export function RentalFooter() {
  return (
    <footer className="relative overflow-hidden pt-16">
      <div aria-hidden className="relative h-px w-full overflow-hidden bg-line">
        <div className="cr-footer-sweep absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-emerald to-transparent" />
      </div>

      <div className="container-x">
        <div className="grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_auto] md:items-center">
          <div className="flex items-center gap-4">
            <Monogram className="h-8 w-auto text-fg" />
            <div>
              <p className="text-sm font-medium tracking-[0.22em]">AHTSHAM LABS</p>
              <p className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.24em] text-emerald">{cr.niche}</p>
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 md:justify-center">
              {links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("#") ? (
                    <HashLink href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
                      {l.label}
                    </HashLink>
                  ) : (
                    <Link href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-2 md:justify-end">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
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

      {/* parked silhouette signature */}
      <div aria-hidden className="pointer-events-none container-x select-none">
        <VehicleArt shape="coupe" tone="outline" className="mx-auto -mb-[3%] w-full max-w-5xl text-fg/[0.07]" />
      </div>

      <div className="relative border-t border-line bg-ink">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {cr.brand}. All rights reserved.</p>
          <p>Vehicles, prices and workflows on this page are demos and design concepts.</p>
        </div>
      </div>
      <style>{`.cr-footer-sweep{animation:cr-sweep 6s cubic-bezier(.65,0,.35,1) infinite}@keyframes cr-sweep{from{left:-35%}to{left:100%}}`}</style>
    </footer>
  );
}
