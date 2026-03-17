import { IconLink } from "@/components/icon-link";
import { socialLinks } from "@/lib/social-links";
import { siteMeta } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] py-12">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-6 md:px-10">
        <h2 className="text-2xl font-bold">{siteMeta.footerHeadline}</h2>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((item) => (
            <IconLink key={item.label} href={item.href} icon={item.icon} label={item.label} />
          ))}
        </div>
      </div>
    </footer>
  );
}
