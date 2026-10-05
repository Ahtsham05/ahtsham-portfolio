# Ahtsham Younas — Portfolio

Personal portfolio for a full-stack SaaS developer & AI automation specialist.
Next.js 16 · TypeScript · Tailwind CSS v4 · Motion · React Three Fiber · Lenis.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Make it yours

| What | Where |
| --- | --- |
| Name, email, socials, hero stats, site URL | `src/content/site.ts` |
| Case studies (cards + `/work/[slug]` pages) | `src/content/projects.ts` |
| Services, process, tech stack, principles, marquee | `src/content/content.ts` |
| Testimonials (**placeholders — replace or hide via `showTestimonials`**) | `src/content/testimonials.ts` |
| Colors, type scale, utilities | `src/app/globals.css` |

## Contact form

`/api/contact` sends through [Resend](https://resend.com) when `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set
(see `.env.example`). Without them it returns `503` and the form opens the visitor's email app with the message
pre-filled — it never reports a send that didn't happen.

## Structure

```
src/app            routes, metadata, sitemap, robots, OG image, API
src/components
  layout/          Loader, Nav, Footer, Cursor, StageRail, SmoothScroll
  sections/        one file per homepage section
  visuals/         SVG product/service compositions, isometric layer stack
  three/           hero AI core (lazy-loaded, client-only)
  ui/              Reveal, Magnetic, Button, TiltCard, BrandIcon, Monogram
src/content        all copy and data
```

## Notes

- The hero 3D scene mounts after the intro and an idle frame, pauses off-screen, and is simplified on phones.
- `prefers-reduced-motion` disables smooth scroll, the pinned process scroll, auto-cycling and the 3D animation.
- The intro loader plays once per browser session.
