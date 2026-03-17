import { z } from "zod";

const requiredString = z.string().trim().min(1);
const absoluteUrlSchema = z.url();

function isSiteRelativePath(value: string) {
  return value.startsWith("/");
}

const pathOrUrlString = z.string().trim().min(1).refine(
  (value) => absoluteUrlSchema.safeParse(value).success || isSiteRelativePath(value),
  "Must be an absolute URL or a site-relative path starting with /.",
);

export const siteSettingsSchema = z.object({
  name: requiredString,
  title: requiredString,
  siteUrl: requiredString.url(),
  avatarImageUrl: pathOrUrlString,
  defaultOgImageUrl: pathOrUrlString,
  eyebrow: requiredString,
  headline: requiredString,
  intro: requiredString,
  email: z.email(),
  location: requiredString,
  linkedin: requiredString.url(),
  github: requiredString.url(),
  x: requiredString.url(),
  footerHeadline: requiredString,
  projectsPageTitle: requiredString,
  contactPageTitle: requiredString,
  contactPageIntro: requiredString,
});

export const metricSchema = z.object({
  id: z.string().optional(),
  label: requiredString,
  value: requiredString,
  sortOrder: z.coerce.number().int(),
});

export const skillSchema = z.object({
  id: z.string().optional(),
  title: requiredString,
  description: requiredString,
  sortOrder: z.coerce.number().int(),
});

export const experienceItemSchema = z.object({
  id: z.string().optional(),
  company: requiredString,
  role: requiredString,
  time: requiredString,
  bullets: z.array(requiredString).min(1),
  sortOrder: z.coerce.number().int(),
});

export const galleryImageSchema = z.object({
  id: z.string().optional(),
  src: pathOrUrlString,
  alt: requiredString,
  sortOrder: z.coerce.number().int(),
});

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const projectSchema = z
  .object({
    id: z.string().optional(),
    slug: requiredString.regex(slugPattern, "Slug must be lowercase and URL-safe."),
    name: requiredString,
    featured: z.boolean(),
    sortOrder: z.coerce.number().int(),
    featuredImageUrl: z
      .string()
      .trim()
      .optional()
      .default("")
      .refine((value) => value.length === 0 || absoluteUrlSchema.safeParse(value).success || isSiteRelativePath(value), {
        message: "Must be empty, an absolute URL, or a site-relative path starting with /.",
      }),
    gridImageUrl: pathOrUrlString,
    brief: requiredString,
    roleTags: z.array(requiredString),
    contributionTags: z.array(requiredString),
    problem: z.array(requiredString),
    solution: z.array(requiredString),
    outcome: z.array(requiredString),
    capabilities: z.array(requiredString),
    relatedSlugs: z.array(requiredString),
    gallery: z.array(galleryImageSchema).min(1),
  })
  .superRefine((project, ctx) => {
    if (project.relatedSlugs.includes(project.slug)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["relatedSlugs"],
        message: "A project cannot relate to itself.",
      });
    }
  });

export const metricCollectionSchema = z.array(metricSchema);
export const skillCollectionSchema = z.array(skillSchema);
export const experienceCollectionSchema = z.array(experienceItemSchema);
