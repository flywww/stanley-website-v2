import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";
import { getPublicProjects, getSiteSettings } from "@/lib/cms/queries";
import { createPageMetadata, createProjectsJsonLd } from "@/lib/seo";
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return createPageMetadata({
    site: settings,
    path: "/projects",
    title: settings.projectsPageTitle,
    description: "Selected product work across medical and software products.",
    images: [settings.defaultOgImageUrl],
  });
}

export default async function ProjectsPage() {
  const [products, settings] = await Promise.all([getPublicProjects(), getSiteSettings()]);
  const projectsJsonLd = createProjectsJsonLd(settings, products);

  return (
    <PageShell title={settings.projectsPageTitle}>
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
                sizes="(min-width: 1320px) 397px, (min-width: 1280px) calc((100vw - 128px) / 3), (min-width: 768px) calc((100vw - 104px) / 2), calc(100vw - 48px)"
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
