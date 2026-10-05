/**
 * Central site configuration.
 * Replace the placeholder contact/social values below with your real ones.
 */
export const site = {
  name: "Ahtsham Younas",
  shortName: "Ahtsham",
  monogram: "AY",
  role: "Full-Stack SaaS Developer & AI Automation Specialist",
  title: "Ahtsham Younas — Full-Stack SaaS Developer & AI Automation Specialist",
  description:
    "I build scalable SaaS products, high-performance websites, and AI-powered business automations for startups and growing businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahtshamlabs.pro",
  locale: "en_US",

  email: "hello@ahtshamlabs.pro",
  socials: {
    linkedin: "https://www.linkedin.com/in/saas-developer-ahtsham-ali",
    github: "https://github.com/Ahtsham05",
    upwork: "https://www.upwork.com/freelancers/developerahtsham",
  },

  /** Hero credibility stats — keep these honest. */
  stats: [
    { value: "2+", label: "Years building" },
    { value: "10+", label: "Digital products" },
    { value: "SaaS", label: "Architecture" },
    { value: "AI", label: "Automation" },
  ],

  /** Set to true once you have real client testimonials in content/testimonials.ts */
  showTestimonials: true,
} as const;

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Process", href: "/#process" },
] as const;

/** The narrative arc the whole page walks the visitor through. */
export const stages = [
  "Idea",
  "Strategy",
  "Design",
  "Web",
  "SaaS",
  "AI",
  "Automation",
  "Deployment",
  "Growth",
] as const;
