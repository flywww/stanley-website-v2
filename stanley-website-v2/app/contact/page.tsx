import type { Metadata } from "next";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { createPageMetadata } from "@/lib/seo";
import { contactPage, siteMeta } from "@/lib/site-data";

export const metadata: Metadata = createPageMetadata({
  path: "/contact",
  title: contactPage.title,
  description: contactPage.intro,
  images: [siteMeta.defaultOgImage],
});

const contactItems = [
  { label: "Email", value: siteMeta.email, href: `mailto:${siteMeta.email}`, icon: Mail },
  { label: "LinkedIn", value: siteMeta.linkedin, href: siteMeta.linkedin, icon: Linkedin },
  { label: "GitHub", value: siteMeta.github, href: siteMeta.github, icon: Github },
  { label: "X", value: siteMeta.x, href: siteMeta.x, icon: Twitter },
];

export default function ContactPage() {
  return (
    <PageShell title={contactPage.title} intro={contactPage.intro}>
      <div className="grid gap-4 md:grid-cols-2">
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              className="rounded-[20px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6"
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface-strong)] text-[color:var(--accent-soft)]">
                  <Icon size={18} strokeWidth={1.9} />
                </span>
                <p className="text-[0.85rem] font-bold uppercase tracking-[0.08em] text-[color:var(--accent-soft)]">{item.label}</p>
              </div>
              <p className="mt-4 break-all text-xl font-semibold">{item.value}</p>
            </a>
          );
        })}
      </div>
    </PageShell>
  );
}
