/**
 * Small diagrams for the four pain points. Monochrome with a muted warning
 * accent — they should read as "friction", not as alarm.
 */

const LINE = "rgb(236 238 233 / 0.14)";
const DIM = "rgb(236 238 233 / 0.07)";
const WARN = "#ff9b8a";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 280 160" className="h-full w-full" aria-hidden>
      {children}
    </svg>
  );
}

/** 01 — identical tiles, no information, a lost cursor. */
function Browse() {
  return (
    <Frame>
      {[0, 1, 2].flatMap((c) =>
        [0, 1].map((r) => (
          <g key={`${c}${r}`} transform={`translate(${30 + c * 76} ${22 + r * 62})`}>
            <rect width="66" height="52" rx="6" fill={DIM} stroke={LINE} />
            <rect x="8" y="10" width="50" height="18" rx="3" fill="rgb(236 238 233 / 0.05)" />
            <rect x="8" y="34" width="30" height="4" rx="2" fill={LINE} />
            <rect x="8" y="42" width="18" height="3" rx="1.5" fill={DIM} />
          </g>
        )),
      )}
      <g className="svc-float">
        <circle cx="204" cy="70" r="20" fill="rgb(7 8 7 / 0.7)" stroke="rgb(236 238 233 / 0.5)" strokeWidth="1.5" />
        <path d="M218 84 L232 98" stroke="rgb(236 238 233 / 0.5)" strokeWidth="3" strokeLinecap="round" />
        <text x="204" y="76" textAnchor="middle" fontSize="18" fill={WARN} fontFamily="var(--font-serif)">?</text>
      </g>
    </Frame>
  );
}

/** 02 — desktop layout squeezed into a phone, content cut off. */
function Mobile() {
  return (
    <Frame>
      <rect x="100" y="8" width="80" height="146" rx="14" fill="rgb(7 8 7 / 0.8)" stroke="rgb(236 238 233 / 0.3)" strokeWidth="1.5" />
      <rect x="128" y="14" width="24" height="4" rx="2" fill={LINE} />
      <clipPath id="pv-phone">
        <rect x="106" y="24" width="68" height="124" rx="6" />
      </clipPath>
      <g clipPath="url(#pv-phone)">
        <rect x="106" y="24" width="140" height="10" fill={DIM} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={110 + i * 46} y="40" width="40" height="34" rx="3" fill={DIM} stroke={LINE} />
        ))}
        <rect x="110" y="82" width="120" height="5" rx="2" fill={LINE} />
        <rect x="110" y="92" width="100" height="5" rx="2" fill={DIM} />
        <rect x="110" y="102" width="130" height="5" rx="2" fill={DIM} />
        <rect x="110" y="120" width="22" height="9" rx="2" fill="rgb(236 238 233 / 0.25)" />
      </g>
      <path d="M174 60 L196 60" stroke={WARN} strokeOpacity="0.7" strokeDasharray="3 3" />
      <path d="M192 56 L197 60 L192 64" fill="none" stroke={WARN} strokeOpacity="0.7" />
      <g transform="translate(48 104)" opacity="0.6">
        <circle r="10" fill="none" stroke="rgb(236 238 233 / 0.4)" />
        <path d="M-4 -4 L4 4 M4 -4 L-4 4" stroke={WARN} strokeWidth="1.5" />
      </g>
      <text x="48" y="132" textAnchor="middle" fontSize="8" fill="rgb(236 238 233 / 0.4)" fontFamily="var(--font-mono)" letterSpacing="1">
        9PX TAPS
      </text>
    </Frame>
  );
}

/** 03 — a long form stuck at the first step. */
function Booking() {
  return (
    <Frame>
      <rect x="50" y="10" width="180" height="140" rx="10" fill="rgb(7 8 7 / 0.6)" stroke={LINE} />
      <rect x="62" y="22" width="156" height="3" rx="1.5" fill={DIM} />
      <rect x="62" y="22" width="26" height="3" rx="1.5" fill={WARN} fillOpacity="0.8" />
      <text x="218" y="38" textAnchor="end" fontSize="7" fill="rgb(236 238 233 / 0.4)" fontFamily="var(--font-mono)">
        STEP 1 OF 6
      </text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i} transform={`translate(62 ${46 + i * 15})`}>
          <rect width={i % 2 ? 72 : 156} height="10" rx="2" fill={DIM} stroke={LINE} strokeWidth="0.6" />
          {i % 2 === 1 && <rect x="84" width="72" height="10" rx="2" fill={DIM} stroke={LINE} strokeWidth="0.6" />}
        </g>
      ))}
      <g transform="translate(140 80)" className="svc-float">
        <circle r="17" fill="rgb(7 8 7 / 0.9)" stroke="rgb(236 238 233 / 0.25)" />
        <path d="M-6 -8 H6 M-6 8 H6 M-5 -8 C-5 -2 5 2 5 8 M5 -8 C5 -2 -5 2 -5 8" fill="none" stroke="rgb(236 238 233 / 0.65)" strokeWidth="1.3" strokeLinecap="round" />
      </g>
    </Frame>
  );
}

/** 04 — unread inquiries piling up overnight. */
function FollowUp() {
  return (
    <Frame>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(40 ${18 + i * 32})`} opacity={1 - i * 0.18}>
          <rect width="200" height="24" rx="6" fill={DIM} stroke={LINE} />
          <circle cx="13" cy="12" r="3" fill={WARN} fillOpacity="0.85" />
          <rect x="24" y="7" width={70 - i * 6} height="4" rx="2" fill="rgb(236 238 233 / 0.3)" />
          <rect x="24" y="14" width={110 - i * 10} height="3" rx="1.5" fill={LINE} />
          <text x="190" y="15" textAnchor="end" fontSize="7.5" fill="rgb(236 238 233 / 0.45)" fontFamily="var(--font-mono)">
            {["14h", "18h", "1d", "2d"][i]}
          </text>
        </g>
      ))}
    </Frame>
  );
}

export const problemVisuals = [Browse, Mobile, Booking, FollowUp];
