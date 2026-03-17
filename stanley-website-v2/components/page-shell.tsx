import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export async function PageShell({
  children,
  eyebrow,
  intro,
  title,
}: {
  children: ReactNode;
  eyebrow?: string;
  intro?: string;
  title?: string;
}) {
  return (
    <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
      <SiteHeader />
      <main className="mx-auto max-w-[1240px] px-6 py-14 md:px-10 md:py-20">
        {title ? (
          <section className="mb-14 max-w-3xl">
            {eyebrow ? (
              <p className="mb-3 text-[0.82rem] font-bold uppercase tracking-[0.08em] text-[color:var(--accent-soft)]">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-4xl font-bold md:text-6xl">{title}</h1>
            {intro ? <p className="mt-5 text-[1.05rem] leading-8 text-[color:var(--muted)]">{intro}</p> : null}
          </section>
        ) : null}
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
