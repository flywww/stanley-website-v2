import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";
import { products } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
    },
    ...products.map((product) => ({
      url: absoluteUrl(`/projects/${product.slug}`),
      lastModified,
    })),
  ];
}
