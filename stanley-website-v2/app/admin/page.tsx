import Link from "next/link";

import { getCmsEnvironmentStatus, getExperienceItems, getMetrics, getProjects, getSkills } from "@/lib/cms/queries";

export default async function AdminDashboardPage() {
  const [metrics, skills, experienceItems, projects, status] = await Promise.all([
    getMetrics(),
    getSkills(),
    getExperienceItems(),
    getProjects(),
    getCmsEnvironmentStatus(),
  ]);

  const cards = [
    { label: "Metrics", value: metrics.length, href: "/admin/homepage" },
    { label: "Skills", value: skills.length, href: "/admin/homepage" },
    { label: "Experience items", value: experienceItems.length, href: "/admin/homepage" },
    { label: "Products", value: projects.length, href: "/admin/products" },
    { label: "Featured products", value: projects.filter((project) => project.featured).length, href: "/admin/products" },
  ];
  const environmentItems = [
    { label: "Database", ok: status.hasDatabase },
    { label: "Auth", ok: status.hasAuth },
    { label: "Blob upload", ok: status.hasBlob },
    { label: "Allowed admin login", ok: status.hasAdminLogin },
  ];

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-[0.08em] text-[color:var(--accent-soft)]">Overview</p>
        <h2 className="text-3xl font-bold">CMS dashboard</h2>
        <p className="text-[color:var(--muted)]">Manage the site content, uploads, and project catalog from one place.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="rounded-[20px] border border-[color:var(--line)] bg-[color:var(--surface)] p-5">
            <p className="text-sm font-medium text-[color:var(--muted)]">{card.label}</p>
            <p className="mt-2 text-3xl font-bold">{card.value}</p>
          </Link>
        ))}
      </section>

      <section className="rounded-[20px] border border-[color:var(--line)] bg-[color:var(--surface)] p-6">
        <h3 className="text-lg font-bold">Environment status</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {environmentItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-[14px] border border-[color:var(--line)] px-4 py-3">
              <span>{item.label}</span>
              <span className={item.ok ? "text-emerald-600 dark:text-emerald-300" : "text-amber-600 dark:text-amber-300"}>
                {item.ok ? "Ready" : "Missing"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
