import { NextResponse } from "next/server";
import { contactOptions } from "@/content/carrentals/content";
import { clean, escape, isEmail, sendEnquiry } from "@/lib/mail";

/**
 * Consultation requests from /carrentals. Same contract as /api/contact:
 * 503 when email isn't configured so the client can fall back to mailto:.
 */

type Payload = {
  name?: string;
  email?: string;
  business?: string;
  website?: string;
  phone?: string;
  vehicles?: string;
  locations?: string;
  needs?: unknown;
  budget?: string;
  message?: string;
  nickname?: string; // honeypot
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Bots fill hidden fields — pretend success, do nothing.
  if (clean(body.nickname)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const business = clean(body.business, 200);
  const website = clean(body.website, 300);
  const phone = clean(body.phone, 60);
  const vehicles = clean(body.vehicles, 30);
  const locations = clean(body.locations, 300);
  const budget = clean(body.budget, 60);
  const message = clean(body.message, 5000);
  const allowed: readonly string[] = contactOptions.needs;
  const needs = Array.isArray(body.needs) ? body.needs.filter((n): n is string => typeof n === "string" && allowed.includes(n)) : [];

  if (!name || !isEmail(email) || !business) {
    return NextResponse.json({ error: "Please complete the required fields." }, { status: 422 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Business", business],
    ["Website", website || "-"],
    ["WhatsApp / phone", phone || "-"],
    ["Vehicles", vehicles || "-"],
    ["Locations", locations || "-"],
    ["Needs", needs.join(", ") || "-"],
    ["Budget", budget || "-"],
  ];
  const html = `
    <h2>New car rental consultation request</h2>
    ${rows.map(([k, v]) => `<p><strong>${k}:</strong> ${escape(v)}</p>`).join("\n    ")}
    <p><strong>Message:</strong></p>
    <p>${escape(message || "-").replace(/\n/g, "<br/>")}</p>
  `;

  const result = await sendEnquiry({ subject: `Car rental enquiry — ${business} — ${name}`, html, replyTo: email });
  if (result === "unconfigured") {
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 503 });
  }
  if (result === "failed") {
    return NextResponse.json({ error: "Failed to send. Please try email instead." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
