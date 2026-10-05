import { Plus } from "lucide-react";
import { faqs } from "@/content/carrentals/content";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Native <details> — accessible, works without JavaScript. */
export function RentalFAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y relative">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel index="15">Questions</SectionLabel>
          <RevealLines id="faq-title" className="h-section mt-8" lines={["Good", <span key="l1" className="serif-em text-muted">questions.</span>]} />
        </div>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <ul className="border-t border-line">
            {faqs.map((f) => (
              <li key={f.q} className="border-b border-line">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium tracking-[-0.02em] transition-colors hover:text-emerald-soft [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line-2 transition-transform duration-500 ease-[var(--ease-out-expo)] group-open:rotate-45 group-open:border-emerald/50">
                      <Plus className="size-4" aria-hidden />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-7 pr-12 leading-relaxed text-muted">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
