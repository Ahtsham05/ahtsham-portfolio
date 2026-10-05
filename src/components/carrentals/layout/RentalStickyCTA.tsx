"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { goTo } from "../ui/Anchor";

/**
 * Phone-only floating CTA: appears once the hero is behind you and steps
 * aside while the contact form is on screen.
 */
export function RentalStickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const contact = document.getElementById("contact")?.getBoundingClientRect();
      const nearContact = contact ? contact.top < window.innerHeight && contact.bottom > 0 : false;
      setShow(window.scrollY > window.innerHeight * 0.9 && !nearContact);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-700 ease-[var(--ease-out-expo)] md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <a
        href="#contact"
        onClick={(e) => goTo(e, "#contact")}
        tabIndex={show ? 0 : -1}
        aria-hidden={!show}
        className="flex h-13 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-fg font-medium text-ink shadow-[0_18px_50px_-12px_rgb(0_0_0/0.9),0_0_40px_-10px_rgb(62_230_160/0.5)]"
      >
        Get Your Rental Website <ArrowRight className="size-4" aria-hidden />
      </a>
    </div>
  );
}
