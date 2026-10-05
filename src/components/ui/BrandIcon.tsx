import {
  siAnthropic,
  siAuth0,
  siClerk,
  siExpress,
  siGithub,
  siGmail,
  siGooglegemini,
  siHubspot,
  siMongodb,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siReact,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siUpwork,
  siVercel,
  siWhatsapp,
} from "simple-icons";

/**
 * Monochrome brand marks. Paths come from simple-icons (24×24 viewBox);
 * marks unavailable there are drawn as neutral glyphs so no logo is misrepresented.
 */
const paths: Record<string, string> = {
  react: siReact.path,
  next: siNextdotjs.path,
  typescript: siTypescript.path,
  node: siNodedotjs.path,
  express: siExpress.path,
  mongodb: siMongodb.path,
  postgres: siPostgresql.path,
  supabase: siSupabase.path,
  prisma: siPrisma.path,
  auth0: siAuth0.path,
  clerk: siClerk.path,
  stripe: siStripe.path,
  n8n: siN8n.path,
  claude: siAnthropic.path,
  gemini: siGooglegemini.path,
  vercel: siVercel.path,
  whatsapp: siWhatsapp.path,
  crm: siHubspot.path,
  email: siGmail.path,
  tailwind: siTailwindcss.path,
  github: siGithub.path,
  upwork: siUpwork.path,
  // Neutral glyphs
  openai:
    "M12 2.5a4.6 4.6 0 0 1 4.37 3.17 4.6 4.6 0 0 1 3.9 6.83 4.6 4.6 0 0 1-3.9 6.83A4.6 4.6 0 0 1 12 21.5a4.6 4.6 0 0 1-4.37-3.17 4.6 4.6 0 0 1-3.9-6.83 4.6 4.6 0 0 1 3.9-6.83A4.6 4.6 0 0 1 12 2.5Zm0 1.8a2.8 2.8 0 0 0-2.8 2.8v.4l-3.1 1.8a2.8 2.8 0 0 0 0 4.85l3.1 1.8v.4a2.8 2.8 0 0 0 5.6 0v-.4l3.1-1.8a2.8 2.8 0 0 0 0-4.85l-3.1-1.8v-.4A2.8 2.8 0 0 0 12 4.3Zm0 5.2 2.2 1.25v2.5L12 14.5l-2.2-1.25v-2.5L12 9.5Z",
  aws: "M3 15.2c3.9 2.6 9.9 3.5 15.6 1.2l.9 1.4C13 20.7 6.2 19.6 2 16.6l1-1.4Zm16.7-.9 2.3-.3-.5 2.4-1.8-2.1ZM6.5 5h3l2.5 7.6L14.5 5h3l-4 10h-3l-4-10Z",
  database:
    "M12 3c4.4 0 8 1.3 8 3v12c0 1.7-3.6 3-8 3s-8-1.3-8-3V6c0-1.7 3.6-3 8-3Zm6 9.3c-1.5.8-3.6 1.2-6 1.2s-4.5-.4-6-1.2V15c0 .6 2.3 1.5 6 1.5s6-.9 6-1.5v-2.7Zm0-4.5c-1.5.8-3.6 1.2-6 1.2s-4.5-.4-6-1.2v2.7c0 .6 2.3 1.5 6 1.5s6-.9 6-1.5V7.8ZM12 5C8.3 5 6 5.9 6 6.5S8.3 8 12 8s6-.9 6-1.5S15.7 5 12 5Z",
  api: "M8.6 6.4 3 12l5.6 5.6 1.4-1.4L5.8 12 10 7.8 8.6 6.4Zm6.8 0L14 7.8 18.2 12 14 16.2l1.4 1.4L21 12l-5.6-5.6Z",
  webhook:
    "M12 3a4 4 0 0 1 3.4 6.1l2.3 4a4 4 0 1 1-1.7 1l-3.3-5.7.8-.5A2 2 0 1 0 10 6.4L8.2 5.5A4 4 0 0 1 12 3ZM6.5 11.2l1.7 1-2.3 4a2 2 0 1 0 3.1 1.8h6.6v2H9.4a4 4 0 1 1-5.2-4.8l2.3-4Z",
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4v-11Z",
};

export type BrandKey = keyof typeof paths;

type Props = {
  name: string;
  className?: string;
  title?: string;
};

export function BrandIcon({ name, className = "size-4", title }: Props) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={d} />
    </svg>
  );
}

/** Raw 24×24 path for embedding inside other SVGs. */
export const brandPath = (name: string) => paths[name];
