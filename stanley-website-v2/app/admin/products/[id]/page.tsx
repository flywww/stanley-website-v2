import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminFlash } from "@/components/admin/admin-flash";
import { AdminFormProvider } from "@/components/admin/admin-form-state";
import { AdminSubmitButton } from "@/components/admin/admin-submit-button";
import { FieldLabel } from "@/components/admin/field-label";
import { GalleryEditor } from "@/components/admin/gallery-editor";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { saveProjectAction } from "@/lib/cms/actions";
import { getProjectById, getProjects } from "@/lib/cms/queries";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminEditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: SearchParams;
}) {
  const [{ id }, allProjects, query] = await Promise.all([params, getProjects(), searchParams]);
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const error = getSearchParam(query.error) ? getSearchParam(query.message) ?? "Save failed." : undefined;
  const saved = getSearchParam(query.saved) ? "Product saved." : undefined;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-[color:var(--accent-soft)]">Products</p>
          <h2 className="text-3xl font-bold">{project.name}</h2>
        </div>
        <Link className="text-sm font-semibold text-[color:var(--accent)]" href="/admin/products">
          Back to products
        </Link>
      </div>
      <AdminFlash error={error} saved={saved} />
      <form action={saveProjectAction} className="space-y-6">
        <AdminFormProvider>
          <input name="id" type="hidden" value={project.id} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative"><FieldLabel htmlFor="project-slug">Slug</FieldLabel><input id="project-slug" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={project.slug} name="slug" placeholder="slug" required /></div>
            <div className="relative"><FieldLabel htmlFor="project-name">Product name</FieldLabel><input id="project-name" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={project.name} name="name" placeholder="Product name" required /></div>
            <div className="relative"><FieldLabel htmlFor="project-sort-order">Sort order</FieldLabel><input id="project-sort-order" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={project.sortOrder} name="sortOrder" type="number" /></div>
            <label className="flex items-center gap-3 rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3">
              <input defaultChecked={project.featured} name="featured" type="checkbox" />
              <span>Featured on homepage</span>
            </label>
          </div>
          <div className="relative"><FieldLabel htmlFor="project-brief">Brief description</FieldLabel><textarea id="project-brief" className="min-h-28 w-full rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={project.brief} name="brief" placeholder="Brief description" required /></div>
          <div className="grid gap-4 md:grid-cols-2">
            <ImageUploadField initialValue={project.gridImageUrl} kind="grid" label="Grid image" name="gridImageUrl" rootPath="projects" slugFieldId="project-slug" />
            <ImageUploadField initialValue={project.featuredImageUrl ?? ""} kind="featured" label="Featured image" name="featuredImageUrl" rootPath="projects" slugFieldId="project-slug" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative"><FieldLabel htmlFor="project-role-tags">Role tags</FieldLabel><textarea id="project-role-tags" className="min-h-32 rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={project.roleTags.join("\n")} name="roleTags" placeholder="Role tags, one per line" /></div>
            <div className="relative"><FieldLabel htmlFor="project-contribution-tags">Contribution tags</FieldLabel><textarea id="project-contribution-tags" className="min-h-32 rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={project.contributionTags.join("\n")} name="contributionTags" placeholder="Contribution tags, one per line" /></div>
            <div className="relative"><FieldLabel htmlFor="project-problem">Problem bullets</FieldLabel><textarea id="project-problem" className="min-h-32 rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={project.problem.join("\n")} name="problem" placeholder="Problem bullets, one per line" /></div>
            <div className="relative"><FieldLabel htmlFor="project-solution">Solution bullets</FieldLabel><textarea id="project-solution" className="min-h-32 rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={project.solution.join("\n")} name="solution" placeholder="Solution bullets, one per line" /></div>
            <div className="relative"><FieldLabel htmlFor="project-outcome">Outcome bullets</FieldLabel><textarea id="project-outcome" className="min-h-32 rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={project.outcome.join("\n")} name="outcome" placeholder="Outcome bullets, one per line" /></div>
            <div className="relative"><FieldLabel htmlFor="project-capabilities">Capabilities</FieldLabel><textarea id="project-capabilities" className="min-h-32 rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={project.capabilities.join("\n")} name="capabilities" placeholder="Capabilities, one per line" /></div>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold">Related projects</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {allProjects
                .filter((item) => item.slug !== project.slug)
                .map((relatedProject) => (
                  <label key={relatedProject.id} className="flex items-center gap-3 rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3">
                    <input defaultChecked={project.relatedSlugs.includes(relatedProject.slug)} name="relatedSlugs" type="checkbox" value={relatedProject.slug} />
                    <span>{relatedProject.name}</span>
                  </label>
                ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold">Gallery</h3>
            <GalleryEditor initialItems={project.gallery} slugFieldId="project-slug" />
          </div>
          <AdminSubmitButton idleLabel="Save product" pendingLabel="Saving product..." />
        </AdminFormProvider>
      </form>
    </div>
  );
}
