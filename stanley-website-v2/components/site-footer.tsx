import { Github, Linkedin, Mail, Twitter } from "lucide-react";

import { siteMeta } from "@/lib/site-data";

const footerLinks = [
  { href: `mailto:${siteMeta.email}`, label: "Email", icon: Mail },
  { href: siteMeta.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: siteMeta.github, label: "GitHub", icon: Github },
  { href: siteMeta.x, label: "X", icon: Twitter },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] py-12">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-6 md:px-10">
        <h2 className="text-2xl font-bold">{siteMeta.footerHeadline}</h2>
        <div className="flex flex-wrap gap-3">
          {footerLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                aria-label={item.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--foreground)] transition hover:border-[color:var(--accent)]"
              >
                <Icon size={18} strokeWidth={1.9} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
