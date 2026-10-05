import { NextResponse } from "next/server";

/**
 * Contact endpoint.
 * Sends via Resend when RESEND_API_KEY and CONTACT_TO_EMAIL are set.
 * Without them it returns 503 so the client falls back to a mailto: link —
 * the form never claims success it didn't achieve.
 */

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  projectType?: string;
  budget?: string;
  website?: string; // honeypot
};

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Bots fill hidden fields — pretend success, do nothing.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);
  const company = clean(body.company, 200);
  const projectType = clean(body.projectType, 60);
  const budget = clean(body.budget, 60);

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Please complete the required fields." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 503 });
  }

  const html = `
    <h2>New project enquiry</h2>
    <p><strong>Name:</strong> ${escape(name)}</p>
    <p><strong>Email:</strong> ${escape(email)}</p>
    <p><strong>Company:</strong> ${escape(company || "-")}</p>
    <p><strong>Project type:</strong> ${escape(projectType || "-")}</p>
    <p><strong>Budget:</strong> ${escape(budget || "-")}</p>
    <p><strong>Message:</strong></p>
    <p>${escape(message).replace(/\n/g, "<br/>")}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `New enquiry — ${projectType || "Project"} — ${name}`,
      html,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to send. Please try email instead." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
