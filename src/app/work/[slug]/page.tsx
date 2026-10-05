import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { ProjectVisual } from "@/components/visuals/ProjectVisuals";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title} — ${project.category}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title, description: project.summary, url: `${site.url}/work/${project.slug}`, type: "article" },
    twitter: { card: "summary_large_image", title, description: project.summary },
  };
}

export default async function CaseStudy(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const cs = project.caseStudy;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${site.url}/work/${project.slug}`,
    creator: { "@type": "Person", name: site.name, url: site.url },
    keywords: project.stack.join(", "),
  };

  return (
    <article className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80vh]">
        <div className="absolute -top-[30%] left-1/2 h-full w-[120vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgb(62_230_160/0.12),transparent_65%)]" />
        <div className="bg-grid mask-radial absolute inset-0 opacity-50" />
      </div>

      <header className="container-x pt-32 md:pt-44">
        <Reveal y={10}>
          <Link href="/#work" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <ArrowLeft className="size-4 transition-transform duration-500 group-hover:-translate-x-1" aria-hidden />
            All work
          </Link>
        </Reveal>
        <Reveal y={10} delay={0.05}>
          <p className="eyebrow mt-12">
            <span className="text-emerald">{project.number}</span> — {project.category}
          </p>
        </Reveal>
        <RevealLines
          as="h1"
          className="display mt-6 text-[clamp(3rem,9vw,8rem)]"
          lines={[project.title]}
        />
        <div className="mt-10 grid gap-10 border-t border-line pt-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-xl leading-relaxed text-fg/90 md:text-2xl md:leading-relaxed">{project.summary}</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <dl className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim">Role</dt>
                <dd className="mt-2 text-fg/90">{cs.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim">Type</dt>
                <dd className="mt-2 text-fg/90">{cs.type}</dd>
              </div>
              <div className="col-span-2">
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim">Stack</dt>
                <dd className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((t) => (
                    <span key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6875rem] text-muted">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </header>

      <Reveal className="container-x mt-16 md:mt-24" y={40}>
        <div className="group relative aspect-[16/11] overflow-hidden rounded-[22px] border border-line bg-ink-2 md:aspect-[16/9] md:rounded-[32px]">
          <ProjectVisual kind={project.visual} />
        </div>
        <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-dim">
          Abstract product visual — interface details simplified
        </p>
      </Reveal>

      <section className="container-x section-y grid gap-14 lg:grid-cols-12" aria-labelledby="challenge">
        <div className="lg:col-span-4">
          <Reveal>
            <h2 id="challenge" className="eyebrow">
              <span className="text-emerald">01</span> — The challenge
            </h2>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-8">
          <p className="text-2xl leading-snug tracking-[-0.02em] text-fg md:text-[2.25rem] md:leading-[1.2]">{cs.challenge}</p>
        </Reveal>
      </section>

      <section className="container-x grid gap-14 border-t border-line pt-20 lg:grid-cols-12" aria-labelledby="approach">
        <div className="lg:col-span-4">
          <Reveal>
            <h2 id="approach" className="eyebrow">
              <span className="text-emerald">02</span> — The approach
            </h2>
          </Reveal>
        </div>
        <ol className="space-y-0 lg:col-span-8">
          {cs.approach.map((a, i) => (
            <Reveal as="li" key={i} delay={i * 0.05} className="flex gap-6 border-b border-line py-6 first:pt-0">
              <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-lg leading-relaxed text-fg/90">{a}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-x section-y" aria-labelledby="built">
        <Reveal>
          <h2 id="built" className="eyebrow">
            <span className="text-emerald">03</span> — What I built
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {cs.highlights.map((h, i) => (
            <Reveal as="li" key={h.title} delay={i * 0.06} className="surface rounded-[22px] p-7 md:p-8">
              <p className="font-mono text-[0.6875rem] text-emerald">0{i + 1}</p>
              <h3 className="mt-8 text-2xl font-medium tracking-[-0.03em]">{h.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{h.body}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-12">
          <ul className="flex flex-wrap gap-2" aria-label="Features">
            {project.features.map((f) => (
              <li key={f} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-muted">
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="container-x pb-10" aria-labelledby="result">
        <div className="relative overflow-hidden rounded-[28px] border border-line p-8 md:p-16">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_0%_100%,rgb(62_230_160/0.14),transparent_55%),radial-gradient(ellipse_at_100%_0%,rgb(143_107_255/0.12),transparent_55%)]" />
          <Reveal>
            <h2 id="result" className="eyebrow">
              <span className="text-emerald">04</span> — The result
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-8 max-w-4xl text-3xl leading-tight tracking-[-0.03em] md:text-5xl">
              <span className="serif-em text-emerald-soft">“</span>
              {cs.result}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/#contact">Start a similar project</ButtonLink>
          </Reveal>
        </div>
      </section>

      <nav aria-label="Next project" className="container-x section-y">
        <Link
          href={`/work/${next.slug}`}
          data-cursor="project"
          data-cursor-label="Next project"
          className="group flex flex-col gap-6 border-t border-line pt-10 md:flex-row md:items-end md:justify-between"
        >
          <span>
            <span className="eyebrow">Next project</span>
            <span className="mt-4 block text-[clamp(2.5rem,7vw,6rem)] font-medium leading-none tracking-[-0.045em] transition-colors duration-500 group-hover:text-emerald-soft">
              {next.title}
            </span>
            <span className="mt-3 block text-muted">{next.category}</span>
          </span>
          <span className="grid size-16 shrink-0 place-items-center rounded-full border border-line-2 transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:bg-fg group-hover:text-ink">
            <ArrowUpRight className="size-5" aria-hidden />
          </span>
        </Link>
      </nav>
    </article>
  );
}
