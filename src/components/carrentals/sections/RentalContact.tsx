"use client";

import { useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { site } from "@/content/site";
import { contactOptions } from "@/content/carrentals/content";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";
type Field = "name" | "email" | "business";
type Errors = Partial<Record<Field, string>>;

const field =
  "peer w-full rounded-none border-0 border-b border-line-2 bg-transparent px-0 pb-3 pt-7 text-base text-fg placeholder-transparent outline-none transition-colors focus:border-emerald focus-visible:outline-none";
const floatLabel =
  "pointer-events-none absolute left-0 top-7 text-muted transition-all duration-300 peer-focus:top-1 peer-focus:font-mono peer-focus:text-[0.625rem] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-emerald peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:font-mono peer-[:not(:placeholder-shown)]:text-[0.625rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]";
const chip =
  "block rounded-full border border-line-2 px-4 py-2 text-sm text-muted transition-all duration-300 hover:text-fg peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-emerald";
const legend = "font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted";

function TextField({
  name,
  label,
  type = "text",
  autoComplete,
  required,
  error,
  optional,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
  optional?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={`cr-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={label}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `cr-e-${name}` : undefined}
        className={field}
      />
      <label htmlFor={`cr-${name}`} className={floatLabel}>
        {label} {optional && <span className="text-dim">(optional)</span>}
      </label>
      {error && (
        <p id={`cr-e-${name}`} className="mt-2 text-xs text-[#ff8a8a]">
          {error}
        </p>
      )}
    </div>
  );
}

export function RentalContact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [needs, setNeeds] = useState<string[]>(["Complete System"]);
  const [vehicles, setVehicles] = useState<string>(contactOptions.fleetSizes[1]);
  const [budget, setBudget] = useState<string>(contactOptions.budgets[4]);

  const toggleNeed = (n: string) => setNeeds((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n]));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const errs: Errors = {};
    if (!data.name?.trim()) errs.name = "Please tell me your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? "")) errs.email = "A valid email helps me reply.";
    if (!data.business?.trim()) errs.business = "Which rental business is this for?";
    setErrors(errs);
    if (Object.keys(errs).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    const payload = { ...data, needs, vehicles, budget };
    try {
      const res = await fetch("/api/carrentals/inquiry", {
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
        const body = [
          `Name: ${data.name}`,
          `Business: ${data.business}`,
          `Website: ${data.website || "-"}`,
          `WhatsApp / phone: ${data.phone || "-"}`,
          `Vehicles: ${vehicles}`,
          `Locations: ${data.locations || "-"}`,
          `Needs: ${needs.join(", ") || "-"}`,
          `Budget: ${budget}`,
          "",
          data.message ?? "",
        ].join("\n");
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Car rental website — ${data.business}`)}&body=${encodeURIComponent(body)}`;
        setStatus("mailto");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-5">
          <SectionLabel index="16">Contact</SectionLabel>
          <RevealLines
            id="contact-title"
            className="h-section mt-8"
            lines={[
              "Request a",
              <span key="l1">
                <span className="serif-em text-emerald-soft">consultation.</span>
              </span>,
            ]}
          />
          <Reveal delay={0.1}>
            <p className="lede mt-8 max-w-md">
              Share a few details about your fleet and goals. I’ll reply personally with honest recommendations and a
              suggested next step — no obligation.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <ol className="mt-12 space-y-5 border-t border-line pt-8">
              {[
                ["01", "You send the form", "Takes about two minutes."],
                ["02", "I review your business", "Your current site, fleet, locations and competitors."],
                ["03", "We talk through options", "A clear plan, timeline and quote — or honest advice if it isn’t a fit."],
              ].map(([n, t, b]) => (
                <li key={n} className="flex gap-4">
                  <span className="font-mono text-xs text-emerald">{n}</span>
                  <div>
                    <p className="text-[0.9375rem] font-medium">{t}</p>
                    <p className="mt-0.5 text-sm text-muted">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href={`mailto:${site.email}`} className="group flex items-center gap-2.5 rounded-full border border-line-2 px-4 py-2.5 text-sm transition-colors hover:border-emerald/50">
                <BrandIcon name="email" className="size-4 text-muted transition-colors group-hover:text-emerald" />
                {site.email}
              </a>
              {(
                [
                  ["linkedin", site.socials.linkedin, "LinkedIn"],
                  ["upwork", site.socials.upwork, "Upwork"],
                ] as const
              ).map(([icon, href, label]) => (
                <a
                  key={icon}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-full border border-line-2 text-muted transition-colors hover:border-emerald/50 hover:text-fg"
                >
                  <BrandIcon name={icon} className="size-4" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="min-w-0 lg:col-span-7">
          <div className="surface relative overflow-hidden rounded-[28px] p-6 sm:p-8 md:p-12">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(circle,rgb(62_230_160/0.12),transparent_65%)]" />

            {status === "sent" ? (
              <div className="flex min-h-[36rem] flex-col items-start justify-center" role="status">
                <span className="grid size-14 place-items-center rounded-full border border-emerald/40 bg-emerald/10 text-emerald">
                  <Check className="size-6" aria-hidden />
                </span>
                <h3 className="mt-8 text-4xl font-medium tracking-[-0.04em]">
                  Request <span className="serif-em text-emerald-soft">received.</span>
                </h3>
                <p className="lede mt-4 max-w-sm">Thanks — I’ll review your business and reply by email shortly.</p>
                <button type="button" onClick={() => setStatus("idle")} className="mt-8 text-sm text-muted underline underline-offset-4 hover:text-fg">
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="relative space-y-8">
                {/* honeypot */}
                <div aria-hidden className="absolute -left-[9999px]">
                  <label>
                    Leave empty
                    <input name="nickname" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <TextField name="name" label="Name" autoComplete="name" required error={errors.name} />
                  <TextField name="email" label="Email" type="email" autoComplete="email" required error={errors.email} />
                  <TextField name="business" label="Business name" autoComplete="organization" required error={errors.business} />
                  <TextField name="website" label="Website" type="url" autoComplete="url" optional />
                  <TextField name="phone" label="WhatsApp / phone" type="tel" autoComplete="tel" optional />
                  <TextField name="locations" label="Locations" optional />
                </div>

                <fieldset>
                  <legend className={legend}>Number of vehicles</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {contactOptions.fleetSizes.map((v) => (
                      <label key={v} className="cursor-pointer">
                        <input type="radio" name="vehiclesChoice" value={v} checked={vehicles === v} onChange={() => setVehicles(v)} className="peer sr-only" />
                        <span className={`${chip} peer-checked:border-emerald/60 peer-checked:bg-emerald/10 peer-checked:text-fg`}>{v}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className={legend}>
                    What do you need? <span className="normal-case tracking-normal text-dim">— choose any</span>
                  </legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {contactOptions.needs.map((n) => (
                      <label key={n} className="cursor-pointer">
                        <input type="checkbox" name="needsChoice" value={n} checked={needs.includes(n)} onChange={() => toggleNeed(n)} className="peer sr-only" />
                        <span className={`${chip} peer-checked:border-transparent peer-checked:bg-fg peer-checked:text-ink`}>{n}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className={legend}>Budget</legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {contactOptions.budgets.map((b) => (
                      <label key={b} className="cursor-pointer">
                        <input type="radio" name="budgetChoice" value={b} checked={budget === b} onChange={() => setBudget(b)} className="peer sr-only" />
                        <span className={`${chip} peer-checked:border-emerald/60 peer-checked:bg-emerald/10 peer-checked:text-fg`}>{b}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="relative">
                  <textarea id="cr-message" name="message" rows={4} placeholder="Message" className={`${field} resize-none`} />
                  <label htmlFor="cr-message" className={floatLabel}>
                    Anything else? Current website, booking software, goals… <span className="text-dim">(optional)</span>
                  </label>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-5 pt-2">
                  <p className="text-sm text-muted" role="status" aria-live="polite">
                    {status === "mailto" && "Opening your email app to send the request…"}
                    {status === "error" && <span className="text-[#ff8a8a]">Something went wrong. Please email me at {site.email}.</span>}
                  </p>
                  <Magnetic>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      data-cursor="cta"
                      className="group inline-flex h-13 items-center gap-3 rounded-full bg-fg px-7 font-medium text-ink shadow-[0_10px_40px_-10px_rgb(62_230_160/0.5)] transition-colors hover:bg-white disabled:opacity-70"
                    >
                      {status === "sending" ? "Sending…" : "Request a Consultation"}
                      {status === "sending" ? (
                        <LoaderCircle className="size-4 animate-spin" aria-hidden />
                      ) : (
                        <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden />
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
