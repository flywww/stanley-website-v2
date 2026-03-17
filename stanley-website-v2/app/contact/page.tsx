import type { Metadata } from "next";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { getSiteSettings } from "@/lib/cms/queries";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return createPageMetadata({
    site: settings,
    path: "/contact",
    title: settings.contactPageTitle,
    description: settings.contactPageIntro,
    images: [settings.defaultOgImageUrl],
  });
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const contactItems = [
    { label: "Email", value: settings.email, href: `mailto:${settings.email}`, icon: Mail },
    { label: "LinkedIn", value: settings.linkedin, href: settings.linkedin, icon: Linkedin },
    { label: "GitHub", value: settings.github, href: settings.github, icon: Github },
    { label: "X", value: settings.x, href: settings.x, icon: Twitter },
  ];

  return (
    <PageShell title={settings.contactPageTitle} intro={settings.contactPageIntro}>
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
