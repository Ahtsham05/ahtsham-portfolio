import type { ReactNode } from "react";
import type { ProjectVisual as Kind } from "@/content/projects";

/*
 * Abstract product compositions — designed stand-ins for real screenshots.
 * Each is layered SVG panels in a CSS 3D space so it scales crisply at any size.
 */

const line = "rgb(236 238 233 / 0.12)";
const lineHi = "rgb(236 238 233 / 0.22)";
const panelFill = "#0c0f0d";

function Panel({
  className,
  style,
  viewBox,
  children,
}: {
  className: string;
  style?: React.CSSProperties;
  viewBox: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] ${className}`}
      style={style}
    >
      <svg viewBox={viewBox} className="h-auto w-full drop-shadow-[0_30px_40px_rgb(0_0_0/0.6)]" aria-hidden>
        {children}
      </svg>
    </div>
  );
}

function Txt({
  x,
  y,
  children,
  size = 11,
  fill = "#eceee9",
  mono = false,
  anchor,
  weight,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  fill?: string;
  mono?: boolean;
  anchor?: "start" | "middle" | "end";
  weight?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={fill}
      textAnchor={anchor}
      fontWeight={weight}
      className={mono ? "font-mono" : "font-sans"}
      letterSpacing={mono ? 0.6 : -0.1}
    >
      {children}
    </text>
  );
}

function Stage({ children, glow }: { children: ReactNode; glow: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: glow }} />
      <div className="bg-grid absolute inset-0 opacity-30 [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
      <div className="absolute inset-0 [perspective:1400px]">
        <div className="absolute inset-0 [transform-style:preserve-3d]">{children}</div>
      </div>
    </div>
  );
}

/* ───────────────────────── 01 Complya ───────────────────────── */
function Complya() {
  const rows = [
    ["Data protection policy", "Approved", "#3ee6a0"],
    ["Quarterly access review", "Approved", "#3ee6a0"],
    ["Vendor risk assessment", "In review", "#e7c36a"],
    ["Incident response plan", "Approved", "#3ee6a0"],
    ["Staff security training", "Due soon", "#9ba29d"],
  ] as const;
  return (
    <Stage glow="radial-gradient(ellipse at 20% 100%, rgb(62 230 160 / 0.22), transparent 55%), radial-gradient(ellipse at 90% 0%, rgb(62 230 160 / 0.08), transparent 50%), #080b09">
      {/* background tenant */}
      <Panel
        viewBox="0 0 360 240"
        className="left-[46%] top-[9%] w-[44%] opacity-50 group-hover:translate-x-2"
        style={{ transform: "rotateY(-16deg) rotateX(6deg) translateZ(-80px)" }}
      >
        <rect x="0.5" y="0.5" width="359" height="239" rx="14" fill={panelFill} stroke={line} />
        <rect x="18" y="18" width="22" height="22" rx="6" fill="rgb(236 238 233 / 0.08)" />
        <Txt x={50} y={33} size={11}>Northwind Labs</Txt>
        <Txt x={300} y={33} size={8} mono fill="#757c77">TENANT 02</Txt>
        {[64, 92, 120, 148, 176].map((y) => (
          <g key={y}>
            <rect x="18" y={y} width="180" height="7" rx="3.5" fill="rgb(236 238 233 / 0.08)" />
            <rect x="290" y={y - 2} width="50" height="11" rx="5.5" fill="rgb(236 238 233 / 0.05)" />
          </g>
        ))}
      </Panel>

      {/* main tenant */}
      <Panel
        viewBox="0 0 460 330"
        className="left-[6%] top-[19%] w-[60%] group-hover:-translate-y-1"
        style={{ transform: "rotateY(-14deg) rotateX(6deg)" }}
      >
        <rect x="0.5" y="0.5" width="459" height="329" rx="16" fill={panelFill} stroke={lineHi} />
        <rect x="20" y="20" width="26" height="26" rx="7" fill="rgb(62 230 160 / 0.16)" stroke="rgb(62 230 160 / 0.5)" />
        <Txt x={33} y={38} anchor="middle" size={11} mono fill="#8ff2c6">A</Txt>
        <Txt x={58} y={31} size={12.5} weight={500}>Acme Health</Txt>
        <Txt x={58} y={44} size={8} mono fill="#757c77">ISOLATED WORKSPACE</Txt>
        <rect x="370" y="22" width="70" height="20" rx="10" fill="rgb(62 230 160 / 0.1)" stroke="rgb(62 230 160 / 0.35)" />
        <Txt x={405} y={35.5} anchor="middle" size={8} mono fill="#8ff2c6">TENANT 01</Txt>
        <line x1="20" y1="62" x2="440" y2="62" stroke={line} />
        <Txt x={20} y={84} size={9} mono fill="#9ba29d">READINESS</Txt>
        <rect x="20" y="92" width="420" height="6" rx="3" fill="rgb(236 238 233 / 0.07)" />
        <rect x="20" y="92" width="300" height="6" rx="3" fill="url(#cp-bar)" />
        <defs>
          <linearGradient id="cp-bar" x1="0" x2="1">
            <stop offset="0" stopColor="#1f9e6c" />
            <stop offset="1" stopColor="#3ee6a0" />
          </linearGradient>
        </defs>
        {rows.map(([label, status, color], i) => {
          const y = 124 + i * 38;
          return (
            <g key={label}>
              <rect x="20" y={y - 14} width="420" height="30" rx="8" fill={i === 2 ? "rgb(231 195 106 / 0.05)" : "rgb(236 238 233 / 0.02)"} stroke={line} />
              <circle cx="38" cy={y + 1} r="6" fill="none" stroke={color} strokeOpacity="0.8" />
              {status === "Approved" && <path d={`M35 ${y + 1} l2.2 2.2 l4 -4.4`} stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" />}
              <Txt x={54} y={y + 4.5} size={11}>{label}</Txt>
              <Txt x={428} y={y + 4} size={8.5} mono fill={color} anchor="end">{status.toUpperCase()}</Txt>
            </g>
          );
        })}
      </Panel>

      {/* roles + billing */}
      <Panel
        viewBox="0 0 250 200"
        className="right-[5%] bottom-[9%] w-[33%] group-hover:-translate-y-2"
        style={{ transform: "rotateY(-14deg) rotateX(6deg) translateZ(60px)" }}
      >
        <rect x="0.5" y="0.5" width="249" height="199" rx="14" fill="#0e1210" stroke={lineHi} />
        <Txt x={18} y={28} size={8.5} mono fill="#9ba29d">ACCESS · RBAC</Txt>
        {[
          ["Owner", "Full access", "#3ee6a0"],
          ["Admin", "Manage team", "#8ff2c6"],
          ["Auditor", "Read only", "#9ba29d"],
        ].map(([r, d, c], i) => (
          <g key={r}>
            <circle cx="30" cy={54 + i * 32} r="10" fill="rgb(236 238 233 / 0.06)" stroke={c} strokeOpacity="0.6" />
            <Txt x={30} y={57.5 + i * 32} size={8} anchor="middle" mono fill={c}>{r[0]}</Txt>
            <Txt x={48} y={52 + i * 32} size={10.5}>{r}</Txt>
            <Txt x={48} y={64 + i * 32} size={8} fill="#757c77">{d}</Txt>
          </g>
        ))}
        <line x1="18" y1="148" x2="232" y2="148" stroke={line} />
        <rect x="18" y="160" width="214" height="24" rx="12" fill="rgb(143 107 255 / 0.12)" stroke="rgb(143 107 255 / 0.35)" />
        <Txt x={32} y={175.5} size={9} mono fill="#b9a5ff">PRO PLAN</Txt>
        <circle cx="200" cy="172" r="3" fill="#3ee6a0" />
        <Txt x={194} y={175.5} size={8.5} mono fill="#9ba29d" anchor="end">ACTIVE</Txt>
      </Panel>

      {/* shield emblem */}
      <div className="absolute left-[77%] top-[36%] w-[12%] -translate-x-1/2 -translate-y-1/2 [transform:translateZ(90px)]">
        <div className="absolute inset-[-40%] rounded-full bg-[radial-gradient(circle,rgb(62_230_160/0.35),transparent_65%)] blur-md" />
        <svg viewBox="0 0 80 90" className="relative w-full" aria-hidden>
          <path d="M40 4 L72 16 V44 C72 64 58 78 40 86 C22 78 8 64 8 44 V16 Z" fill="rgb(10 30 22 / 0.95)" stroke="#3ee6a0" strokeWidth="1.5" />
          <path d="M40 14 L63 23 V44 C63 58 53 69 40 75 C27 69 17 58 17 44 V23 Z" fill="none" stroke="rgb(62 230 160 / 0.3)" />
          <path d="M28 45 l8 8 l16 -17" fill="none" stroke="#8ff2c6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Stage>
  );
}

/* ───────────────────────── 02 Care platform ───────────────────────── */
function Care() {
  const days = ["MON", "TUE", "WED", "THU", "FRI"];
  const blocks = [
    [0, 0, 2, "JM", "t"], [0, 3, 1, "AK", "v"], [1, 1, 2, "RS", "t"], [1, 4, 1, "JM", "t"],
    [2, 0, 1, "AK", "v"], [2, 2, 2, "LP", "t"], [3, 1, 1, "RS", "v"], [3, 3, 2, "JM", "t"],
    [4, 0, 2, "LP", "t"], [4, 3, 1, "AK", "v"],
  ] as const;
  const log = [
    ["09:42", "Visit completed", "JM"],
    ["09:15", "Care plan updated", "AK"],
    ["08:58", "Shift reassigned", "RS"],
    ["08:30", "Medication logged", "LP"],
    ["08:02", "Signed in · SSO", "JM"],
  ];
  return (
    <Stage glow="radial-gradient(ellipse at 80% 100%, rgb(60 200 214 / 0.2), transparent 55%), radial-gradient(ellipse at 0% 0%, rgb(143 107 255 / 0.1), transparent 50%), #080a0b">
      <Panel
        viewBox="0 0 500 340"
        className="left-[5%] top-[17%] w-[62%] group-hover:-translate-y-1"
        style={{ transform: "rotateY(12deg) rotateX(5deg)" }}
      >
        <rect x="0.5" y="0.5" width="499" height="339" rx="16" fill={panelFill} stroke={lineHi} />
        <Txt x={22} y={34} size={13} weight={500}>Care schedule</Txt>
        <Txt x={22} y={50} size={8} mono fill="#757c77">NORTH TEAM · THIS WEEK</Txt>
        {["Day", "Week", "Month"].map((t, i) => (
          <g key={t}>
            <rect x={330 + i * 52} y="22" width="48" height="20" rx="10" fill={i === 1 ? "rgb(60 200 214 / 0.14)" : "transparent"} stroke={i === 1 ? "rgb(60 200 214 / 0.4)" : line} />
            <Txt x={354 + i * 52} y={35.5} size={8.5} anchor="middle" fill={i === 1 ? "#9ee9f1" : "#9ba29d"}>{t}</Txt>
          </g>
        ))}
        {days.map((d, i) => (
          <Txt key={d} x={78 + i * 84} y={80} size={8} mono fill="#757c77">{d}</Txt>
        ))}
        {["08", "10", "12", "14", "16"].map((h, r) => (
          <g key={h}>
            <Txt x={22} y={108 + r * 48} size={8} mono fill="#757c77">{h}:00</Txt>
            <line x1="62" y1={96 + r * 48} x2="480" y2={96 + r * 48} stroke={line} />
          </g>
        ))}
        {blocks.map(([c, r, len, who, tone], i) => {
          const x = 66 + c * 84;
          const y = 100 + r * 48;
          const t = tone === "t";
          return (
            <g key={i}>
              <rect x={x} y={y} width="76" height={len * 48 - 8} rx="7" fill={t ? "rgb(60 200 214 / 0.12)" : "rgb(143 107 255 / 0.14)"} stroke={t ? "rgb(60 200 214 / 0.45)" : "rgb(143 107 255 / 0.45)"} />
              <rect x={x} y={y} width="2.5" height={len * 48 - 8} rx="1.25" fill={t ? "#3cc8d6" : "#8f6bff"} />
              <Txt x={x + 10} y={y + 16} size={8.5} fill={t ? "#bff3f8" : "#d6cbff"}>{t ? "Home visit" : "Review"}</Txt>
              <Txt x={x + 10} y={y + 28} size={7.5} mono fill="#9ba29d">{who}</Txt>
            </g>
          );
        })}
      </Panel>

      <Panel
        viewBox="0 0 260 270"
        className="right-[5%] top-[26%] w-[34%] group-hover:-translate-y-2"
        style={{ transform: "rotateY(12deg) rotateX(5deg) translateZ(70px)" }}
      >
        <rect x="0.5" y="0.5" width="259" height="269" rx="14" fill="#0e1112" stroke={lineHi} />
        <Txt x={18} y={30} size={11.5} weight={500}>Audit log</Txt>
        <circle cx="232" cy="26" r="4" fill="#3cc8d6" className="animate-pulse-soft" />
        <line x1="18" y1="44" x2="242" y2="44" stroke={line} />
        {log.map(([time, what, who], i) => (
          <g key={time}>
            <Txt x={18} y={70 + i * 36} size={8.5} mono fill="#757c77">{time}</Txt>
            <Txt x={62} y={70 + i * 36} size={10}>{what}</Txt>
            <rect x="214" y={58 + i * 36} width="28" height="16" rx="8" fill="rgb(236 238 233 / 0.06)" />
            <Txt x={228} y={69.5 + i * 36} size={7.5} mono anchor="middle" fill="#9ba29d">{who}</Txt>
            {i < log.length - 1 && <line x1="18" y1={84 + i * 36} x2="242" y2={84 + i * 36} stroke={line} strokeDasharray="2 3" />}
          </g>
        ))}
      </Panel>

      <Panel
        viewBox="0 0 230 56"
        className="left-[9%] bottom-[8%] w-[30%]"
        style={{ transform: "rotateY(12deg) rotateX(5deg) translateZ(50px)" }}
      >
        <rect x="0.5" y="0.5" width="229" height="55" rx="28" fill="#0e1112" stroke="rgb(60 200 214 / 0.4)" />
        <rect x="14" y="14" width="28" height="28" rx="14" fill="rgb(60 200 214 / 0.15)" />
        <path d="M24 28 v-3 a4 4 0 0 1 8 0 v3 M22 28 h12 v8 h-12 z" fill="none" stroke="#9ee9f1" strokeWidth="1.4" />
        <Txt x={54} y={25} size={10}>Coordinator role</Txt>
        <Txt x={54} y={39} size={7.5} mono fill="#757c77">AUTH0 · MFA ENABLED</Txt>
      </Panel>
    </Stage>
  );
}

/* ───────────────────────── 03 Logix Plus ───────────────────────── */
function Logix() {
  const bars = [38, 52, 44, 66, 58, 74, 62, 80, 70, 92, 84, 100];
  return (
    <Stage glow="radial-gradient(ellipse at 30% 0%, rgb(143 107 255 / 0.22), transparent 55%), radial-gradient(ellipse at 100% 100%, rgb(62 230 160 / 0.1), transparent 50%), #09080c">
      <Panel
        viewBox="0 0 480 300"
        className="left-[5%] top-[19%] w-[58%] group-hover:-translate-y-1"
        style={{ transform: "rotateY(-12deg) rotateX(6deg)" }}
      >
        <defs>
          <linearGradient id="lx-bar" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#8f6bff" stopOpacity="0.15" />
            <stop offset="1" stopColor="#b9a5ff" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <rect x="0.5" y="0.5" width="479" height="299" rx="16" fill={panelFill} stroke={lineHi} />
        <Txt x={22} y={34} size={13} weight={500}>Sales overview</Txt>
        <Txt x={22} y={50} size={8} mono fill="#757c77">ALL BRANCHES</Txt>
        {["Branch 01", "Branch 02", "Branch 03"].map((b, i) => (
          <g key={b}>
            <rect x={240 + i * 76} y="24" width="70" height="22" rx="11" fill={i === 0 ? "rgb(143 107 255 / 0.16)" : "transparent"} stroke={i === 0 ? "rgb(143 107 255 / 0.45)" : line} />
            <Txt x={275 + i * 76} y={38.5} size={8.5} anchor="middle" fill={i === 0 ? "#d6cbff" : "#9ba29d"}>{b}</Txt>
          </g>
        ))}
        {[110, 160, 210, 260].map((y) => (
          <line key={y} x1="22" y1={y} x2="458" y2={y} stroke={line} strokeDasharray="2 4" />
        ))}
        {bars.map((h, i) => (
          <rect key={i} x={30 + i * 36} y={260 - h * 1.5} width="20" height={h * 1.5} rx="4" fill="url(#lx-bar)" />
        ))}
        <path
          d={`M40 ${260 - 38 * 1.5 - 14} ${bars.map((h, i) => `L${40 + i * 36} ${260 - h * 1.5 - 14}`).join(" ")}`}
          fill="none"
          stroke="#3ee6a0"
          strokeWidth="1.5"
          strokeOpacity="0.8"
        />
        <circle cx={40 + 11 * 36} cy={260 - 150 - 14} r="4" fill="#3ee6a0" />
      </Panel>

      {/* receipt */}
      <Panel
        viewBox="0 0 160 240"
        className="left-[66%] top-[8%] w-[22%] group-hover:translate-y-1"
        style={{ transform: "rotateY(-12deg) rotateX(6deg) rotateZ(4deg) translateZ(30px)" }}
      >
        <path d="M0 0 H160 V228 l-10 8 l-10 -8 l-10 8 l-10 -8 l-10 8 l-10 -8 l-10 8 l-10 -8 l-10 8 l-10 -8 l-10 8 l-10 -8 l-10 8 l-10 -8 l-10 8 l-10 -8 l-10 8 Z" fill="#e9e7f0" />
        <Txt x={80} y={28} size={10} anchor="middle" fill="#1a1724" weight={600}>LOGIX+</Txt>
        <Txt x={80} y={42} size={7} mono anchor="middle" fill="#6b6780">BRANCH 01 · #1042</Txt>
        <line x1="14" y1="54" x2="146" y2="54" stroke="#b8b4c6" strokeDasharray="3 3" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="14" y={66 + i * 20} width={[70, 54, 80, 46][i]} height="6" rx="3" fill="#c9c5d6" />
            <rect x="118" y={66 + i * 20} width="28" height="6" rx="3" fill="#c9c5d6" />
          </g>
        ))}
        <line x1="14" y1="152" x2="146" y2="152" stroke="#b8b4c6" strokeDasharray="3 3" />
        <Txt x={14} y={172} size={8} mono fill="#1a1724" weight={600}>TOTAL</Txt>
        <rect x="108" y="165" width="38" height="8" rx="4" fill="#1a1724" />
        {Array.from({ length: 22 }).map((_, i) => (
          <rect key={i} x={20 + i * 5.6} y="188" width={i % 3 === 0 ? 2.6 : 1.4} height="24" fill="#1a1724" />
        ))}
      </Panel>

      {/* AI insight */}
      <Panel
        viewBox="0 0 300 120"
        className="left-[50%] top-[57%] w-[42%] group-hover:-translate-y-2"
        style={{ transform: "rotateY(-12deg) rotateX(6deg) translateZ(80px)" }}
      >
        <defs>
          <linearGradient id="lx-ai" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="rgb(143 107 255 / 0.22)" />
            <stop offset="1" stopColor="rgb(14 16 15 / 0.98)" />
          </linearGradient>
        </defs>
        <rect x="0.5" y="0.5" width="299" height="119" rx="16" fill="url(#lx-ai)" stroke="rgb(143 107 255 / 0.5)" />
        <path d="M30 26 l3.5 -8 l3.5 8 l8 3.5 l-8 3.5 l-3.5 8 l-3.5 -8 l-8 -3.5 z" fill="#b9a5ff" />
        <Txt x={54} y={33} size={9} mono fill="#b9a5ff">AI INSIGHT</Txt>
        <Txt x={22} y={62} size={12}>Demand for 3 products is rising</Txt>
        <Txt x={22} y={80} size={12}>at Branch 02 this weekend.</Txt>
        <rect x="22" y="92" width="92" height="18" rx="9" fill="rgb(236 238 233 / 0.92)" />
        <Txt x={68} y={104} size={8.5} anchor="middle" fill="#0b0d0c" weight={600}>Reorder stock</Txt>
      </Panel>

      {/* WhatsApp bubble */}
      <Panel
        viewBox="0 0 230 64"
        className="left-[8%] top-[76%] w-[31%]"
        style={{ transform: "rotateY(-12deg) rotateX(6deg) translateZ(50px)" }}
      >
        <path d="M14 0.5 H216 a13.5 13.5 0 0 1 13.5 13.5 V40 a13.5 13.5 0 0 1 -13.5 13.5 H24 L8 63 L10 50 a13.5 13.5 0 0 1 -9.5 -12.9 V14 A13.5 13.5 0 0 1 14 0.5 Z" fill="rgb(37 211 102 / 0.14)" stroke="rgb(37 211 102 / 0.45)" />
        <Txt x={16} y={22} size={7.5} mono fill="#7fe3a6">WHATSAPP</Txt>
        <Txt x={16} y={40} size={10.5}>Order #1042 is ready for pickup</Txt>
        <path d="M200 40 l3 3 l6 -6 M206 40 l3 3 l6 -6" fill="none" stroke="#7fe3a6" strokeWidth="1.3" strokeLinecap="round" />
      </Panel>
    </Stage>
  );
}

/* ───────────────────────── 04 AI Automation ───────────────────────── */
function Automation() {
  const nodes = [
    { id: "hook", x: 70, y: 250, label: "Webhook", sub: "New lead", color: "#9ba29d" },
    { id: "ai", x: 270, y: 250, label: "AI Classify", sub: "Claude", color: "#b9a5ff" },
    { id: "if", x: 460, y: 250, label: "Decision", sub: "Intent = high", color: "#e7c36a" },
    { id: "crm", x: 650, y: 130, label: "CRM", sub: "Create deal", color: "#8ff2c6" },
    { id: "wa", x: 650, y: 250, label: "WhatsApp", sub: "Send intro", color: "#7fe3a6" },
    { id: "mail", x: 650, y: 370, label: "Email", sub: "Nurture flow", color: "#8ff2c6" },
  ];
  const W = 130;
  const H = 58;
  const edges = [
    ["hook", "ai"],
    ["ai", "if"],
    ["if", "crm"],
    ["if", "wa"],
    ["if", "mail"],
  ];
  const get = (id: string) => nodes.find((n) => n.id === id)!;
  const path = (a: string, b: string) => {
    const s = get(a);
    const e = get(b);
    const x1 = s.x + W;
    const y1 = s.y + H / 2;
    const x2 = e.x;
    const y2 = e.y + H / 2;
    const mx = (x1 + x2) / 2;
    return `M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
  };

  return (
    <Stage glow="radial-gradient(ellipse at 35% 50%, rgb(143 107 255 / 0.18), transparent 50%), radial-gradient(ellipse at 85% 50%, rgb(62 230 160 / 0.14), transparent 50%), #080908">
      <div className="absolute inset-0 bg-[radial-gradient(rgb(236_238_233/0.09)_1px,transparent_1px)] [background-size:22px_22px]" />
      <svg viewBox="0 0 840 560" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <defs>
          <linearGradient id="au-edge" x1="0" x2="1">
            <stop offset="0" stopColor="#8f6bff" />
            <stop offset="1" stopColor="#3ee6a0" />
          </linearGradient>
          <filter id="au-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        {edges.map(([a, b], i) => {
          const d = path(a, b);
          return (
            <g key={i}>
              <path id={`au-p${i}`} d={d} fill="none" stroke={line} strokeWidth="1.5" />
              <path d={d} fill="none" stroke="url(#au-edge)" strokeWidth="1.5" strokeOpacity="0.55" className="flow-dash" />
              <circle r="4" fill="#eceee9">
                <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${i * 0.35}s`} rotate="auto">
                  <mpath href={`#au-p${i}`} />
                </animateMotion>
              </circle>
              <circle r="7" fill="#3ee6a0" opacity="0.4" filter="url(#au-glow)">
                <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${i * 0.35}s`}>
                  <mpath href={`#au-p${i}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            {n.id === "ai" && (
              <rect x={n.x - 8} y={n.y - 8} width={W + 16} height={H + 16} rx="20" fill="none" stroke="rgb(143 107 255 / 0.35)" className="animate-pulse-soft" style={{ transformOrigin: `${n.x + W / 2}px ${n.y + H / 2}px` }} />
            )}
            <rect x={n.x} y={n.y} width={W} height={H} rx="14" fill="#0d100e" stroke={n.id === "ai" ? "rgb(143 107 255 / 0.7)" : lineHi} />
            <rect x={n.x + 12} y={n.y + 15} width="28" height="28" rx="8" fill="rgb(236 238 233 / 0.05)" stroke={n.color} strokeOpacity="0.5" />
            <circle cx={n.x + 26} cy={n.y + 29} r="4" fill={n.color} />
            <Txt x={n.x + 50} y={n.y + 27} size={12.5} weight={500}>{n.label}</Txt>
            <Txt x={n.x + 50} y={n.y + 42} size={9} mono fill="#757c77">{n.sub}</Txt>
            <circle cx={n.x} cy={n.y + H / 2} r="3.5" fill="#0d100e" stroke={lineHi} />
            <circle cx={n.x + W} cy={n.y + H / 2} r="3.5" fill="#0d100e" stroke={lineHi} />
          </g>
        ))}
        {/* run log */}
        <g transform="translate(70 400)">
          <rect width="360" height="110" rx="14" fill="rgb(13 16 14 / 0.92)" stroke={line} />
          <Txt x={18} y={28} size={9} mono fill="#9ba29d">EXECUTION</Txt>
          <circle cx="336" cy="24" r="4" fill="#3ee6a0" className="animate-pulse-soft" style={{ transformOrigin: "336px 24px" }} />
          {["✓ lead.received", "✓ ai.classified → high intent", "✓ crm.deal.created · whatsapp.sent"].map((l, i) => (
            <Txt key={l} x={18} y={54 + i * 18} size={10} mono fill={i === 2 ? "#8ff2c6" : "#9ba29d"}>{l}</Txt>
          ))}
        </g>
      </svg>
    </Stage>
  );
}

export function ProjectVisual({ kind }: { kind: Kind }) {
  switch (kind) {
    case "complya":
      return <Complya />;
    case "care":
      return <Care />;
    case "logix":
      return <Logix />;
    case "automation":
      return <Automation />;
  }
}
