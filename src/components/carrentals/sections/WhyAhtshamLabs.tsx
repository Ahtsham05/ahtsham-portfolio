import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { principles, techGroups } from "@/content/carrentals/content";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function WhyAhtshamLabs() {
  return (
    <section id="why-labs" aria-labelledby="why-labs-title" className="section-y relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[60vh] w-[100vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgb(143_107_255/0.07),transparent_62%)]" />
      </div>

      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="14">Why Ahtsham Labs</SectionLabel>
            <RevealLines
              id="why-labs-title"
              className="h-section mt-8"
              lines={[
                "Not just another",
                <span key="l1">
                  <span className="serif-em text-silver">website</span> developer.
                </span>,
              ]}
            />
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="text-xl leading-relaxed text-fg/90">
                I don’t build websites just to fill pages. I build digital systems designed around how your customers
                actually book cars.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Ahtsham Labs is my studio — I’m a full-stack developer building SaaS products, high-performance websites
                and AI automations.{" "}
                <Link href="/" className="inline-flex items-center gap-1 text-fg underline decoration-line-2 underline-offset-4 transition-colors hover:decoration-emerald">
                  See my wider work <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.06} className="group relative bg-ink p-7 transition-colors duration-500 hover:bg-ink-2 md:p-8">
              <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-emerald to-violet transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
              <p className="font-mono text-sm text-emerald">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-10 text-2xl font-medium tracking-[-0.03em]">{p.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
            </Reveal>
          ))}
        </ol>

        {/* Technology — quiet credibility, not a spec sheet */}
        <Reveal delay={0.1}>
          <div id="tech" className="mt-10 flex flex-col gap-6 rounded-3xl border border-line px-6 py-6 md:px-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-[15rem] text-sm text-muted">Built on a modern, proven stack.</p>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4 lg:flex lg:gap-12">
              {techGroups.map((g) => (
                <div key={g.title}>
                  <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-dim">{g.title}</dt>
                  <dd className="mt-2.5 flex flex-wrap gap-x-3 gap-y-2">
                    {g.items.map(([icon, label]) => (
                      <span key={label} className="flex items-center gap-1.5 text-sm text-fg/75">
                        <BrandIcon name={icon} className="size-3.5 text-muted" />
                        {label}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
