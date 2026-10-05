import type { Metadata } from "next";
import { site } from "@/content/site";
import { cr, faqs, services } from "@/content/carrentals/content";
import { RentalHero } from "@/components/carrentals/sections/RentalHero";
import { AudienceMarquee } from "@/components/carrentals/sections/AudienceMarquee";
import { RentalProblems } from "@/components/carrentals/sections/RentalProblems";
import { RentalSolutions } from "@/components/carrentals/sections/RentalSolutions";
import { RentalServices } from "@/components/carrentals/sections/RentalServices";
import { FleetShowcase } from "@/components/carrentals/sections/FleetShowcase";
import { BookingDemo } from "@/components/carrentals/sections/BookingDemo";
import { MobileExperience } from "@/components/carrentals/sections/MobileExperience";
import { ConversionFlow } from "@/components/carrentals/sections/ConversionFlow";
import { AIAutomation } from "@/components/carrentals/sections/AIAutomation";
import { AIChatDemo } from "@/components/carrentals/sections/AIChatDemo";
import { WhatsAppAutomation } from "@/components/carrentals/sections/WhatsAppAutomation";
import { RentalFeatures } from "@/components/carrentals/sections/RentalFeatures";
import { LocalSEO } from "@/components/carrentals/sections/LocalSEO";
import { DesignConcepts } from "@/components/carrentals/sections/DesignConcepts";
import { RentalProcess } from "@/components/carrentals/sections/RentalProcess";
import { WhyAhtshamLabs } from "@/components/carrentals/sections/WhyAhtshamLabs";
import { RentalFAQ } from "@/components/carrentals/sections/RentalFAQ";
import { RentalCTA } from "@/components/carrentals/sections/RentalCTA";
import { RentalContact } from "@/components/carrentals/sections/RentalContact";

const url = `${site.url}${cr.path}`;

export const metadata: Metadata = {
  title: { absolute: cr.seo.title },
  description: cr.seo.description,
  keywords: [...cr.seo.keywords],
  alternates: { canonical: cr.path },
  openGraph: {
    type: "website",
    url,
    siteName: cr.brand,
    title: cr.seo.title,
    description: cr.seo.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: cr.seo.title,
    description: cr.seo.description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#ahtsham-labs`,
      name: cr.brand,
      url: site.url,
      email: `mailto:${site.email}`,
      sameAs: Object.values(site.socials),
      founder: { "@type": "Person", name: site.name, url: site.url },
    },
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: "Car Rental Website Development",
      serviceType: "Car rental website development",
      description: cr.seo.description,
      provider: { "@id": `${site.url}/#ahtsham-labs` },
      areaServed: "Worldwide",
      audience: { "@type": "BusinessAudience", audienceType: "Car rental businesses" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Car rental digital services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.body },
        })),
      },
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: cr.seo.title,
      description: cr.seo.description,
      about: { "@id": `${url}#service` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Car Rental Websites", item: url },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function CarRentalsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <RentalHero />
      <AudienceMarquee />
      <RentalProblems />
      <RentalSolutions />
      <RentalServices />
      <FleetShowcase />
      <BookingDemo />
      <MobileExperience />
      <ConversionFlow />
      <AIAutomation />
      <AIChatDemo />
      <WhatsAppAutomation />
      <RentalFeatures />
      <LocalSEO />
      <DesignConcepts />
      <RentalProcess />
      <WhyAhtshamLabs />
      <RentalFAQ />
      <RentalCTA />
      <RentalContact />
    </>
  );
}
