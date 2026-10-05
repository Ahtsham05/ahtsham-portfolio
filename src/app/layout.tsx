import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { site } from "@/content/site";
import { Cursor } from "@/components/layout/Cursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Full-Stack Developer",
    "SaaS Developer",
    "AI Automation Specialist",
    "Next.js Developer",
    "React Developer",
    "n8n Automation",
    "Multi-tenant SaaS",
    "Stripe Integration",
    "Web Development",
    site.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070807",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        {/* Skip each intro (portfolio, car rentals) on repeat visits within a session, before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement.dataset;if(sessionStorage.getItem('ay-intro'))d.loaded='1';if(sessionStorage.getItem('al-cr-intro'))d.crLoaded='1'}catch(e){}`,
          }}
        />
      </head>
      {/* Browser extensions (e.g. ones that add cz-shortcut-listen) write attributes onto <body> before hydration */}
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll />
        {children}
        <Cursor />
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
          <div className="grain" />
        </div>
      </body>
    </html>
  );
}
