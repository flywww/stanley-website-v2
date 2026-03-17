import type { CmsSiteSettings } from "@/lib/cms/types";

export type SocialIconName = "email" | "linkedin" | "github" | "x";

export function getSocialLinks(settings: Pick<CmsSiteSettings, "email" | "linkedin" | "github" | "x">) {
  return [
    { href: `mailto:${settings.email}`, label: "Email", iconName: "email" as const },
    { href: settings.linkedin, label: "LinkedIn", iconName: "linkedin" as const },
    { href: settings.github, label: "GitHub", iconName: "github" as const },
    { href: settings.x, label: "X", iconName: "x" as const },
  ];
}
