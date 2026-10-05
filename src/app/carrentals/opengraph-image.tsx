import { ImageResponse } from "next/og";
import { cr } from "@/content/carrentals/content";
import { SHAPES } from "@/components/carrentals/visuals/shapes";

export const alt = cr.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card: headline over a rim-lit coupe outline. */
export default function OpengraphImage() {
  const s = SHAPES.coupe;
  const car = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 420"><g fill="none" stroke="#eceee9" stroke-opacity="0.55" stroke-width="2.4"><path d="${s.body}"/><path d="${s.glass}" stroke-opacity="0.35"/><circle cx="${s.wheels.rear}" cy="${s.wheels.cy}" r="${s.wheels.r}"/><circle cx="${s.wheels.front}" cy="${s.wheels.cy}" r="${s.wheels.r}"/></g><path d="${s.headlight}" fill="#8ff2c6"/></svg>`;
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
            "radial-gradient(ellipse at 70% 110%, rgba(62,230,160,0.30), transparent 55%), radial-gradient(circle at 95% 5%, rgba(143,107,255,0.28), transparent 45%), #070807",
          color: "#f2f0ea",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, color: "#9ba29d", letterSpacing: 5 }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#3ee6a0" }} />
          AHTSHAM LABS · CAR RENTAL SPECIALIST
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 78, lineHeight: 1.02, letterSpacing: -3, fontWeight: 600, maxWidth: 820 }}>
          <span>Turn more searches into</span>
          <span style={{ color: "#8ff2c6" }}>car rental bookings.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#9ba29d" }}>Websites · Booking systems · AI automation</div>
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(car)}`}
          width={640}
          height={224}
          alt=""
          style={{ position: "absolute", right: -40, bottom: 40 }}
        />
      </div>
    ),
    size,
  );
}
