"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin-auth";
import { experienceCollectionSchema, metricCollectionSchema, projectSchema, siteSettingsSchema, skillCollectionSchema } from "@/lib/cms/validators";
import { prisma } from "@/lib/db";

function requireDatabase() {
  if (!prisma) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return prisma;
}

function parseJsonField<T>(formData: FormData, key: string): T {
  const value = formData.get(key);

  if (typeof value !== "string") {
    throw new Error(`Missing form field: ${key}`);
  }

  return JSON.parse(value) as T;
}

function getStringField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function parseLineList(formData: FormData, key: string) {
  return getStringField(formData, key)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function redirectWithMessage(path: string, type: "saved" | "error", message?: string) {
  const params = new URLSearchParams();
  params.set(type, "1");

  if (message) {
    params.set("message", message);
  }

  redirect(`${path}?${params.toString()}`);
}

export async function saveSiteSettingsAction(formData: FormData) {
  const basePath = "/admin/profile";
  await requireAdmin(basePath);

  try {
    const parsed = siteSettingsSchema.parse({
      name: getStringField(formData, "name"),
      title: getStringField(formData, "title"),
      siteUrl: getStringField(formData, "siteUrl"),
      avatarImageUrl: getStringField(formData, "avatarImageUrl"),
      defaultOgImageUrl: getStringField(formData, "defaultOgImageUrl"),
      eyebrow: getStringField(formData, "eyebrow"),
      headline: getStringField(formData, "headline"),
      intro: getStringField(formData, "intro"),
      email: getStringField(formData, "email"),
      location: getStringField(formData, "location"),
      linkedin: getStringField(formData, "linkedin"),
      github: getStringField(formData, "github"),
      x: getStringField(formData, "x"),
      footerHeadline: getStringField(formData, "footerHeadline"),
      projectsPageTitle: getStringField(formData, "projectsPageTitle"),
      contactPageTitle: getStringField(formData, "contactPageTitle"),
      contactPageIntro: getStringField(formData, "contactPageIntro"),
    });

    await requireDatabase().siteSettings.upsert({
      where: { id: "site" },
      update: parsed,
      create: {
        id: "site",
        ...parsed,
      },
    });

    revalidatePath("/");
    revalidatePath("/contact");
    revalidatePath("/projects");
    revalidatePath("/admin/profile");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save profile settings.";
    redirectWithMessage(basePath, "error", message);
  }

  redirectWithMessage(basePath, "saved");
}

export async function saveMetricsAction(formData: FormData) {
  const basePath = "/admin/homepage";
  await requireAdmin(basePath);

  try {
    const items = metricCollectionSchema.parse(parseJsonField<unknown[]>(formData, "metricsJson"));
    const db = requireDatabase();

    await db.$transaction([
      db.metric.deleteMany(),
      db.metric.createMany({
        data: items,
      }),
    ]);

    revalidatePath("/");
    revalidatePath("/admin/homepage");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save metrics.";
    redirectWithMessage(basePath, "error", message);
  }

  redirectWithMessage(basePath, "saved");
}

export async function saveSkillsAction(formData: FormData) {
  const basePath = "/admin/homepage";
  await requireAdmin(basePath);

  try {
    const items = skillCollectionSchema.parse(parseJsonField<unknown[]>(formData, "skillsJson"));
    const db = requireDatabase();

    await db.$transaction([
      db.skill.deleteMany(),
      db.skill.createMany({
        data: items,
      }),
    ]);

    revalidatePath("/");
    revalidatePath("/admin/homepage");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save skills.";
    redirectWithMessage(basePath, "error", message);
  }

  redirectWithMessage(basePath, "saved");
}

export async function saveExperienceItemsAction(formData: FormData) {
  const basePath = "/admin/homepage";
  await requireAdmin(basePath);

  try {
    const items = experienceCollectionSchema.parse(parseJsonField<unknown[]>(formData, "experienceJson"));
    const db = requireDatabase();

    await db.$transaction([
      db.experienceItem.deleteMany(),
      db.experienceItem.createMany({
        data: items,
      }),
    ]);

    revalidatePath("/");
    revalidatePath("/admin/homepage");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save experience items.";
    redirectWithMessage(basePath, "error", message);
  }

  redirectWithMessage(basePath, "saved");
}

export async function saveProjectAction(formData: FormData) {
  const rawId = getStringField(formData, "id");
  const isNew = rawId.length === 0;
  const basePath = isNew ? "/admin/products/new" : `/admin/products/${rawId}`;
  let redirectPath = basePath;
  await requireAdmin(basePath);

  try {
    const parsed = projectSchema.parse({
      id: rawId || undefined,
      slug: getStringField(formData, "slug"),
      name: getStringField(formData, "name"),
      featured: formData.get("featured") === "on",
      sortOrder: getStringField(formData, "sortOrder"),
      featuredImageUrl: getStringField(formData, "featuredImageUrl"),
      gridImageUrl: getStringField(formData, "gridImageUrl"),
      brief: getStringField(formData, "brief"),
      roleTags: parseLineList(formData, "roleTags"),
      contributionTags: parseLineList(formData, "contributionTags"),
      problem: parseLineList(formData, "problem"),
      solution: parseLineList(formData, "solution"),
      outcome: parseLineList(formData, "outcome"),
      capabilities: parseLineList(formData, "capabilities"),
      relatedSlugs: formData.getAll("relatedSlugs").map(String).map((slug) => slug.trim()).filter(Boolean),
      gallery: parseJsonField<unknown[]>(formData, "galleryJson"),
    });

    const db = requireDatabase();

    const relatedProjects = await db.project.findMany({
      select: { slug: true },
    });
    const relatedSet = new Set(relatedProjects.map((project) => project.slug));
    const missingRelated = parsed.relatedSlugs.filter((slug) => !relatedSet.has(slug));

    if (missingRelated.length > 0) {
      throw new Error(`Unknown related project slugs: ${missingRelated.join(", ")}`);
    }

    const duplicate = await db.project.findUnique({
      where: { slug: parsed.slug },
      select: { id: true },
    });

    if (duplicate && duplicate.id !== parsed.id) {
      throw new Error("Project slug must be unique.");
    }

    const savedProject = parsed.id
      ? await db.project.update({
          where: { id: parsed.id },
          data: {
            slug: parsed.slug,
            name: parsed.name,
            featured: parsed.featured,
            sortOrder: parsed.sortOrder,
            featuredImageUrl: parsed.featuredImageUrl || null,
            gridImageUrl: parsed.gridImageUrl,
            brief: parsed.brief,
            roleTags: parsed.roleTags,
            contributionTags: parsed.contributionTags,
            problem: parsed.problem,
            solution: parsed.solution,
            outcome: parsed.outcome,
            capabilities: parsed.capabilities,
            relatedSlugs: parsed.relatedSlugs,
          },
        })
      : await db.project.create({
          data: {
            slug: parsed.slug,
            name: parsed.name,
            featured: parsed.featured,
            sortOrder: parsed.sortOrder,
            featuredImageUrl: parsed.featuredImageUrl || null,
            gridImageUrl: parsed.gridImageUrl,
            brief: parsed.brief,
            roleTags: parsed.roleTags,
            contributionTags: parsed.contributionTags,
            problem: parsed.problem,
            solution: parsed.solution,
            outcome: parsed.outcome,
            capabilities: parsed.capabilities,
            relatedSlugs: parsed.relatedSlugs,
          },
        });

    await db.projectGalleryImage.deleteMany({
      where: { projectId: savedProject.id },
    });

    await db.projectGalleryImage.createMany({
      data: parsed.gallery.map((item) => ({
        projectId: savedProject.id,
        src: item.src,
        alt: item.alt,
        sortOrder: item.sortOrder,
      })),
    });

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${parsed.slug}`);
    revalidatePath("/contact");
    revalidatePath("/sitemap.xml");
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${savedProject.id}`);
    redirectPath = `/admin/products/${savedProject.id}`;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save project.";
    redirectWithMessage(basePath, "error", message);
  }

  redirectWithMessage(redirectPath, "saved");
}

export async function deleteProjectAction(formData: FormData) {
  const id = getStringField(formData, "id");
  await requireAdmin("/admin/products");

  try {
    await requireDatabase().project.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin/products");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not delete project.";
    redirectWithMessage("/admin/products", "error", message);
  }

  redirectWithMessage("/admin/products", "saved");
}
