"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { IconLink } from "@/components/icon-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { socialLinks } from "@/lib/social-links";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-[color:var(--line)] bg-[color:var(--background)]/94 backdrop-blur">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-base font-bold tracking-[0.01em]">
            Stanley Lin
          </Link>
          <div className="hidden items-center gap-2 lg:flex">
            {socialLinks.map((item) => (
              <IconLink key={item.label} href={item.href} icon={item.icon} label={item.label} />
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-3 text-[0.95rem] text-[color:var(--muted)] lg:flex">
          <nav className="mr-2 flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-[color:var(--foreground)]">
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <Link
            href="/contact"
            className="inline-flex min-h-10 items-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-4 text-[0.94rem] font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--accent)]"
          >
            Get in touch
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--foreground)]"
          >
            {isOpen ? <X size={18} strokeWidth={1.9} /> : <Menu size={18} strokeWidth={1.9} />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-[color:var(--line)] bg-[color:var(--background)] px-6 py-5 lg:hidden md:px-10">
          <nav className="flex flex-col gap-4 text-[0.98rem] text-[color:var(--foreground)]">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-wrap gap-3">
            {socialLinks.map((item) => (
              <IconLink key={item.label} href={item.href} icon={item.icon} label={item.label} />
            ))}
          </div>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-5 inline-flex min-h-10 items-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-4 text-[0.94rem] font-semibold text-[color:var(--foreground)]"
          >
            Get in touch
          </Link>
        </div>
      ) : null}
    </header>
  );
}
