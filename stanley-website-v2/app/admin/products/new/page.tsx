import Link from "next/link";

import { AdminFlash } from "@/components/admin/admin-flash";
import { AdminFormProvider } from "@/components/admin/admin-form-state";
import { AdminSubmitButton } from "@/components/admin/admin-submit-button";
import { FieldLabel } from "@/components/admin/field-label";
import { GalleryEditor } from "@/components/admin/gallery-editor";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { saveProjectAction } from "@/lib/cms/actions";
import { getProjects } from "@/lib/cms/queries";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminNewProductPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [projects, params] = await Promise.all([getProjects(), searchParams]);
  const error = getSearchParam(params.error) ? getSearchParam(params.message) ?? "Save failed." : undefined;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-[color:var(--accent-soft)]">Products</p>
          <h2 className="text-3xl font-bold">New product</h2>
        </div>
        <Link className="text-sm font-semibold text-[color:var(--accent)]" href="/admin/products">
          Back to products
        </Link>
      </div>
      <AdminFlash error={error} />
      <form action={saveProjectAction} className="space-y-6">
        <AdminFormProvider>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative"><FieldLabel htmlFor="project-slug">Slug</FieldLabel><input id="project-slug" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" name="slug" placeholder="slug" required /></div>
            <div className="relative"><FieldLabel htmlFor="project-name">Product name</FieldLabel><input id="project-name" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" name="name" placeholder="Product name" required /></div>
            <div className="relative"><FieldLabel htmlFor="project-sort-order">Sort order</FieldLabel><input id="project-sort-order" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue="0" name="sortOrder" type="number" /></div>
            <label className="flex items-center gap-3 rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3">
              <input name="featured" type="checkbox" />
              <span>Featured on homepage</span>
            </label>
          </div>
          <div className="relative"><FieldLabel htmlFor="project-brief">Brief description</FieldLabel><textarea id="project-brief" className="min-h-28 w-full rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" name="brief" placeholder="Brief description" required /></div>
          <div className="grid gap-4 md:grid-cols-2">
            <ImageUploadField kind="grid" label="Grid image" name="gridImageUrl" rootPath="projects" slugFieldId="project-slug" />
            <ImageUploadField kind="featured" label="Featured image" name="featuredImageUrl" rootPath="projects" slugFieldId="project-slug" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative"><FieldLabel htmlFor="project-role-tags">Role tags</FieldLabel><textarea id="project-role-tags" className="min-h-32 rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" name="roleTags" placeholder="Role tags, one per line" /></div>
            <div className="relative"><FieldLabel htmlFor="project-contribution-tags">Contribution tags</FieldLabel><textarea id="project-contribution-tags" className="min-h-32 rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" name="contributionTags" placeholder="Contribution tags, one per line" /></div>
            <div className="relative"><FieldLabel htmlFor="project-problem">Problem bullets</FieldLabel><textarea id="project-problem" className="min-h-32 rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" name="problem" placeholder="Problem bullets, one per line" /></div>
            <div className="relative"><FieldLabel htmlFor="project-solution">Solution bullets</FieldLabel><textarea id="project-solution" className="min-h-32 rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" name="solution" placeholder="Solution bullets, one per line" /></div>
            <div className="relative"><FieldLabel htmlFor="project-outcome">Outcome bullets</FieldLabel><textarea id="project-outcome" className="min-h-32 rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" name="outcome" placeholder="Outcome bullets, one per line" /></div>
            <div className="relative"><FieldLabel htmlFor="project-capabilities">Capabilities</FieldLabel><textarea id="project-capabilities" className="min-h-32 rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" name="capabilities" placeholder="Capabilities, one per line" /></div>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold">Related projects</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {projects.map((project) => (
                <label key={project.id} className="flex items-center gap-3 rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3">
                  <input name="relatedSlugs" type="checkbox" value={project.slug} />
                  <span>{project.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold">Gallery</h3>
            <GalleryEditor initialItems={[{ src: "", alt: "", sortOrder: 0 }]} slugFieldId="project-slug" />
          </div>
          <AdminSubmitButton idleLabel="Create product" pendingLabel="Creating product..." />
        </AdminFormProvider>
      </form>
    </div>
  );
}
