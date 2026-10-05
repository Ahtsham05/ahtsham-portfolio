import type { Service } from "@/content/content";

/* Small, purposeful system diagrams — one per service. Pure SVG + CSS. */

const stroke = "rgb(236 238 233 / 0.16)";
const strokeHi = "rgb(236 238 233 / 0.28)";

function WebVisual() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="wv-g" x1="0" x2="1">
          <stop offset="0" stopColor="#3ee6a0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#8f6bff" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect x="40" y="18" width="240" height="150" rx="10" fill="rgb(255 255 255 / 0.02)" stroke={strokeHi} />
      <line x1="40" y1="38" x2="280" y2="38" stroke={stroke} />
      {[54, 64, 74].map((x) => (
        <circle key={x} cx={x} cy="28" r="3" fill="rgb(236 238 233 / 0.2)" />
      ))}
      <rect x="110" y="23" width="100" height="10" rx="5" fill="rgb(236 238 233 / 0.06)" />
      {/* hero block */}
      <rect x="56" y="52" width="120" height="10" rx="3" fill="rgb(236 238 233 / 0.5)" className="svc-build" style={{ animationDelay: "0s" }} />
      <rect x="56" y="68" width="88" height="10" rx="3" fill="url(#wv-g)" className="svc-build" style={{ animationDelay: ".15s" }} />
      <rect x="56" y="88" width="104" height="5" rx="2.5" fill="rgb(236 238 233 / 0.18)" className="svc-build" style={{ animationDelay: ".3s" }} />
      <rect x="56" y="98" width="80" height="5" rx="2.5" fill="rgb(236 238 233 / 0.18)" className="svc-build" style={{ animationDelay: ".4s" }} />
      <rect x="56" y="114" width="44" height="14" rx="7" fill="#eceee9" className="svc-build" style={{ animationDelay: ".55s" }} />
      {/* media block */}
      <rect x="190" y="52" width="74" height="76" rx="6" fill="rgb(62 230 160 / 0.07)" stroke="rgb(62 230 160 / 0.35)" className="svc-build" style={{ animationDelay: ".25s" }} />
      <circle cx="227" cy="90" r="16" fill="none" stroke="rgb(62 230 160 / 0.5)" strokeDasharray="3 4" className="origin-[227px_90px] animate-spin-slow" />
      {/* cards row */}
      {[56, 128, 200].map((x, i) => (
        <rect key={x} x={x} y="140" width="64" height="16" rx="4" fill="rgb(236 238 233 / 0.04)" stroke={stroke} className="svc-build" style={{ animationDelay: `${0.65 + i * 0.1}s` }} />
      ))}
      {/* cursor */}
      <path d="M0 0 L0 13 L3.5 10 L6 15 L8 14 L5.6 9 L10 9 Z" fill="#eceee9" className="svc-cursor" />
    </svg>
  );
}

function SaasVisual() {
  const tenants = [
    { y: 26, x: 60, label: "Acme", plan: "Pro" },
    { y: 66, x: 80, label: "Northwind", plan: "Team" },
    { y: 106, x: 100, label: "Globex", plan: "Pro" },
  ];
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden>
      {tenants.map((t, i) => (
        <g key={t.label} className="svc-float" style={{ animationDelay: `${i * 0.6}s` }}>
          <rect x={t.x} y={t.y} width="170" height="50" rx="8" fill="#0d100e" stroke={i === 2 ? "rgb(62 230 160 / 0.5)" : strokeHi} />
          <rect x={t.x + 12} y={t.y + 12} width="26" height="26" rx="6" fill={i === 2 ? "rgb(62 230 160 / 0.18)" : "rgb(236 238 233 / 0.06)"} />
          <text x={t.x + 25} y={t.y + 29} textAnchor="middle" fontSize="10" fill="#eceee9" className="font-mono">{t.label[0]}</text>
          <text x={t.x + 48} y={t.y + 22} fontSize="9.5" fill="#eceee9" className="font-sans">{t.label}</text>
          <text x={t.x + 48} y={t.y + 36} fontSize="7.5" fill="#9ba29d" className="font-mono">OWNER · ADMIN · MEMBER</text>
          <rect x={t.x + 134} y={t.y + 17} width="26" height="14" rx="7" fill={t.plan === "Pro" ? "rgb(143 107 255 / 0.22)" : "rgb(236 238 233 / 0.07)"} />
          <text x={t.x + 147} y={t.y + 27} textAnchor="middle" fontSize="7" fill={t.plan === "Pro" ? "#b9a5ff" : "#9ba29d"} className="font-mono">{t.plan.toUpperCase()}</text>
        </g>
      ))}
      <line x1="30" y1="20" x2="30" y2="160" stroke={stroke} strokeDasharray="2 4" />
      {[51, 91, 131].map((y) => (
        <g key={y}>
          <line x1="30" y1={y} x2={y === 51 ? 60 : y === 91 ? 80 : 100} y2={y} stroke="rgb(62 230 160 / 0.35)" className="flow-dash" />
          <circle cx="30" cy={y} r="3" fill="#3ee6a0" />
        </g>
      ))}
    </svg>
  );
}

function AutomationVisual() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="av-g" x1="0" x2="1">
          <stop offset="0" stopColor="#3ee6a0" />
          <stop offset="1" stopColor="#8f6bff" />
        </linearGradient>
      </defs>
      {[
        "M78 90 C 110 90, 110 90, 134 90",
        "M186 90 C 214 90, 214 42, 240 42",
        "M186 90 C 214 90, 214 90, 240 90",
        "M186 90 C 214 90, 214 138, 240 138",
      ].map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke={stroke} strokeWidth="1.2" />
          <path d={d} fill="none" stroke="url(#av-g)" strokeWidth="1.2" className="flow-dash" style={{ animationDelay: `${i * 0.2}s` }} />
        </g>
      ))}
      <rect x="26" y="72" width="52" height="36" rx="8" fill="#0d100e" stroke={strokeHi} />
      <text x="52" y="94" textAnchor="middle" fontSize="8" fill="#9ba29d" className="font-mono">TRIGGER</text>
      <rect x="134" y="64" width="52" height="52" rx="14" fill="rgb(62 230 160 / 0.1)" stroke="rgb(62 230 160 / 0.6)" />
      <circle cx="160" cy="90" r="26" fill="none" stroke="rgb(62 230 160 / 0.25)" className="animate-pulse-soft origin-[160px_90px]" />
      <text x="160" y="95" textAnchor="middle" fontSize="15" fill="#eceee9" className="font-serif italic">AI</text>
      {[
        { y: 42, l: "CRM" },
        { y: 90, l: "WHATSAPP" },
        { y: 138, l: "EMAIL" },
      ].map((n) => (
        <g key={n.l}>
          <rect x="240" y={n.y - 14} width="62" height="28" rx="7" fill="#0d100e" stroke={strokeHi} />
          <text x="271" y={n.y + 3} textAnchor="middle" fontSize="7.5" fill="#9ba29d" className="font-mono">{n.l}</text>
        </g>
      ))}
    </svg>
  );
}

function AiVisual() {
  const bars = Array.from({ length: 28 });
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden>
      <rect x="40" y="24" width="150" height="30" rx="12" fill="rgb(236 238 233 / 0.05)" stroke={stroke} />
      <rect x="52" y="35" width="96" height="4" rx="2" fill="rgb(236 238 233 / 0.3)" />
      <rect x="52" y="43" width="60" height="4" rx="2" fill="rgb(236 238 233 / 0.18)" />
      <rect x="120" y="66" width="160" height="42" rx="12" fill="rgb(143 107 255 / 0.1)" stroke="rgb(143 107 255 / 0.45)" />
      <path d="M134 80 l3 -6 l3 6 l6 3 l-6 3 l-3 6 l-3 -6 l-6 -3 z" fill="#b9a5ff" className="animate-pulse-soft origin-[137px_83px]" />
      <rect x="154" y="78" width="110" height="4" rx="2" fill="rgb(236 238 233 / 0.4)" />
      <rect x="154" y="86" width="86" height="4" rx="2" fill="rgb(236 238 233 / 0.22)" />
      <rect x="154" y="94" width="64" height="4" rx="2" fill="rgb(236 238 233 / 0.22)" />
      <g transform="translate(40 128)">
        {bars.map((_, i) => (
          <rect
            key={i}
            x={i * 8.6}
            y={-10}
            width="3"
            height="20"
            rx="1.5"
            fill={i % 3 === 0 ? "#8f6bff" : "#3ee6a0"}
            opacity="0.7"
            className="svc-wave"
            style={{ animationDelay: `${(i % 7) * 0.12}s`, transformOrigin: `${i * 8.6 + 1.5}px 0px` }}
          />
        ))}
      </g>
    </svg>
  );
}

export function ServiceVisual({ kind }: { kind: Service["visual"] }) {
  return (
    <>
      {kind === "web" && <WebVisual />}
      {kind === "saas" && <SaasVisual />}
      {kind === "automation" && <AutomationVisual />}
      {kind === "ai" && <AiVisual />}
    </>
  );
}
