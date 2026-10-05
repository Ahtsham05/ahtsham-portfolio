export type Service = {
  stage: string;
  stageLabel: string;
  title: string;
  body: string;
  tags: string[];
  visual: "web" | "saas" | "automation" | "ai";
};

/** Ordered as a progression: website → product → connected system → intelligence. */
export const services: Service[] = [
  {
    stage: "01",
    stageLabel: "The website",
    title: "Web Development",
    body: "High-performance websites and web applications designed around conversion, usability, SEO, and strong visual identity.",
    tags: ["Next.js", "SEO", "Performance"],
    visual: "web",
  },
  {
    stage: "02",
    stageLabel: "The product",
    title: "SaaS Development",
    body: "Multi-tenant SaaS platforms with authentication, RBAC, subscriptions, dashboards, APIs, databases, and scalable architecture.",
    tags: ["Multi-tenant", "RBAC", "Stripe"],
    visual: "saas",
  },
  {
    stage: "03",
    stageLabel: "The system",
    title: "AI Automation",
    body: "Connect AI with business workflows, CRMs, APIs, databases, WhatsApp, email, and internal tools to eliminate repetitive work.",
    tags: ["n8n", "APIs", "WhatsApp"],
    visual: "automation",
  },
  {
    stage: "04",
    stageLabel: "The intelligence",
    title: "AI-Powered Products",
    body: "AI assistants, intelligent workflows, document processing, recommendation systems, AI-powered dashboards, and custom business tools.",
    tags: ["LLMs", "Assistants", "RAG"],
    visual: "ai",
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Understand",
    body: "Business goals, users, requirements.",
    deliverables: ["Discovery call", "Scope & priorities", "Success criteria"],
  },
  {
    n: "02",
    title: "Architect",
    body: "Technology, database, security, scalability.",
    deliverables: ["System design", "Data model", "Security plan"],
  },
  {
    n: "03",
    title: "Design",
    body: "Clean UX and conversion-focused interface.",
    deliverables: ["User flows", "Interface design", "Design system"],
  },
  {
    n: "04",
    title: "Build",
    body: "Frontend, backend, integrations, payments.",
    deliverables: ["Weekly releases", "APIs & auth", "Payments"],
  },
  {
    n: "05",
    title: "Automate",
    body: "AI workflows and business automation.",
    deliverables: ["AI workflows", "Integrations", "Notifications"],
  },
  {
    n: "06",
    title: "Launch",
    body: "Testing, deployment, optimization.",
    deliverables: ["QA & testing", "Deployment", "Monitoring"],
  },
];

export type StackCategory = {
  id: string;
  label: string;
  blurb: string;
  items: { name: string; icon: string }[];
};

export const stackCategories: StackCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Fast, accessible interfaces with strong visual identity.",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "next" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "APIs and services built to stay reliable as usage grows.",
    items: [
      { name: "Node.js", icon: "node" },
      { name: "Express", icon: "express" },
      { name: "REST APIs", icon: "api" },
    ],
  },
  {
    id: "database",
    label: "Database",
    blurb: "Data models designed for multi-tenancy, integrity and scale.",
    items: [
      { name: "PostgreSQL", icon: "postgres" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Supabase", icon: "supabase" },
      { name: "Prisma", icon: "prisma" },
    ],
  },
  {
    id: "auth",
    label: "Auth",
    blurb: "Secure sign-in, roles and permissions from day one.",
    items: [
      { name: "Auth0", icon: "auth0" },
      { name: "Clerk", icon: "clerk" },
      { name: "Supabase Auth", icon: "supabase" },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    blurb: "Subscriptions, checkout and billing that run themselves.",
    items: [
      { name: "Stripe", icon: "stripe" },
      { name: "Webhooks", icon: "webhook" },
    ],
  },
  {
    id: "ai",
    label: "AI",
    blurb: "Language models applied to real business problems.",
    items: [
      { name: "OpenAI", icon: "openai" },
      { name: "Claude", icon: "claude" },
      { name: "Gemini", icon: "gemini" },
    ],
  },
  {
    id: "automation",
    label: "Automation",
    blurb: "Workflows that connect tools and remove repetitive work.",
    items: [
      { name: "n8n", icon: "n8n" },
      { name: "WhatsApp API", icon: "whatsapp" },
      { name: "Webhooks", icon: "webhook" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    blurb: "Deployment pipelines and infrastructure you can trust.",
    items: [
      { name: "Vercel", icon: "vercel" },
      { name: "AWS", icon: "aws" },
    ],
  },
];

export const marqueeItems = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "next" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Node.js", icon: "node" },
  { name: "PostgreSQL", icon: "postgres" },
  { name: "Supabase", icon: "supabase" },
  { name: "Stripe", icon: "stripe" },
  { name: "Auth0", icon: "auth0" },
  { name: "Prisma", icon: "prisma" },
  { name: "n8n", icon: "n8n" },
  { name: "Claude", icon: "claude" },
  { name: "Vercel", icon: "vercel" },
];

export const principles = [
  {
    n: "01",
    title: "Business-first thinking",
    body: "Every feature starts with the outcome it should create for your business.",
  },
  {
    n: "02",
    title: "Scalable architecture",
    body: "Foundations that handle your next thousand users without a rewrite.",
  },
  {
    n: "03",
    title: "Clean user experience",
    body: "Interfaces people understand immediately — and enjoy coming back to.",
  },
  {
    n: "04",
    title: "Automation mindset",
    body: "If a task repeats, it should probably run itself.",
  },
];
