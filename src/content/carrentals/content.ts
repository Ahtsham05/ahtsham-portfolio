/**
 * Copy for the /carrentals landing page. Edit freely — components only
 * handle layout and motion.
 *
 * Credibility rule for this page: no invented clients, testimonials,
 * revenue, conversion rates, booking numbers or rankings. Anything
 * illustrative is labelled "Design Concept", "Example Experience",
 * "Sample Workflow" or "Demo".
 */

export const cr = {
  brand: "Ahtsham Labs",
  niche: "Car Rental Digital Experiences",
  specialistLabel: "Car Rental Specialist",
  path: "/carrentals",

  seo: {
    title: "Car Rental Website Development | Ahtsham Labs",
    description:
      "Premium car rental websites, booking systems and AI automation built for modern rental businesses.",
    keywords: [
      "car rental website",
      "car rental web development",
      "car rental booking system",
      "luxury car rental website",
      "car rental automation",
      "car rental software",
      "AI car rental automation",
      "car rental website developer",
    ],
  },
} as const;

export const crNav = [
  { label: "Why It Works", href: "#why" },
  { label: "Services", href: "#services" },
  { label: "Features", href: "#features" },
  { label: "Examples", href: "#examples" },
  { label: "Automation", href: "#automation" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
] as const;

/** Business types this page speaks to (hero marquee). */
export const audiences = [
  "Luxury car rentals",
  "Exotic & supercar rentals",
  "Airport car rentals",
  "Chauffeur services",
  "Local rental agencies",
  "Premium vehicle rentals",
  "Fleet rental businesses",
];

export const problems = [
  {
    title: "Hard to browse vehicles",
    body: "Fleets buried in generic grids, PDFs or social posts. Customers can’t compare models, specs and prices at a glance — so they go back to search.",
  },
  {
    title: "Poor mobile experience",
    body: "Renters search on their phones, often on the move. Slow pages, tiny buttons and broken forms send them straight to a competitor.",
  },
  {
    title: "Slow booking process",
    body: "Long forms, unclear totals and “call us to confirm” steps turn ready-to-book customers into abandoned inquiries.",
  },
  {
    title: "No follow-up automation",
    body: "Inquiries wait in an inbox overnight. By the time someone replies, the customer has often booked somewhere else.",
  },
] as const;

export const journey = [
  { title: "Search", body: "Found on Google or Maps through a page built for exactly what they typed." },
  { title: "Explore vehicle", body: "Real photos, specs and pricing that make comparing cars effortless." },
  { title: "Check availability", body: "Live dates per vehicle — no “we’ll get back to you”." },
  { title: "Choose dates", body: "Pickup, return and locations in a couple of taps." },
  { title: "Book", body: "A short, mobile-first checkout with every cost shown upfront." },
  { title: "Pay", body: "Secure deposits or full payment, straight to your account." },
  { title: "Confirmation", body: "Instant confirmation by email and WhatsApp, with every detail." },
  { title: "Automated follow-up", body: "Reminders before pickup, a thank-you after, then a review request." },
] as const;

export const services = [
  {
    key: "website",
    title: "Premium Rental Website",
    body: "High-performance websites designed around your fleet, locations, services and customers.",
    points: ["Brand-led design", "Fast on every device", "Easy to update"],
  },
  {
    key: "booking",
    title: "Online Booking System",
    body: "Vehicle availability, dates, pickup and drop-off, pricing, customer details and booking workflows.",
    points: ["Availability calendar", "Pickup & drop-off", "Pricing rules"],
  },
  {
    key: "fleet",
    title: "Fleet Showcase",
    body: "Beautiful vehicle pages that sell the car before the customer ever sees it.",
    points: ["Photos", "Specifications", "Features", "Pricing", "Availability", "Booking CTA"],
  },
  {
    key: "locations",
    title: "Location Experience",
    body: "Dedicated pages for every place a customer can collect or return a car.",
    points: ["Airport locations", "City locations", "Branches", "Pickup points"],
  },
  {
    key: "payments",
    title: "Payments & Checkout",
    body: "Secure payment systems and a streamlined checkout — deposits, full payments and refunds.",
    points: ["Stripe", "Deposits", "Instant receipts"],
  },
  {
    key: "automation",
    title: "AI + Automation",
    body: "Systems that keep working after the customer leaves the page.",
    points: [
      "Lead follow-up",
      "Booking confirmations",
      "Customer messages",
      "Abandoned inquiries",
      "WhatsApp",
      "Email",
      "CRM updates",
      "Review requests",
    ],
  },
] as const;

export const conversionStages = [
  { stage: "Visitor", body: "Lands on a fast page that matches what they searched for." },
  { stage: "Vehicle", body: "Finds the right car with clear photos, specs and prices." },
  { stage: "Interest", body: "Checks availability or asks a question — answered instantly." },
  { stage: "Booking", body: "Books and pays in a short, mobile-friendly checkout." },
  { stage: "Customer", body: "Gets confirmations, reminders and a reason to come back." },
] as const;

/** Sample workflow — illustrates what can be built, not a live system. */
export const automationSteps = [
  { title: "Customer submits inquiry", node: "website", log: "inquiry.received · “SUV, Fri → Mon, airport pickup”" },
  { title: "AI understands the request", node: "ai", log: "intent: rental · class: luxury SUV · 3 days" },
  { title: "Checks vehicle requirements", node: "ai", log: "seats ≥ 5 · luggage: large · location: airport" },
  { title: "Sends available options", node: "lead", log: "3 vehicles matched · quote prepared" },
  { title: "Updates CRM", node: "crm", log: "contact created · stage: quoted" },
  { title: "Sends WhatsApp message", node: "whatsapp", log: "options + booking link delivered" },
  { title: "Customer books", node: "booking", log: "booking confirmed · deposit paid" },
  { title: "Confirmation sent automatically", node: "email", log: "confirmation + pickup details emailed" },
  { title: "After rental: review request", node: "review", log: "thank-you + review link scheduled" },
] as const;

export const whatsappFeatures = [
  { title: "Instant inquiry responses", body: "Reply in seconds, day or night." },
  { title: "Booking confirmations", body: "Every detail, where customers actually read it." },
  { title: "Availability messages", body: "Share live options and a booking link." },
  { title: "Reminder messages", body: "Pickup time, location and documents to bring." },
  { title: "Follow-ups", body: "Gently re-engage quotes that went quiet." },
  { title: "Review requests", body: "Ask at the right moment, after a great rental." },
] as const;

export const featureGroups = [
  {
    title: "Fleet & booking",
    items: [
      { name: "Fleet management", body: "Add, edit and retire vehicles without a developer." },
      { name: "Vehicle detail pages", body: "Photos, specs, features and pricing per car." },
      { name: "Availability", body: "Per-vehicle calendars that prevent double bookings." },
      { name: "Online booking", body: "Dates, locations, extras and customer details." },
      { name: "Payment integration", body: "Deposits, full payments and receipts." },
      { name: "Customer accounts", body: "Bookings, documents and repeat rentals in one place." },
    ],
  },
  {
    title: "Locations & search",
    items: [
      { name: "Location pages", body: "A page for every airport, city and pickup point." },
      { name: "Multi-location support", body: "Different fleets, hours and prices per branch." },
      { name: "SEO", body: "Clean structure, fast pages and local search markup." },
    ],
  },
  {
    title: "AI & automation",
    items: [
      { name: "WhatsApp", body: "Confirmations, reminders and replies on WhatsApp." },
      { name: "CRM integration", body: "Every lead and booking synced automatically." },
      { name: "AI assistant", body: "Answers questions and suggests the right car." },
      { name: "Automated follow-ups", body: "Quotes, reminders and review requests on autopilot." },
    ],
  },
  {
    title: "Growth",
    items: [
      { name: "Analytics", body: "See which cars, pages and channels drive bookings." },
      { name: "Mobile-first design", body: "Designed for the phone first, then scaled up." },
    ],
  },
] as const;

/** Example local searches — illustrative, no ranking promises. */
export const seoExamples = [
  { query: "car rental in new york", title: "Car Rental in New York — Book Online", path: "/locations/new-york", body: "Compare available cars, see pickup points across Manhattan and book in minutes." },
  { query: "luxury car rental dubai", title: "Luxury Car Rental in Dubai", path: "/luxury-car-rental-dubai", body: "Mercedes, Range Rover and more — delivered to your hotel or the airport." },
  { query: "airport car rental", title: "Airport Car Rental — Arrivals Pickup", path: "/locations/airport", body: "Meet-and-greet at arrivals. Check live availability for your flight dates." },
  { query: "exotic car rental", title: "Exotic Car Rental — Supercars & Sports Cars", path: "/exotic-car-rental", body: "Lamborghini, Porsche and more, with transparent deposits and insurance." },
  { query: "chauffeur service", title: "Chauffeur Service — Executive Sedans", path: "/chauffeur-service", body: "Professional drivers for airport transfers, events and business travel." },
] as const;

export const concepts = [
  {
    key: "luxury",
    title: "Luxury Rentals",
    style: "Dark cinematic design",
    body: "Editorial typography, studio-lit vehicles and a concierge-style booking flow for premium fleets.",
  },
  {
    key: "local",
    title: "Local Rental",
    style: "Clean conversion-focused design",
    body: "Booking widget above the fold, clear prices and location info — built to get bookings fast.",
  },
  {
    key: "exotic",
    title: "Exotic Cars",
    style: "High-end automotive experience",
    body: "Bold motion, immersive vehicle pages and a deposit-ready checkout for supercar fleets.",
  },
] as const;

export const processSteps = [
  { title: "Discover", body: "Understand your fleet, locations, customers and business model." },
  { title: "Strategize", body: "Plan the website structure, booking flow and conversion journey." },
  { title: "Design", body: "Create the visual identity and user experience." },
  { title: "Build", body: "Develop the website, booking system and integrations." },
  { title: "Automate", body: "Connect AI, WhatsApp, CRM and follow-up workflows." },
  { title: "Launch", body: "Optimize performance, SEO and conversion — then go live." },
] as const;

export const principles = [
  { title: "Business-focused", body: "Every page starts with how your rental business makes money." },
  { title: "Conversion-focused", body: "Each interaction is designed to move a visitor closer to booking." },
  { title: "Automation-ready", body: "Built to connect with WhatsApp, CRM, email and AI from day one." },
  { title: "Built to scale", body: "Add vehicles, branches and features without starting over." },
] as const;

export const techGroups = [
  { title: "Frontend", items: [["react", "React"], ["next", "Next.js"], ["typescript", "TypeScript"]] },
  { title: "Backend", items: [["node", "Node.js"], ["postgres", "PostgreSQL"], ["supabase", "Supabase"]] },
  { title: "Payments", items: [["stripe", "Stripe"]] },
  { title: "Automation", items: [["n8n", "n8n"], ["openai", "AI"], ["whatsapp", "WhatsApp"], ["database", "CRM"]] },
] as const;

export const faqs = [
  {
    q: "Do you only work with large rental companies?",
    a: "No. I work with single-location agencies, chauffeur services and multi-branch fleets. The scope is shaped around your size and goals.",
  },
  {
    q: "Can you work with the booking software I already use?",
    a: "Often, yes. If your current system has an API or embeddable widget, I can design around it. If it’s holding you back, I can build a custom booking system instead.",
  },
  {
    q: "Can I update cars, prices and availability myself?",
    a: "Yes. You get a simple admin to manage vehicles, rates, photos and availability — no developer needed for day-to-day changes.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on scope — a focused website is much quicker than a full booking and automation system. After a short discovery call you’ll get a clear plan and timeline.",
  },
  {
    q: "Is everything on this page from real clients?",
    a: "No — and that’s intentional. The vehicles, workflows and designs here are demos and concepts that show what I can build for your business.",
  },
] as const;

export const contactOptions = {
  needs: ["Website", "Booking System", "Fleet Website", "AI Automation", "Complete System"],
  fleetSizes: ["1–10", "11–25", "26–50", "51–100", "100+"],
  budgets: ["Under $3k", "$3k – $8k", "$8k – $15k", "$15k+", "Not sure yet"],
} as const;
