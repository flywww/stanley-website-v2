import { AdminFlash } from "@/components/admin/admin-flash";
import { AdminSubmitButton } from "@/components/admin/admin-submit-button";
import { ExperienceEditor } from "@/components/admin/experience-editor";
import { MetricsEditor } from "@/components/admin/metrics-editor";
import { SkillsEditor } from "@/components/admin/skills-editor";
import { saveExperienceItemsAction, saveMetricsAction, saveSkillsAction } from "@/lib/cms/actions";
import { getExperienceItems, getMetrics, getSkills } from "@/lib/cms/queries";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminHomepagePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [metrics, skills, experienceItems, params] = await Promise.all([getMetrics(), getSkills(), getExperienceItems(), searchParams]);
  const error = getSearchParam(params.error) ? getSearchParam(params.message) ?? "Save failed." : undefined;
  const saved = getSearchParam(params.saved) ? "Homepage content saved." : undefined;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.08em] text-[color:var(--accent-soft)]">Homepage</p>
        <h2 className="text-3xl font-bold">Metrics, skills, and experience</h2>
      </div>
      <AdminFlash error={error} saved={saved} />

      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-bold">Metrics</h3>
          <p className="text-[color:var(--muted)]">Edit the headline metric row shown on the homepage.</p>
        </div>
        <form action={saveMetricsAction} className="space-y-4">
          <MetricsEditor initialItems={metrics} />
          <AdminSubmitButton idleLabel="Save metrics" pendingLabel="Saving metrics..." />
        </form>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-bold">Skills</h3>
          <p className="text-[color:var(--muted)]">Edit the homepage skill cards.</p>
        </div>
        <form action={saveSkillsAction} className="space-y-4">
          <SkillsEditor initialItems={skills} />
          <AdminSubmitButton idleLabel="Save skills" pendingLabel="Saving skills..." />
        </form>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-bold">Experience</h3>
          <p className="text-[color:var(--muted)]">Edit the experience timeline cards.</p>
        </div>
        <form action={saveExperienceItemsAction} className="space-y-4">
          <ExperienceEditor initialItems={experienceItems} />
          <AdminSubmitButton idleLabel="Save experience" pendingLabel="Saving experience..." />
        </form>
      </section>
    </div>
  );
}
