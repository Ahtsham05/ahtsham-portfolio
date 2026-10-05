import { site } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Automation } from "@/components/sections/Automation";
import { Process } from "@/components/sections/Process";
import { Stack } from "@/components/sections/Stack";
import { Why } from "@/components/sections/Why";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Work />
      <Automation />
      <Process />
      <Stack />
      <Why />
      {site.showTestimonials && <Testimonials />}
      <CTA />
      <Contact />
    </>
  );
}
