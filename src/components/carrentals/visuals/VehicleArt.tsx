import { useId } from "react";
import { GROUND_Y, SHAPES, VIEWBOX, type VehicleShape } from "./shapes";

type Tone = "metal" | "silver" | "outline";

type Props = {
  shape: VehicleShape;
  tone?: Tone;
  className?: string;
  /** Headlight beam + glow. Intensity can be driven with the CSS var `--beam` (0–1). */
  lights?: boolean;
  /** Mirrored floor reflection. */
  reflection?: boolean;
  /** Spin the wheel spokes (used while the car is "driving"). */
  spinning?: boolean;
  /** Moving specular band — position driven by the CSS var `--sheen` (px, around ±400). */
  sheen?: boolean;
  /** Draw-on animation for the outline tone (adds `pathLength` + a class hook). */
  draw?: boolean;
  title?: string;
};

/** Fixed precision so server and browser render identical geometry (no hydration drift). */
const round = (n: number) => Math.round(n * 100) / 100;

const BODY_STOPS: Record<Exclude<Tone, "outline">, [number, string][]> = {
  metal: [
    [0, "#565e64"],
    [0.18, "#2a2f33"],
    [0.5, "#121517"],
    [1, "#050606"],
  ],
  silver: [
    [0, "#d9dde0"],
    [0.3, "#8d9398"],
    [0.55, "#3c4145"],
    [1, "#0c0e0f"],
  ],
};

function Wheel({
  cx,
  cy,
  r,
  uid,
  spinning,
  outline,
  draw,
}: {
  cx: number;
  cy: number;
  r: number;
  uid: string;
  spinning?: boolean;
  outline?: boolean;
  draw?: boolean;
}) {
  const spokes = [0, 1, 2, 3, 4].flatMap((i) => {
    const base = (i / 5) * Math.PI * 2 - Math.PI / 2;
    return [-0.11, 0.11].map((o) => {
      const a = base + o;
      return {
        x1: round(cx + Math.cos(a) * r * 0.2),
        y1: round(cy + Math.sin(a) * r * 0.2),
        x2: round(cx + Math.cos(base + o * 1.9) * r * 0.69),
        y2: round(cy + Math.sin(base + o * 1.9) * r * 0.69),
      };
    });
  });
  const drawProps = draw ? { pathLength: 1, className: "cr-draw" } : {};

  if (outline) {
    return (
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx={cx} cy={cy} r={r} {...drawProps} />
        <circle cx={cx} cy={cy} r={r * 0.72} opacity="0.6" {...drawProps} />
        <g className={spinning ? "cr-wheel-spin" : undefined} style={{ transformOrigin: `${cx}px ${cy}px` }} opacity="0.45">
          {spokes.map((s, i) => (
            <line key={i} {...s} />
          ))}
        </g>
        <circle cx={cx} cy={cy} r={r * 0.14} opacity="0.7" />
      </g>
    );
  }

  return (
    <g>
      {/* tyre */}
      <circle cx={cx} cy={cy} r={r} fill="#060707" />
      <circle cx={cx} cy={cy} r={r - 1} fill="none" stroke="rgb(255 255 255 / 0.07)" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r * 0.86} fill="none" stroke="rgb(255 255 255 / 0.04)" />
      {/* rim barrel + brake */}
      <circle cx={cx} cy={cy} r={r * 0.74} fill={`url(#${uid}-rim)`} />
      <circle cx={cx} cy={cy} r={r * 0.56} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth={r * 0.1} />
      <path
        d={`M ${round(cx + Math.cos(-2.6) * r * 0.5)} ${round(cy + Math.sin(-2.6) * r * 0.5)} A ${r * 0.5} ${r * 0.5} 0 0 1 ${round(cx + Math.cos(-1.6) * r * 0.5)} ${round(cy + Math.sin(-1.6) * r * 0.5)}`}
        fill="none"
        stroke="var(--color-emerald)"
        strokeOpacity="0.75"
        strokeWidth={r * 0.13}
        strokeLinecap="round"
      />
      <g className={spinning ? "cr-wheel-spin" : "cr-spokes"} style={{ transformOrigin: `${cx}px ${cy}px` }}>
        {spokes.map((s, i) => (
          <line key={i} {...s} stroke={`url(#${uid}-spoke)`} strokeWidth={r * 0.075} strokeLinecap="round" />
        ))}
      </g>
      <circle cx={cx} cy={cy} r={r * 0.74} fill="none" stroke="rgb(236 238 233 / 0.35)" strokeWidth="1.2" />
      <circle cx={cx} cy={cy} r={r * 0.17} fill="#15181a" stroke="rgb(236 238 233 / 0.45)" strokeWidth="1.2" />
      <circle cx={cx} cy={cy} r={r * 0.05} fill="rgb(236 238 233 / 0.6)" />
    </g>
  );
}

/**
 * Premium studio-lit vehicle illustration. Pure SVG — no image download,
 * crisp at any size. Swap for a real photo via the fleet data's `image`.
 */
export function VehicleArt({
  shape,
  tone = "metal",
  className,
  lights = false,
  reflection = false,
  spinning = false,
  sheen = false,
  draw = false,
  title,
}: Props) {
  const s = SHAPES[shape];
  const uid = `v${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const { rear, front, cy, r } = s.wheels;
  const a11y = title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };

  if (tone === "outline") {
    const drawProps = draw ? { pathLength: 1, className: "cr-draw" } : {};
    return (
      <svg viewBox={VIEWBOX} className={className} fill="none" overflow="visible" {...a11y}>
        <path d={s.body} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" {...drawProps} />
        <path d={s.glass} stroke="currentColor" strokeWidth="1.2" opacity="0.55" {...drawProps} />
        <path d={s.details} stroke="currentColor" strokeWidth="1" opacity="0.3" {...drawProps} />
        <Wheel cx={rear} cy={cy} r={r} uid={uid} outline spinning={spinning} draw={draw} />
        <Wheel cx={front} cy={cy} r={r} uid={uid} outline spinning={spinning} draw={draw} />
        <path d={s.headlight} fill="var(--color-emerald-soft)" opacity={draw || lights ? 1 : 0.35} className={draw ? "cr-light-on" : undefined} />
        {lights && (
          <path
            d={`M ${s.beam[0]} ${s.beam[1]} L 1520 ${s.beam[1] - 70} L 1520 ${s.beam[1] + 110} Z`}
            fill={`url(#${uid}-beam)`}
            className={draw ? "cr-light-on" : undefined}
          />
        )}
        <defs>
          <linearGradient id={`${uid}-beam`} x1={s.beam[0]} x2="1520" y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#c8ffe6" stopOpacity="0.4" />
            <stop offset="1" stopColor="#c8ffe6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  const stops = BODY_STOPS[tone];

  const car = (withLights: boolean) => (
    <>
      <path d={s.body} fill={`url(#${uid}-body)`} />
      <path d={s.body} fill={`url(#${uid}-env)`} />
      {sheen && (
        <g clipPath={`url(#${uid}-clip)`}>
          <rect
            x="-200"
            y="40"
            width="520"
            height="320"
            fill={`url(#${uid}-sheen)`}
            className="cr-sheen"
          />
        </g>
      )}
      <path d={s.glass} fill={`url(#${uid}-glass)`} stroke="rgb(236 238 233 / 0.14)" strokeWidth="1" />
      <path d={s.glass} fill={`url(#${uid}-glassHi)`} />
      {s.pillars && <path d={s.pillars} stroke="#0a0c0d" strokeWidth="5" strokeLinecap="round" />}
      <path d={s.details} fill="none" stroke="rgb(236 238 233 / 0.13)" strokeWidth="1.3" />
      <path d={s.body} fill="none" stroke={`url(#${uid}-rimlight)`} strokeWidth="2" strokeLinejoin="round" />
      <path d={s.taillight} fill="#ff6b78" opacity="0.7" />
      <path d={s.headlight} fill={withLights ? "#eafff6" : "rgb(236 238 233 / 0.6)"} />
      <Wheel cx={rear} cy={cy} r={r} uid={uid} spinning={spinning} />
      <Wheel cx={front} cy={cy} r={r} uid={uid} spinning={spinning} />
    </>
  );

  return (
    <svg viewBox={VIEWBOX} className={className} overflow="visible" {...a11y}>
      {title && <title>{title}</title>}
      <defs>
        <linearGradient id={`${uid}-body`} x1="0" y1="60" x2="0" y2="330" gradientUnits="userSpaceOnUse">
          {stops.map(([o, c]) => (
            <stop key={o} offset={o} stopColor={c} />
          ))}
        </linearGradient>
        {/* horizontal environment reflections — reads as metal */}
        <linearGradient id={`${uid}-env`} x1="0" x2="1200" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.18" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.62" stopColor="#8ff2c6" stopOpacity="0.05" />
          <stop offset="0.74" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.92" stopColor="#b9a5ff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-sheen`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#f4fff9" stopOpacity="0.22" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-glass`} x1="0" y1="80" x2="0" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1d2427" />
          <stop offset="1" stopColor="#07090a" />
        </linearGradient>
        <linearGradient id={`${uid}-glassHi`} x1="300" y1="80" x2="760" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.09" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.72" stopColor="#8ff2c6" stopOpacity="0.06" />
          <stop offset="0.8" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-rimlight`} x1="0" y1="60" x2="0" y2="320" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f6f8f4" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#8ff2c6" stopOpacity="0.35" />
          <stop offset="0.7" stopColor="#b9a5ff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#b9a5ff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${uid}-rim`} cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#2a2f33" />
          <stop offset="1" stopColor="#0b0d0e" />
        </radialGradient>
        <linearGradient id={`${uid}-spoke`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9ecef" />
          <stop offset="0.5" stopColor="#8e959b" />
          <stop offset="1" stopColor="#d4d8dc" />
        </linearGradient>
        <radialGradient id={`${uid}-shadow`}>
          <stop offset="0" stopColor="#000" stopOpacity="0.85" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-glow`}>
          <stop offset="0" stopColor="#eafff6" stopOpacity="0.9" />
          <stop offset="0.3" stopColor="#8ff2c6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#3ee6a0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-beam`} x1={s.beam[0]} x2="1560" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#d9fff0" stopOpacity="0.32" />
          <stop offset="0.5" stopColor="#8ff2c6" stopOpacity="0.08" />
          <stop offset="1" stopColor="#8ff2c6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-fade`} x1="0" y1={GROUND_Y} x2="0" y2={GROUND_Y + 90} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${uid}-reflect`} maskUnits="userSpaceOnUse" x="0" y={GROUND_Y} width="1200" height="120">
          <rect x="0" y={GROUND_Y} width="1200" height="120" fill={`url(#${uid}-fade)`} />
        </mask>
        <clipPath id={`${uid}-clip`}>
          <path d={s.body} />
        </clipPath>
      </defs>

      {/* floor shadow */}
      <ellipse cx="610" cy={GROUND_Y + 2} rx="560" ry="20" fill={`url(#${uid}-shadow)`} />
      <ellipse cx={rear} cy={GROUND_Y} rx={r * 1.15} ry="7" fill={`url(#${uid}-shadow)`} />
      <ellipse cx={front} cy={GROUND_Y} rx={r * 1.15} ry="7" fill={`url(#${uid}-shadow)`} />

      {reflection && (
        <g mask={`url(#${uid}-reflect)`} opacity="0.35">
          <g transform={`translate(0 ${GROUND_Y * 2}) scale(1 -1)`}>{car(false)}</g>
        </g>
      )}

      {lights && (
        <g className="cr-beam" style={{ transformOrigin: `${s.beam[0]}px ${s.beam[1]}px` }}>
          <path d={`M ${s.beam[0]} ${s.beam[1] - 4} L 1560 ${s.beam[1] - 90} L 1560 ${s.beam[1] + 120} Z`} fill={`url(#${uid}-beam)`} />
        </g>
      )}

      {car(lights)}

      {lights && (
        <circle cx={s.beam[0] - 8} cy={s.beam[1]} r="46" fill={`url(#${uid}-glow)`} className="cr-glow" />
      )}
    </svg>
  );
}
