import Link from "next/link";

import { requireAdmin, signOutAction } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/homepage", label: "Homepage" },
  { href: "/admin/products", label: "Products" },
];

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireAdmin("/admin");

  return (
    <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
      <div className="border-b border-[color:var(--line)] bg-[color:var(--background)]/94 backdrop-blur">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-6 py-5 md:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[color:var(--accent-soft)]">CMS</p>
            <h1 className="text-xl font-bold">Stanley Website Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm text-[color:var(--muted)]">{session.user.login}</p>
            <form action={signOutAction}>
              <button className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-semibold" type="submit">
                Sign out
              </button>
            </form>
          </div>
        </div>
        <nav className="mx-auto flex max-w-[1240px] gap-4 overflow-x-auto px-6 pb-4 md:px-10">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-semibold">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <main className="mx-auto max-w-[1240px] px-6 py-10 md:px-10">{children}</main>
    </div>
  );
}
