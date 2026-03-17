import { Github, Linkedin, Mail, Twitter } from "lucide-react";

import { IconLink } from "@/components/icon-link";
import { getSiteSettings } from "@/lib/cms/queries";
import { getSocialLinks } from "@/lib/social-links";

export async function SiteFooter() {
  const settings = await getSiteSettings();
  const socialLinks = getSocialLinks(settings);
  const socialIcons = {
    email: Mail,
    linkedin: Linkedin,
    github: Github,
    x: Twitter,
  } as const;

  return (
    <footer className="border-t border-[color:var(--line)] py-12">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-6 md:px-10">
        <h2 className="text-2xl font-bold">{settings.footerHeadline}</h2>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((item) => (
            <IconLink key={item.label} href={item.href} icon={socialIcons[item.iconName]} label={item.label} />
          ))}
        </div>
      </div>
    </footer>
  );
}
