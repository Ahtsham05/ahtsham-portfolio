export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Optional path to an avatar in /public. Initials are shown when omitted. */
  avatar?: string;
};

/**
 * PLACEHOLDERS — replace with real client testimonials before publishing.
 * (Or set `showTestimonials: false` in content/site.ts to hide the section.)
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Your client's words go here — a short, specific sentence about the problem you solved and how working together felt.",
    name: "Client Name",
    role: "Founder · Company",
  },
  {
    quote:
      "A second testimonial goes here. The best ones mention a concrete result, the speed of delivery, or the quality of communication.",
    name: "Client Name",
    role: "Head of Product · Company",
  },
  {
    quote:
      "A third testimonial goes here. Keep each one under forty words so it reads beautifully at this size.",
    name: "Client Name",
    role: "Operations Lead · Company",
  },
];
