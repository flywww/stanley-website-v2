import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { ProjectGallery } from "@/components/project-gallery";
import { getProduct, getRelatedProjects, products } from "@/lib/site-data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const mergedTags = Array.from(new Set([...product.roleTags, ...product.capabilities]));
  const relatedProjects = getRelatedProjects(product.related);

  return (
    <PageShell>
      <div className="space-y-10">
        <div className="space-y-5">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold md:text-6xl">{product.name}</h1>
          </div>
          <ProjectGallery images={product.gallery} productName={product.name} />
          <div className="flex flex-wrap gap-2">
            {mergedTags.map((tag) => (
              <span
                key={`${product.slug}-merged-${tag}`}
                className="rounded-full border border-[color:var(--line)] px-3 py-1 text-[0.82rem] font-medium text-[color:var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="max-w-4xl text-[1.05rem] leading-8 text-[color:var(--muted)]">{product.brief}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-3">
        <section className="rounded-[20px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6">
          <h2 className="text-[0.85rem] font-bold uppercase tracking-[0.08em] text-[color:var(--accent-soft)]">
            Problem
          </h2>
          <ul className="mt-4 space-y-3 text-[color:var(--muted)]">
            {product.problem.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--accent-soft)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-[20px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6">
          <h2 className="text-[0.85rem] font-bold uppercase tracking-[0.08em] text-[color:var(--accent-soft)]">
            Solution / what was built
          </h2>
          <ul className="mt-4 space-y-3 text-[color:var(--muted)]">
            {product.solution.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--accent-soft)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-[20px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6">
          <h2 className="text-[0.85rem] font-bold uppercase tracking-[0.08em] text-[color:var(--accent-soft)]">
            Outcome / proof
          </h2>
          <ul className="mt-4 space-y-3 text-[color:var(--muted)]">
            {product.outcome.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--accent-soft)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
        <Link className="text-[0.95rem] font-semibold text-[color:var(--accent)]" href="/projects">
          Back to all projects
        </Link>
        {relatedProjects.length > 0 ? (
          <div className="justify-self-start md:justify-self-end">
            <div className="flex flex-wrap justify-start gap-x-4 gap-y-2 md:justify-end">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.slug}
                  href={`/projects/${relatedProject.slug}`}
                  className="text-[0.95rem] font-medium text-[color:var(--muted)] transition hover:text-[color:var(--accent)]"
                >
                  {relatedProject.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </PageShell>
  );
}
