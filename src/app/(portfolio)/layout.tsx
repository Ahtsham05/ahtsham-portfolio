import { site } from "@/content/site";
import { Loader } from "@/components/layout/Loader";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { StageRail } from "@/components/layout/StageRail";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      jobTitle: site.role,
      description: site.description,
      email: `mailto:${site.email}`,
      sameAs: Object.values(site.socials),
      knowsAbout: [
        "SaaS development",
        "Web development",
        "AI automation",
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Stripe",
        "n8n",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: `${site.name} — Full-Stack SaaS & AI Automation`,
      url: site.url,
      description: site.description,
      founder: { "@id": `${site.url}/#person` },
      areaServed: "Worldwide",
      serviceType: ["SaaS Development", "Web Development", "AI Automation", "AI-Powered Products"],
    },
  ],
};

/** Chrome for the main portfolio: intro, nav, build-stage rail and footer. */
export default function PortfolioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Loader />
      <Nav />
      <StageRail />
      <div className="relative overflow-x-clip">
        <main id="main">{children}</main>
        <Footer />
      </div>
    </>
  );
}
