import Image from "next/image";
import Link from "next/link";
import { Briefcase, Layers3, MonitorSmartphone, Server } from "lucide-react";

import { CountUpValue } from "@/components/count-up-value";
import { PageShell } from "@/components/page-shell";
import { createHomeJsonLd } from "@/lib/seo";
import { experienceHighlights, keySkills, metrics, products, siteMeta } from "@/lib/site-data";

const featuredProducts = products.filter((product) => product.featured);
const skillIcons = {
  "Front-end development": MonitorSmartphone,
  "Back-end development": Server,
  "Product strategy": Layers3,
  "Product planning": Briefcase,
} as const;

function HeroSection() {
  return (
    <section className="grid gap-10 pb-16 pt-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-18 lg:pb-20 lg:pt-10">
      <div className="w-full max-w-[220px]">
        <div className="relative aspect-[0.88] overflow-hidden rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface-strong)]">
          <Image src={siteMeta.avatar} alt={siteMeta.name} fill sizes="220px" className="object-cover object-center" priority />
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-xl font-semibold leading-tight">{siteMeta.name}</p>
          <p className="text-[0.95rem] leading-6 text-[color:var(--muted)]">林盈志</p>
        </div>
      </div>
      <div className="max-w-[740px]">
        <h1 className="text-[clamp(3rem,6vw,5.2rem)] font-bold leading-[0.99]">{siteMeta.headline}</h1>
        <p className="mt-6 max-w-[58ch] text-[1.05rem] leading-8 text-[color:var(--muted)]">{siteMeta.intro}</p>
        <div className="mt-9 flex flex-wrap gap-3.5">
          <Link href="/projects" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[color:var(--accent)] px-5 text-[0.95rem] font-semibold text-white">
            View Projects
          </Link>
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface)] px-5 text-[0.95rem] font-semibold">
            Contact Stanley
          </Link>
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] mb-28 w-screen">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="grid gap-0 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`px-4 py-6 text-center md:px-8 md:py-8 ${
                index === 0 ? "" : "border-t border-[color:var(--line)] md:border-l md:border-t-0"
              }`}
            >
              <p className="text-[2.6rem] font-bold leading-none text-[color:var(--accent)]">
                <CountUpValue value={metric.value} />
              </p>
              <div className="mx-auto mt-4 h-px w-full max-w-[220px] bg-[color:var(--line)]" />
              <p className="mt-4 text-[0.92rem] leading-7 text-[color:var(--muted)]">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section className="pb-28">
      <div className="mb-10">
        <p className="text-[0.82rem] font-bold uppercase tracking-[0.08em] text-[color:var(--accent-soft)]">Key skills</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {keySkills.map((skill) => {
          const Icon = skillIcons[skill.title as keyof typeof skillIcons];
          return (
            <div key={skill.title} className="rounded-[20px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--surface-strong)] text-[color:var(--accent-soft)]">
                  <Icon size={20} strokeWidth={1.9} />
                </span>
                <h3 className="text-[0.98rem] font-semibold text-[color:var(--foreground)]">{skill.title}</h3>
              </div>
              <p className="mt-4 text-[0.95rem] leading-7 text-[color:var(--muted)]">{skill.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function HomePage() {
  const homeJsonLd = createHomeJsonLd();

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd),
        }}
      />
      <HeroSection />

      <MetricsSection />

      <SkillsSection />

      <section id="experience" className="pb-28">
        <div className="mx-auto max-w-5xl">
          <p className="text-[0.82rem] font-bold uppercase tracking-[0.08em] text-[color:var(--accent-soft)]">
            Experience
          </p>
          <h2 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.02]">Experience highlights</h2>
        </div>
        <div className="mx-auto mt-10 max-w-5xl space-y-10">
          {experienceHighlights.map((item) => (
            <div key={item.company} className="grid gap-5 md:grid-cols-[minmax(0,0.95fr)_42px_minmax(0,1.05fr)] md:items-start">
              <div className="text-left md:text-right">
                <h3 className="text-2xl font-bold">{item.company}</h3>
                <p className="mt-1 text-[0.9rem] font-medium text-[color:var(--muted)]">{item.time}</p>
              </div>
              <div className="relative hidden h-full md:block">
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[color:var(--line)]" />
                <span className="absolute left-1/2 top-2 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[color:var(--background)] bg-[color:var(--foreground)]" />
              </div>
              <div className="rounded-[20px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6">
                <p className="text-[1.35rem] font-semibold">{item.role}</p>
                <ul className="mt-4 space-y-3 text-[color:var(--muted)]">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--accent-soft)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-28">
        <div className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <p className="text-[0.82rem] font-bold uppercase tracking-[0.08em] text-[color:var(--accent-soft)]">
              Featured Products
            </p>
            <h2 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.02]">Selected products</h2>
          </div>
          <Link href="/projects" className="hidden text-[0.95rem] font-semibold text-[color:var(--accent)] md:block">
            All products
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/projects/${product.slug}`}
              className="group overflow-hidden rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface)] transition hover:border-[color:var(--accent-soft)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={product.featuredImage ?? product.gridImage}
                  alt={product.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="space-y-3 p-7">
                <h3 className="text-[1.6rem] font-bold">{product.name}</h3>
                {product.contributionTags.length > 0 ? (
                  <p className="text-[0.95rem] font-medium leading-7 text-[color:var(--accent-soft)]">
                    {product.contributionTags.join(" · ")}
                  </p>
                ) : null}
                <p className="text-[1rem] leading-7 text-[color:var(--muted)]">{product.brief}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {product.roleTags.map((tag) => (
                    <span key={`${product.slug}-role-${tag}`} className="rounded-full border border-[color:var(--line)] px-3 py-1 text-[0.82rem] font-medium text-[color:var(--muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
