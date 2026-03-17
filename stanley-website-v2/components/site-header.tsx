import { SiteHeaderClient } from "@/components/site-header-client";
import { getSiteSettings } from "@/lib/cms/queries";
import { getSocialLinks } from "@/lib/social-links";

export async function SiteHeader() {
  const settings = await getSiteSettings();

  return <SiteHeaderClient name={settings.name} socialLinks={getSocialLinks(settings)} />;
}
