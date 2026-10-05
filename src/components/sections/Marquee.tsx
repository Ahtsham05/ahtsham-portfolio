import { marqueeItems } from "@/content/content";
import { BrandIcon } from "../ui/BrandIcon";

function Row({ reverse = false, dim = false }: { reverse?: boolean; dim?: boolean }) {
  const items = reverse ? [...marqueeItems].reverse() : marqueeItems;
  return (
    <div className={`mask-fade-x flex overflow-hidden ${dim ? "opacity-40 blur-[0.6px]" : ""}`}>
      <ul
        className={`flex w-max shrink-0 items-center group-hover/marquee:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ ["--marquee-duration" as string]: dim ? "70s" : "52s" }}
      >
        {[...items, ...items].map((it, i) => (
          <li
            key={`${it.name}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-3 px-7 md:px-10"
          >
            <BrandIcon name={it.icon} className="size-[1.1rem] text-fg/55" />
            <span className="whitespace-nowrap text-lg font-medium tracking-[-0.02em] text-fg/60 md:text-xl">
              {it.name}
            </span>
            <span aria-hidden className="ml-7 size-1 rotate-45 bg-emerald/40 md:ml-10" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Two counter-moving rows; the back row is dimmed and softened for depth. */
export function Marquee() {
  return (
    <section aria-label="Technologies I work with" className="group/marquee relative py-10 md:py-14">
      <div className="hairline" />
      <div className="relative space-y-5 py-8 md:space-y-6 md:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgb(62_230_160/0.07),transparent_70%)]"
        />
        <Row />
        <Row reverse dim />
      </div>
      <div className="hairline" />
    </section>
  );
}
