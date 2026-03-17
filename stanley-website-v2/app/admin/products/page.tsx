import Link from "next/link";

import { AdminFlash } from "@/components/admin/admin-flash";
import { deleteProjectAction } from "@/lib/cms/actions";
import { getProjects } from "@/lib/cms/queries";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [projects, params] = await Promise.all([getProjects(), searchParams]);
  const error = getSearchParam(params.error) ? getSearchParam(params.message) ?? "Action failed." : undefined;
  const saved = getSearchParam(params.saved) ? "Products updated." : undefined;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-[color:var(--accent-soft)]">Products</p>
          <h2 className="text-3xl font-bold">Project catalog</h2>
        </div>
        <Link className="rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white" href="/admin/products/new">
          New product
        </Link>
      </div>
      <AdminFlash error={error} saved={saved} />
      <div className="overflow-hidden rounded-[20px] border border-[color:var(--line)] bg-[color:var(--surface)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[color:var(--line)] bg-[color:var(--surface-strong)]">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-[color:var(--line)] last:border-b-0">
                <td className="px-4 py-3 font-medium">{project.name}</td>
                <td className="px-4 py-3">{project.slug}</td>
                <td className="px-4 py-3">{project.featured ? "Yes" : "No"}</td>
                <td className="px-4 py-3">{project.sortOrder}</td>
                <td className="px-4 py-3">{project.updatedAt.toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link className="font-semibold text-[color:var(--accent)]" href={`/admin/products/${project.id}`}>
                      Edit
                    </Link>
                    <form action={deleteProjectAction}>
                      <input name="id" type="hidden" value={project.id} />
                      <button className="text-red-600 dark:text-red-300" type="submit">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
