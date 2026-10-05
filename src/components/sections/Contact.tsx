"use client";

import { useState } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { site } from "@/content/site";
import { BrandIcon } from "../ui/BrandIcon";
import { Reveal, RevealLines } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { Magnetic } from "../ui/Magnetic";

const projectTypes = ["Website", "SaaS product", "AI automation", "AI product", "Something else"];
const budgets = ["Under $3k", "$3k – $10k", "$10k – $25k", "$25k+", "Not sure yet"];

type Status = "idle" | "sending" | "sent" | "mailto" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const field =
  "peer w-full rounded-none border-0 border-b border-line-2 bg-transparent px-0 pb-3 pt-7 text-base text-fg placeholder-transparent outline-none transition-colors focus:border-emerald focus-visible:outline-none";
const floatLabel =
  "pointer-events-none absolute left-0 top-7 text-muted transition-all duration-300 peer-focus:top-1 peer-focus:font-mono peer-focus:text-[0.625rem] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-emerald peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:font-mono peer-[:not(:placeholder-shown)]:text-[0.625rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [type, setType] = useState(projectTypes[1]);
  const [budget, setBudget] = useState(budgets[4]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const errs: Errors = {};
    if (!data.name?.trim()) errs.name = "Please tell me your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? "")) errs.email = "A valid email helps me reply.";
    if ((data.message ?? "").trim().length < 10) errs.message = "A sentence or two about the project, please.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    const payload = { ...data, projectType: type, budget };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      if (res.status === 503) {
        // No mail provider configured — hand off to the visitor's email client.
        const body = `Name: ${data.name}\nCompany: ${data.company || "-"}\nProject type: ${type}\nBudget: ${budget}\n\n${data.message}`;
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`New project — ${type}`)}&body=${encodeURIComponent(body)}`;
        setStatus("mailto");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const contacts = [
    { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: "email" },
    { label: "LinkedIn", value: "Connect", href: site.socials.linkedin, icon: "linkedin" },
    { label: "GitHub", value: "Code", href: site.socials.github, icon: "github" },
    { label: "Upwork", value: "Hire", href: site.socials.upwork, icon: "upwork" },
  ];

  return (
    <section id="contact" data-stage="8" aria-labelledby="contact-title" className="section-y relative">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-5">
          <SectionLabel index="09">Contact</SectionLabel>
          <RevealLines
            id="contact-title"
            className="h-section mt-8"
            lines={[
              "Let’s build something",
              <span key="l1">
                <span className="serif-em text-emerald-soft">remarkable.</span>
              </span>,
            ]}
          />
          <Reveal delay={0.1}>
            <p className="lede mt-8 max-w-md">
              Tell me about your idea, product or process. I’ll come back with honest thoughts on the best way to build
              it.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-12 border-t border-line">
              {contacts.map((c) => (
                <li key={c.label} className="border-b border-line">
                  <a
                    href={c.href}
                    target={c.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={c.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="group flex items-center gap-4 py-4"
                  >
                    <BrandIcon name={c.icon} className="size-4 text-muted transition-colors group-hover:text-emerald" />
                    <span className="w-20 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-dim">{c.label}</span>
                    <span className="flex-1 truncate text-fg/90 transition-colors group-hover:text-fg">{c.value}</span>
                    <ArrowUpRight className="size-4 text-dim transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="min-w-0 lg:col-span-7">
          <div className="surface relative overflow-hidden rounded-[28px] p-6 sm:p-8 md:p-12">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(circle,rgb(62_230_160/0.12),transparent_65%)]" />

            {status === "sent" ? (
              <div className="flex min-h-[32rem] flex-col items-start justify-center" role="status">
                <span className="grid size-14 place-items-center rounded-full border border-emerald/40 bg-emerald/10 text-emerald">
                  <Check className="size-6" aria-hidden />
                </span>
                <h3 className="mt-8 text-4xl font-medium tracking-[-0.04em]">
                  Message <span className="serif-em text-emerald-soft">received.</span>
                </h3>
                <p className="lede mt-4 max-w-sm">Thanks for reaching out — I’ll reply to you by email shortly.</p>
                <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-sm text-muted underline underline-offset-4 hover:text-fg">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="relative space-y-8">
                {/* honeypot */}
                <div aria-hidden className="absolute -left-[9999px]">
                  <label>
                    Leave empty
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  {(
                    [
                      ["name", "Name", "text", "name"],
                      ["email", "Email", "email", "email"],
                    ] as const
                  ).map(([name, label, typeAttr, ac]) => (
                    <div key={name} className="relative">
                      <input
                        id={`f-${name}`}
                        name={name}
                        type={typeAttr}
                        autoComplete={ac}
                        placeholder={label}
                        required
                        aria-invalid={!!errors[name]}
                        aria-describedby={errors[name] ? `e-${name}` : undefined}
                        className={field}
                      />
                      <label htmlFor={`f-${name}`} className={floatLabel}>
                        {label}
                      </label>
                      {errors[name] && (
                        <p id={`e-${name}`} className="mt-2 text-xs text-[#ff8a8a]">
                          {errors[name]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="relative">
                  <input id="f-company" name="company" autoComplete="organization" placeholder="Company" className={field} />
                  <label htmlFor="f-company" className={floatLabel}>
                    Company <span className="text-dim">(optional)</span>
                  </label>
                </div>

                <fieldset>
                  <legend className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">Project type</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {projectTypes.map((p) => (
                      <label key={p} className="cursor-pointer">
                        <input type="radio" name="projectTypeChoice" value={p} checked={type === p} onChange={() => setType(p)} className="peer sr-only" />
                        <span className="block rounded-full border border-line-2 px-4 py-2 text-sm text-muted transition-all duration-300 hover:text-fg peer-checked:border-transparent peer-checked:bg-fg peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-emerald">
                          {p}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">Budget</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {budgets.map((b) => (
                      <label key={b} className="cursor-pointer">
                        <input type="radio" name="budgetChoice" value={b} checked={budget === b} onChange={() => setBudget(b)} className="peer sr-only" />
                        <span className="block rounded-full border border-line-2 px-4 py-2 text-sm text-muted transition-all duration-300 hover:text-fg peer-checked:border-emerald/60 peer-checked:bg-emerald/10 peer-checked:text-fg peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-emerald">
                          {b}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="relative">
                  <textarea
                    id="f-message"
                    name="message"
                    rows={4}
                    placeholder="Message"
                    required
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "e-message" : undefined}
                    className={`${field} resize-none`}
                  />
                  <label htmlFor="f-message" className={floatLabel}>
                    Tell me about your project
                  </label>
                  {errors.message && (
                    <p id="e-message" className="mt-2 text-xs text-[#ff8a8a]">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-5 pt-2">
                  <p className="text-sm text-muted" role="status" aria-live="polite">
                    {status === "mailto" && "Opening your email app to send the message…"}
                    {status === "error" && (
                      <span className="text-[#ff8a8a]">
                        Something went wrong. Please email me at {site.email}.
                      </span>
                    )}
                  </p>
                  <Magnetic>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      data-cursor="cta"
                      className="group inline-flex h-13 items-center gap-3 rounded-full bg-fg px-7 font-medium text-ink shadow-[0_10px_40px_-10px_rgb(62_230_160/0.5)] transition-colors hover:bg-white disabled:opacity-70"
                    >
                      {status === "sending" ? "Sending…" : "Start Conversation"}
                      {status === "sending" ? (
                        <LoaderCircle className="size-4 animate-spin" aria-hidden />
                      ) : (
                        <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
                      )}
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
