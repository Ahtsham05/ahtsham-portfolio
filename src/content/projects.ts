export type ProjectVisual = "complya" | "care" | "logix" | "automation";

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  stack: string[];
  features: string[];
  outcome: string;
  visual: ProjectVisual;
  /** Tint used by the abstract visual and case-study page. */
  accent: "emerald" | "teal" | "violet" | "dual";
  caseStudy: {
    role: string;
    type: string;
    challenge: string;
    approach: string[];
    highlights: { title: string; body: string }[];
    result: string;
  };
};

/**
 * Case-study copy describes scope and architecture only — no invented metrics.
 * Edit freely to match the exact details of each engagement.
 */
export const projects: Project[] = [
  {
    slug: "complya",
    number: "01",
    title: "Complya",
    category: "Multi-tenant compliance SaaS",
    summary:
      "A compliance workspace where every organisation gets its own secure, isolated environment — with roles, billing and audit-ready records built in.",
    description:
      "Organisations manage policies, evidence and team responsibilities inside isolated tenants, while subscriptions and access are handled automatically.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "RBAC"],
    features: [
      "Multi-tenant architecture",
      "Role-based access control",
      "Stripe subscriptions",
      "Admin dashboard",
      "Secure authentication",
      "PostgreSQL data model",
    ],
    outcome:
      "Replaced scattered spreadsheets with one structured, permission-aware workspace per organisation.",
    visual: "complya",
    accent: "emerald",
    caseStudy: {
      role: "Full-stack development & architecture",
      type: "B2B SaaS platform",
      challenge:
        "Compliance work usually lives in spreadsheets, shared drives and email threads. The goal was a single product that many organisations could use at once — each completely isolated, each with its own people, permissions and subscription.",
      approach: [
        "Designed a tenant-aware PostgreSQL schema so every query is scoped to an organisation by default.",
        "Built role-based access so owners, admins and members only ever see what they should.",
        "Integrated Stripe subscriptions with webhooks that keep plan limits and access in sync automatically.",
        "Shipped an admin dashboard for managing tenants, plans and platform health.",
      ],
      highlights: [
        {
          title: "Tenant isolation",
          body: "Data boundaries enforced at the data layer, not just in the UI.",
        },
        {
          title: "Billing that runs itself",
          body: "Upgrades, downgrades and failed payments update access without manual work.",
        },
        {
          title: "Audit-ready by design",
          body: "Key actions are recorded so organisations can show who did what, and when.",
        },
      ],
      result:
        "A production-ready SaaS foundation that can onboard new organisations without new engineering work.",
    },
  },
  {
    slug: "care-platform",
    number: "02",
    title: "Care Management Platform",
    category: "Enterprise care operations system",
    summary:
      "An enterprise-style platform for coordinating care teams — scheduling, role-specific workflows and a complete audit trail in one place.",
    description:
      "Coordinators, carers and managers each get workflows shaped around their role, backed by secure authentication and full activity logging.",
    stack: ["React", "Node.js", "Auth0", "PostgreSQL", "Prisma"],
    features: [
      "Auth0 authentication",
      "Role-based workflows",
      "Scheduling",
      "Audit logging",
      "PostgreSQL",
      "Prisma ORM",
    ],
    outcome:
      "Gave care teams one dependable system for schedules, responsibilities and accountability.",
    visual: "care",
    accent: "teal",
    caseStudy: {
      role: "Full-stack development",
      type: "Enterprise web platform",
      challenge:
        "Care operations involve many roles, sensitive information and strict accountability. The platform needed enterprise-grade authentication, clear role boundaries and a reliable record of every change.",
      approach: [
        "Implemented Auth0 for secure sign-in and centralised identity management.",
        "Modelled roles and permissions so each user sees a workflow designed for their job.",
        "Built scheduling flows for assigning and tracking care activities.",
        "Added audit logging across sensitive actions, stored in PostgreSQL via Prisma.",
      ],
      highlights: [
        {
          title: "Role-first workflows",
          body: "Interfaces adapt to coordinators, carers and managers instead of one-size-fits-all screens.",
        },
        {
          title: "Accountability",
          body: "Every sensitive change is traceable through a structured audit log.",
        },
        {
          title: "Type-safe data layer",
          body: "Prisma and PostgreSQL keep complex relationships consistent and maintainable.",
        },
      ],
      result:
        "A secure operational backbone that supports growing teams without losing oversight.",
    },
  },
  {
    slug: "logix-plus",
    number: "03",
    title: "Logix Plus",
    category: "ERP & POS SaaS",
    summary:
      "A connected ERP and point-of-sale platform for multi-branch businesses — inventory, sales, purchasing and reporting, with AI insights and WhatsApp built in.",
    description:
      "Business owners run every branch from one system, while AI surfaces insights and WhatsApp keeps customers and staff in the loop.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "AI APIs", "WhatsApp"],
    features: [
      "Multi-tenant architecture",
      "Branch management",
      "Inventory",
      "Sales & purchasing",
      "Reports",
      "Subscriptions",
      "AI insights",
      "WhatsApp integrations",
    ],
    outcome:
      "Connected stock, sales and customer messaging into a single operating system for the business.",
    visual: "logix",
    accent: "violet",
    caseStudy: {
      role: "Full-stack development & product architecture",
      type: "Multi-tenant ERP / POS SaaS",
      challenge:
        "Growing retailers often juggle separate tools for each branch, their stock and their customer communication. Logix Plus brings all of it into one subscription product that scales from one store to many.",
      approach: [
        "Architected a multi-tenant core with branches, users and permissions per business.",
        "Built inventory, sales, purchasing and reporting modules that share one data model.",
        "Added subscription billing so businesses can self-serve plans.",
        "Integrated AI-generated insights and WhatsApp messaging for customers and teams.",
      ],
      highlights: [
        {
          title: "One system, many branches",
          body: "Stock and sales stay consistent across every location in real time.",
        },
        {
          title: "AI insights",
          body: "Plain-language summaries of what's selling, what's running low and what needs attention.",
        },
        {
          title: "WhatsApp built in",
          body: "Receipts, alerts and updates delivered where customers and staff already are.",
        },
      ],
      result:
        "An operating system for retail businesses — not just a till — ready to grow with each customer.",
    },
  },
  {
    slug: "ai-automation-system",
    number: "04",
    title: "AI Automation System",
    category: "Business automation platform",
    summary:
      "An automation layer that connects AI to everyday business tools — qualifying leads, processing data and notifying the right people automatically.",
    description:
      "AI workflows built on n8n and custom APIs take over repetitive operational work, from intake to follow-up.",
    stack: ["n8n", "OpenAI", "Claude", "Node.js", "REST APIs", "Webhooks"],
    features: [
      "AI workflows",
      "n8n orchestration",
      "API integrations",
      "Data processing",
      "Automated notifications",
      "AI assistants",
    ],
    outcome:
      "Turned hours of manual, repetitive work into workflows that run on their own — reliably.",
    visual: "automation",
    accent: "dual",
    caseStudy: {
      role: "Automation architecture & development",
      type: "AI workflow platform",
      challenge:
        "Teams were spending their time copying data between tools, triaging requests and sending the same follow-ups. The aim was to hand that work to reliable, observable automations.",
      approach: [
        "Mapped manual processes and identified where AI could make decisions safely.",
        "Orchestrated workflows in n8n connected to CRMs, databases, email and messaging.",
        "Used LLMs to classify, summarise and extract structured data from unstructured input.",
        "Added notifications and fallbacks so humans stay in control of edge cases.",
      ],
      highlights: [
        {
          title: "AI where it matters",
          body: "Models handle judgement-heavy steps; deterministic logic handles the rest.",
        },
        {
          title: "Connected tools",
          body: "CRMs, inboxes, spreadsheets and messaging apps finally talk to each other.",
        },
        {
          title: "Human in the loop",
          body: "Clear alerts and review steps whenever a workflow is unsure.",
        },
      ],
      result:
        "A growing library of automations that save time every day and scale without extra headcount.",
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
