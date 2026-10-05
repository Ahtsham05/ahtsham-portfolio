import { ArrowRight, BellRing, CalendarCheck, CheckCheck, Globe, MessageCircleReply, RefreshCw, Sparkles, Star, Zap } from "lucide-react";
import { whatsappFeatures } from "@/content/carrentals/content";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const flow = [
  { label: "Website inquiry", Icon: Globe },
  { label: "AI", Icon: Sparkles },
  { label: "WhatsApp", brand: "whatsapp" },
  { label: "Booking", Icon: CalendarCheck },
] as const;

const featureIcons = [Zap, CheckCheck, CalendarCheck, BellRing, RefreshCw, Star];

const thread = [
  { from: "customer", text: "Hi, is the G-Class free this weekend?", time: "21:42" },
  { from: "business", tag: "Instant reply", text: "Hi! Yes — the G-Class is available Sat → Mon. Here’s your booking link: yourbrand.com/book/g-class", time: "21:42" },
  { from: "business", tag: "Confirmation", text: "Booking confirmed: G-Class, Sat 10:00, Airport Arrivals. Your reference is YB-20418.", time: "21:51" },
  { from: "business", tag: "Reminder", text: "See you tomorrow at 10:00. Please bring your driving licence and passport.", time: "Fri 18:00" },
  { from: "business", tag: "Review request", text: "Thanks for renting with us! Would you mind leaving a quick review?", time: "Mon 14:10" },
] as const;

export function WhatsAppAutomation() {
  return (
    <section id="whatsapp" aria-labelledby="whatsapp-title" className="section-y relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-15%] top-[25%] h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(circle,rgb(62_230_160/0.08),transparent_62%)]" />
      </div>

      <div className="container-x grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionLabel index="09">WhatsApp automation</SectionLabel>
          <RevealLines
            id="whatsapp-title"
            className="h-section mt-8"
            lines={[
              "Meet customers",
              <span key="l1">
                where they <span className="serif-em text-emerald-soft">already are.</span>
              </span>,
            ]}
          />
          <Reveal delay={0.1}>
            <p className="lede mt-8 max-w-md">
              Many renters would rather message than fill in a form. Automated WhatsApp flows answer, confirm and remind —
              and hand over to your team when a human touch is needed.
            </p>
          </Reveal>

          {/* flow strip */}
          <Reveal delay={0.15}>
            <ol className="mt-10 flex flex-wrap items-center gap-2" aria-label="Inquiry to booking flow">
              {flow.map((f, i) => (
                <li key={f.label} className="flex items-center gap-2">
                  <span
                    className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm ${
                      "brand" in f ? "border-emerald/50 bg-emerald/10 text-fg" : "border-line-2 bg-white/[0.02] text-fg/85"
                    }`}
                  >
                    {"brand" in f ? <BrandIcon name={f.brand} className="size-4 text-emerald" /> : <f.Icon className="size-4 text-emerald" aria-hidden />}
                    {f.label}
                  </span>
                  {i < flow.length - 1 && <ArrowRight className="size-4 text-dim" aria-hidden />}
                </li>
              ))}
            </ol>
          </Reveal>

          <ul className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {whatsappFeatures.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <Reveal as="li" key={f.title} delay={0.1 + i * 0.04} className="flex gap-3 border-t border-line pt-5">
                  <Icon className="mt-0.5 size-4 shrink-0 text-emerald" aria-hidden />
                  <div>
                    <p className="text-[0.9375rem] font-medium">{f.title}</p>
                    <p className="mt-1 text-sm text-muted">{f.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>

        {/* chat mock */}
        <Reveal delay={0.1} className="min-w-0 lg:col-span-5 lg:col-start-8">
          <figure className="relative mx-auto max-w-md">
            <div aria-hidden className="pointer-events-none absolute -inset-8 rounded-[48px] bg-[radial-gradient(ellipse_at_50%_50%,rgb(62_230_160/0.14),transparent_65%)] blur-xl" />
            <div className="relative overflow-hidden rounded-[30px] border border-line-2 bg-[#0a0d0c] shadow-[0_60px_120px_-50px_rgb(0_0_0/0.95)]">
              <div className="flex items-center gap-3 border-b border-line bg-white/[0.03] px-5 py-4">
                <span className="grid size-9 place-items-center rounded-full bg-emerald/15 text-[0.625rem] font-semibold tracking-[0.12em] text-emerald-soft">YB</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">Your Brand Rentals</p>
                  <p className="text-xs text-muted">Business account · automated</p>
                </div>
                <BrandIcon name="whatsapp" className="size-5 text-emerald" title="WhatsApp" />
              </div>
              <ol className="space-y-3 bg-[radial-gradient(circle_at_1px_1px,rgb(236_238_233/0.05)_1px,transparent_0)] bg-[length:18px_18px] px-4 py-5">
                {thread.map((m, i) => (
                  <Reveal as="li" key={i} delay={0.15 + i * 0.12} y={12} className={m.from === "customer" ? "flex justify-end" : "flex"}>
                    <div
                      className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 text-sm ${
                        m.from === "customer" ? "rounded-br-md bg-emerald/[0.18] text-fg" : "rounded-tl-md border border-line bg-white/[0.04]"
                      }`}
                    >
                      {"tag" in m && (
                        <p className="mb-1 flex items-center gap-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-emerald-soft">
                          <MessageCircleReply className="size-3" aria-hidden /> {m.tag}
                        </p>
                      )}
                      <p className="leading-snug text-fg/90">{m.text}</p>
                      <p className="mt-1 flex items-center justify-end gap-1 text-[0.625rem] text-dim">
                        {m.time}
                        {m.from === "business" && <CheckCheck className="size-3 text-emerald" aria-hidden />}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
            <figcaption className="mt-4 text-center font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-dim">
              Sample automated thread · placeholder brand
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
