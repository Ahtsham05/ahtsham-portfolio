import { ButtonLink } from "@/components/ui/Button";
import { AppReady } from "@/components/layout/AppReady";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <AppReady />
      <Nav />
      <div className="relative overflow-x-clip">
        <main id="main">
          <section className="container-x flex min-h-[80vh] flex-col items-start justify-center pt-32">
            <p className="eyebrow">
              <span className="text-emerald">404</span> — Not found
            </p>
            <h1 className="display mt-6 text-[clamp(3rem,8vw,7rem)]">
              This page is <span className="serif-em text-emerald-soft">still an idea.</span>
            </h1>
            <p className="lede mt-6 max-w-md">The page you’re looking for doesn’t exist — but plenty of other things do.</p>
            <div className="mt-10">
              <ButtonLink href="/">Back to home</ButtonLink>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
