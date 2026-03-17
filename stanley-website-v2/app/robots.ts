import type { MetadataRoute } from "next";

import { getSiteSettings } from "@/lib/cms/queries";
import { createRobotsConfig } from "@/lib/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();

  return createRobotsConfig(settings.siteUrl);
}
