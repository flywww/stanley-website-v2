import { AdminFlash } from "@/components/admin/admin-flash";
import { AdminFormProvider } from "@/components/admin/admin-form-state";
import { AdminSubmitButton } from "@/components/admin/admin-submit-button";
import { FieldLabel } from "@/components/admin/field-label";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { saveSiteSettingsAction } from "@/lib/cms/actions";
import { getCmsEnvironmentStatus, getSiteSettings } from "@/lib/cms/queries";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminProfilePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [settings, status, params] = await Promise.all([getSiteSettings(), getCmsEnvironmentStatus(), searchParams]);
  const error = getSearchParam(params.error) ? getSearchParam(params.message) ?? "Save failed." : undefined;
  const saved = getSearchParam(params.saved) ? "Profile settings saved." : undefined;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.08em] text-[color:var(--accent-soft)]">Site settings</p>
        <h2 className="text-3xl font-bold">Profile and site identity</h2>
      </div>
      {!status.hasDatabase ? (
        <div className="rounded-[18px] border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          DATABASE_URL is not configured. You can review the form, but saving requires the database connection.
        </div>
      ) : null}
      <AdminFlash error={error} saved={saved} />
      <form action={saveSiteSettingsAction} className="space-y-6">
        <AdminFormProvider>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative"><FieldLabel htmlFor="site-name">Name</FieldLabel><input id="site-name" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={settings.name} name="name" placeholder="Name" required /></div>
            <div className="relative"><FieldLabel htmlFor="site-title">Title</FieldLabel><input id="site-title" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={settings.title} name="title" placeholder="Title" required /></div>
            <div className="relative"><FieldLabel htmlFor="site-url">Site URL</FieldLabel><input id="site-url" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={settings.siteUrl} name="siteUrl" placeholder="Site URL" required type="url" /></div>
            <div className="relative"><FieldLabel htmlFor="site-location">Location</FieldLabel><input id="site-location" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={settings.location} name="location" placeholder="Location" required /></div>
            <div className="relative"><FieldLabel htmlFor="site-email">Email</FieldLabel><input id="site-email" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={settings.email} name="email" placeholder="Email" required type="email" /></div>
            <div className="relative"><FieldLabel htmlFor="site-eyebrow">Homepage eyebrow</FieldLabel><input id="site-eyebrow" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={settings.eyebrow} name="eyebrow" placeholder="Eyebrow" required /></div>
            <div className="relative"><FieldLabel htmlFor="site-linkedin">LinkedIn URL</FieldLabel><input id="site-linkedin" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={settings.linkedin} name="linkedin" placeholder="LinkedIn" required type="url" /></div>
            <div className="relative"><FieldLabel htmlFor="site-github">GitHub URL</FieldLabel><input id="site-github" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={settings.github} name="github" placeholder="GitHub" required type="url" /></div>
            <div className="relative"><FieldLabel htmlFor="site-x">X URL</FieldLabel><input id="site-x" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={settings.x} name="x" placeholder="X" required type="url" /></div>
            <div className="relative"><FieldLabel htmlFor="site-footer-headline">Footer headline</FieldLabel><input id="site-footer-headline" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={settings.footerHeadline} name="footerHeadline" placeholder="Footer headline" required /></div>
            <div className="relative"><FieldLabel htmlFor="site-projects-title">Projects page title</FieldLabel><input id="site-projects-title" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={settings.projectsPageTitle} name="projectsPageTitle" placeholder="Projects page title" required /></div>
            <div className="relative"><FieldLabel htmlFor="site-contact-title">Contact page title</FieldLabel><input id="site-contact-title" className="rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={settings.contactPageTitle} name="contactPageTitle" placeholder="Contact page title" required /></div>
          </div>
          <div className="relative"><FieldLabel htmlFor="site-headline">Homepage headline</FieldLabel><textarea id="site-headline" className="min-h-28 w-full rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={settings.headline} name="headline" placeholder="Headline" required /></div>
          <div className="relative"><FieldLabel htmlFor="site-intro">Homepage intro</FieldLabel><textarea id="site-intro" className="min-h-32 w-full rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={settings.intro} name="intro" placeholder="Homepage intro" required /></div>
          <div className="relative"><FieldLabel htmlFor="site-contact-intro">Contact page intro</FieldLabel><textarea id="site-contact-intro" className="min-h-28 w-full rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3" defaultValue={settings.contactPageIntro} name="contactPageIntro" placeholder="Contact page intro" required /></div>
          <div className="grid gap-4 md:grid-cols-2">
            <ImageUploadField description="Used in the homepage hero and person JSON-LD." initialValue={settings.avatarImageUrl} kind="avatar" label="Avatar image" name="avatarImageUrl" rootPath="profile" />
            <ImageUploadField description="Used for metadata and social sharing." initialValue={settings.defaultOgImageUrl} kind="og" label="Default OG image" name="defaultOgImageUrl" rootPath="site" />
          </div>
          <AdminSubmitButton idleLabel="Save profile settings" pendingLabel="Saving profile..." />
        </AdminFormProvider>
      </form>
    </div>
  );
}
