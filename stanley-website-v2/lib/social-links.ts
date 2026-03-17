import { Github, Linkedin, Mail, Twitter } from "lucide-react";

import { siteMeta } from "@/lib/site-data";

export const socialLinks = [
  { href: `mailto:${siteMeta.email}`, label: "Email", icon: Mail },
  { href: siteMeta.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: siteMeta.github, label: "GitHub", icon: Github },
  { href: siteMeta.x, label: "X", icon: Twitter },
];
