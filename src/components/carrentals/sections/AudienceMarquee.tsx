import { audiences } from "@/content/carrentals/content";

/** "Built for" strip directly under the hero — instant niche recognition. */
export function AudienceMarquee() {
  const row = [...audiences, ...audiences];
  return (
    <section aria-label="Who this is for" className="relative border-y border-line bg-ink-2/60 py-5">
      <div className="flex items-center">
        <p className="eyebrow relative z-10 hidden shrink-0 border-r border-line bg-ink-2 pl-[var(--gutter)] pr-6 text-emerald md:block">
          Built for
        </p>
        <div className="mask-fade-x min-w-0 flex-1 overflow-hidden">
          <ul className="flex w-max animate-marquee items-center [--marquee-duration:42s] hover:[animation-play-state:paused]">
            {row.map((a, i) => (
              <li key={i} aria-hidden={i >= audiences.length || undefined} className="flex items-center gap-8 pr-8">
                <span className="whitespace-nowrap text-lg tracking-[-0.02em] text-fg/85 md:text-xl">{a}</span>
                <span aria-hidden className="size-1.5 rotate-45 bg-emerald/60" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
