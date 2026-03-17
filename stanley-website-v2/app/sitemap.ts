import type { MetadataRoute } from "next";

import { getProjects, getSiteSettings } from "@/lib/cms/queries";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, products] = await Promise.all([getSiteSettings(), getProjects()]);
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl(settings.siteUrl, "/"),
      lastModified,
    },
    {
      url: absoluteUrl(settings.siteUrl, "/projects"),
      lastModified,
    },
    {
      url: absoluteUrl(settings.siteUrl, "/contact"),
      lastModified,
    },
    ...products.map((product) => ({
      url: absoluteUrl(settings.siteUrl, `/projects/${product.slug}`),
      lastModified,
    })),
  ];
}
