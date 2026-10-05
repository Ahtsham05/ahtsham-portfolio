import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(ellipse at 50% -20%, rgba(62,230,160,0.28), transparent 60%), radial-gradient(circle at 90% 90%, rgba(143,107,255,0.25), transparent 45%), #070807",
          color: "#eceee9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, color: "#9ba29d", letterSpacing: 4 }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#3ee6a0" }} />
          FULL-STACK • SAAS • AI AUTOMATION
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1, letterSpacing: -4, fontWeight: 600 }}>
          <span>From idea to intelligent</span>
          <span style={{ color: "#8ff2c6" }}>digital product.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#9ba29d" }}>
          <span style={{ color: "#eceee9" }}>{site.name}</span>
          <span>SaaS · Web · AI Automation</span>
        </div>
      </div>
    ),
    size,
  );
}
