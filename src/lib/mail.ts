/**
 * Shared helpers for the contact endpoints. Email goes out through Resend
 * when RESEND_API_KEY and CONTACT_TO_EMAIL are set.
 */

export const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export const isEmail = (s: string) => /^\S+@\S+\.\S+$/.test(s);

export type SendResult = "sent" | "unconfigured" | "failed";

export async function sendEnquiry({ subject, html, replyTo }: { subject: string; html: string; replyTo: string }): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return "unconfigured";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: replyTo,
      subject,
      html,
    }),
  });
  return res.ok ? "sent" : "failed";
}
