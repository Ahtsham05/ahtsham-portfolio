import type { MotionValue } from "motion/react";
import { motion } from "motion/react";

const C = 300;
const r2 = (n: number) => Math.round(n * 100) / 100;
const polar = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [r2(C + Math.cos(a) * r), r2(C + Math.sin(a) * r)] as const;
};

/** Twin-spoke shape pointing to `deg` (0 = 12 o'clock). */
function spokePath(deg: number) {
  const pts = [polar(64, deg - 13), polar(228, deg - 8.5), polar(228, deg - 1.6), polar(96, deg - 1.2), polar(96, deg + 1.2), polar(228, deg + 1.6), polar(228, deg + 8.5), polar(64, deg + 13)];
  return `M ${pts.map((p) => p.join(" ")).join(" L ")} Z`;
}

const HOLES = Array.from({ length: 30 }, (_, i) => polar(158, i * 12 + 6));
const SIDEWALL = "AHTSHAM LABS · CAR RENTAL DIGITAL EXPERIENCES · BUILT FOR THE ROAD · ";

/**
 * Six-spoke alloy wheel. The spoke group turns with `rotate`; spoke `active`
 * is lit. Brake caliper and centre label stay put, like a real wheel.
 */
export function Rim({
  rotate,
  active,
  center,
}: {
  rotate: MotionValue<number>;
  active: number;
  center: React.ReactNode;
}) {
  return (
    <div className="relative">
      <svg viewBox="0 0 600 600" className="h-full w-full overflow-visible" aria-hidden>
        <defs>
          <radialGradient id="rim-barrel" cx="45%" cy="40%" r="65%">
            <stop offset="0" stopColor="#1b1f22" />
            <stop offset="1" stopColor="#070808" />
          </radialGradient>
          <linearGradient id="rim-lip" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f4f6f7" />
            <stop offset="0.35" stopColor="#7d848a" />
            <stop offset="0.6" stopColor="#d6dade" />
            <stop offset="1" stopColor="#3a3f43" />
          </linearGradient>
          <linearGradient id="rim-spoke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e8ebee" />
            <stop offset="0.45" stopColor="#8a9197" />
            <stop offset="1" stopColor="#c7ccd1" />
          </linearGradient>
          <linearGradient id="rim-spoke-on" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c8ffe6" />
            <stop offset="0.5" stopColor="#3ee6a0" />
            <stop offset="1" stopColor="#8ff2c6" />
          </linearGradient>
          <path id="rim-sidewall" d={`M ${C} ${C - 271} a 271 271 0 1 1 -0.01 0`} />
        </defs>

        {/* tyre */}
        <circle cx={C} cy={C} r="271" fill="none" stroke="#0a0b0b" strokeWidth="54" />
        <circle cx={C} cy={C} r="297" fill="none" stroke="rgb(236 238 233 / 0.08)" />
        <circle cx={C} cy={C} r="245" fill="none" stroke="rgb(236 238 233 / 0.06)" />
        <text fontSize="11" letterSpacing="4.2" className="font-mono" fill="rgb(236 238 233 / 0.22)">
          <textPath href="#rim-sidewall">{SIDEWALL.repeat(2)}</textPath>
        </text>

        {/* barrel + lip */}
        <circle cx={C} cy={C} r="240" fill="url(#rim-barrel)" />
        <circle cx={C} cy={C} r="238" fill="none" stroke="url(#rim-lip)" strokeWidth="6" />

        {/* brake disc (static) */}
        <circle cx={C} cy={C} r="160" fill="none" stroke="rgb(236 238 233 / 0.07)" strokeWidth="44" />
        {HOLES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.6" fill="#050606" />
        ))}
        <path d={`M ${polar(186, 52).join(" ")} A 186 186 0 0 1 ${polar(186, 102).join(" ")}`} fill="none" stroke="#3ee6a0" strokeOpacity="0.85" strokeWidth="26" strokeLinecap="round" />
        <text x={polar(186, 77)[0]} y={polar(186, 77)[1] + 3} textAnchor="middle" fontSize="8" letterSpacing="2" className="font-mono" fill="#04130c" transform={`rotate(-13 ${polar(186, 77).join(" ")})`}>
          AL
        </text>

        {/* spokes (rotate) */}
        {/* the group is symmetric, so its own box centre is the hub — motion's default SVG origin */}
        <motion.g style={{ rotate }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={spokePath(i * 60)}
              fill={i === active ? "url(#rim-spoke-on)" : "url(#rim-spoke)"}
              stroke="rgb(0 0 0 / 0.5)"
              strokeWidth="1"
              className="transition-[fill] duration-500"
              style={i === active ? { filter: "drop-shadow(0 0 14px rgb(62 230 160 / 0.6))" } : undefined}
            />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const [x, y] = polar(46, i * 60 + 30);
            return <circle key={`n${i}`} cx={x} cy={y} r="4.5" fill="#0b0d0e" stroke="rgb(236 238 233 / 0.4)" />;
          })}
        </motion.g>

        {/* hub (static centre cap) */}
        <circle cx={C} cy={C} r="62" fill="#0f1213" stroke="url(#rim-lip)" strokeWidth="3" />
        <circle cx={C} cy={C} r="54" fill="none" stroke="rgb(236 238 233 / 0.08)" />

        {/* top marker */}
        <path d={`M ${C - 9} 6 L ${C + 9} 6 L ${C} 20 Z`} fill="#3ee6a0" />
      </svg>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">{center}</div>
    </div>
  );
}
