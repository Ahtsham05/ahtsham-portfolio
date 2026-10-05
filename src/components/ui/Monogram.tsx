/**
 * "AY" ligature — an open A whose right leg becomes the stem of the Y.
 * Stroke-based so it can be drawn on during the intro.
 */
export function Monogram({
  className = "h-7 w-auto",
  draw = false,
}: {
  className?: string;
  draw?: boolean;
}) {
  const stroke = draw ? { pathLength: 1, className: "monogram-path" } : {};
  return (
    <svg viewBox="0 0 36 30" fill="none" className={className} aria-hidden>
      <path
        d="M3 27 L13 3 L23 27"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...stroke}
      />
      <path
        d="M17 3 L23 14 L33 3 M23 14 V27"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...stroke}
      />
      <circle cx="8.6" cy="19.5" r="1.7" fill="var(--color-emerald)" />
    </svg>
  );
}
