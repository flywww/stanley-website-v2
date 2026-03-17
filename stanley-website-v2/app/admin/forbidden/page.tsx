import Link from "next/link";

export default function AdminForbiddenPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl items-center px-6">
      <div className="space-y-4 rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface)] p-8">
        <p className="text-sm font-bold uppercase tracking-[0.08em] text-[color:var(--accent-soft)]">Admin access</p>
        <h1 className="text-3xl font-bold">This admin area is not available.</h1>
        <p className="text-[color:var(--muted)]">
          Configure GitHub auth and the allowed admin login, then try again.
        </p>
        <Link className="inline-flex rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-semibold" href="/">
          Back to site
        </Link>
      </div>
    </div>
  );
}
