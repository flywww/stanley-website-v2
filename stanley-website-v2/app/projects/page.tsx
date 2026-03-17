import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { createPageMetadata, createProjectsJsonLd } from "@/lib/seo";
import { products, projectsPage } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  path: "/projects",
  title: "Projects",
  description: "Selected product work across medical and software products.",
  images: ["/images/projects/medistation/platform.jpg"],
});

export default function ProjectsPage() {
  const projectsJsonLd = createProjectsJsonLd(products);

  return (
    <PageShell title={projectsPage.title}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsJsonLd),
        }}
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/projects/${product.slug}`}
            className="group overflow-hidden rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface)] transition hover:border-[color:var(--accent-soft)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={product.gridImage}
                alt={product.name}
                fill
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="space-y-3 p-7">
              <h2 className="text-[1.6rem] font-bold">{product.name}</h2>
              {product.contributionTags.length > 0 ? (
                <p className="text-[0.95rem] font-medium leading-7 text-[color:var(--accent-soft)]">
                  {product.contributionTags.join(" · ")}
                </p>
              ) : null}
              <p className="text-[1rem] leading-7 text-[color:var(--muted)]">{product.brief}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {product.roleTags.map((tag) => (
                  <span key={`${product.slug}-role-${tag}`} className="rounded-full border border-[color:var(--line)] px-3 py-1 text-[0.82rem] font-medium text-[color:var(--muted)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
