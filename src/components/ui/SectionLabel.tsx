import { Reveal } from "./Reveal";

/** "02 ── ABOUT" style section marker. */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal y={12} className={className}>
      <p className="eyebrow flex items-center gap-3">
        <span className="text-emerald">{index}</span>
        <span aria-hidden className="h-px w-8 bg-gradient-to-r from-emerald/70 to-transparent" />
        <span>{children}</span>
      </p>
    </Reveal>
  );
}
