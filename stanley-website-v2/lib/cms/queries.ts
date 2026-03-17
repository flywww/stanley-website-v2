import { cache } from "react";
import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";
import { fallbackExperienceItems, fallbackMetrics, fallbackProjects, fallbackSiteSettings, fallbackSkills } from "@/lib/cms/fallback";
import { mapExperienceItemToView, mapMetricToView, mapProjectToView, mapSiteSettingsToSiteMeta, mapSkillToView } from "@/lib/cms/mappers";
import type { CmsEnvironmentStatus, CmsExperienceItem, CmsMetric, CmsProject, CmsSiteSettings, CmsSkill } from "@/lib/cms/types";
import type { ExperienceItem, Metric, Project, Skill } from "@/lib/site-data";

async function runOrFallback<T>(fallback: T, query: () => Promise<T>): Promise<T> {
  if (!prisma) {
    return fallback;
  }

  try {
    return await query();
  } catch (error) {
    console.error("CMS query failed, using fallback content.", error);
    return fallback;
  }
}

type ProjectRecord = Prisma.ProjectGetPayload<{
  include: {
    galleryImages: true;
  };
}>;

const mapProjectRecord = (project: ProjectRecord): CmsProject => ({
  id: project.id,
  slug: project.slug,
  name: project.name,
  featured: project.featured,
  featuredImage: project.featuredImageUrl ?? undefined,
  featuredImageUrl: project.featuredImageUrl,
  gridImage: project.gridImageUrl,
  gridImageUrl: project.gridImageUrl,
  gallery: project.galleryImages.map((image) => ({
    id: image.id,
    src: image.src,
    alt: image.alt,
    sortOrder: image.sortOrder,
  })),
  brief: project.brief,
  roleTags: project.roleTags,
  contributionTags: project.contributionTags,
  problem: project.problem,
  solution: project.solution,
  outcome: project.outcome,
  capabilities: project.capabilities,
  related: project.relatedSlugs,
  relatedSlugs: project.relatedSlugs,
  sortOrder: project.sortOrder,
  createdAt: project.createdAt,
  updatedAt: project.updatedAt,
});

export const getCmsEnvironmentStatus = cache(async (): Promise<CmsEnvironmentStatus> => ({
  hasDatabase: Boolean(process.env.DATABASE_URL),
  hasAuth: Boolean(process.env.AUTH_SECRET && process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET),
  hasBlob: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
  hasAdminLogin: Boolean(process.env.ADMIN_GITHUB_LOGIN),
}));

export const getSiteSettings = cache(async (): Promise<CmsSiteSettings> =>
  runOrFallback(fallbackSiteSettings, async () => {
    const settings = await prisma!.siteSettings.findUnique({
      where: { id: "site" },
    });

    return settings ?? fallbackSiteSettings;
  }),
);

export const getMetrics = cache(async (): Promise<CmsMetric[]> =>
  runOrFallback(fallbackMetrics, async () => {
    const metrics = await prisma!.metric.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return metrics.length > 0 ? metrics : fallbackMetrics;
  }),
);

export const getSkills = cache(async (): Promise<CmsSkill[]> =>
  runOrFallback(fallbackSkills, async () => {
    const skills = await prisma!.skill.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return skills.length > 0 ? skills : fallbackSkills;
  }),
);

export const getExperienceItems = cache(async (): Promise<CmsExperienceItem[]> =>
  runOrFallback(fallbackExperienceItems, async () => {
    const items = await prisma!.experienceItem.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return items.length > 0 ? items : fallbackExperienceItems;
  }),
);

export const getProjects = cache(async (): Promise<CmsProject[]> =>
  runOrFallback(fallbackProjects, async () => {
    const projects = await prisma!.project.findMany({
      include: {
        galleryImages: {
          orderBy: { sortOrder: "asc" },
        },
      },
      orderBy: { sortOrder: "asc" },
    });

    return projects.length > 0 ? projects.map(mapProjectRecord) : fallbackProjects;
  }),
);

export const getProjectBySlug = cache(async (slug: string): Promise<CmsProject | null> => {
  const fallback = fallbackProjects.find((project) => project.slug === slug) ?? null;

  return runOrFallback(fallback, async () => {
    const project = await prisma!.project.findUnique({
      where: { slug },
      include: {
        galleryImages: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    return project ? mapProjectRecord(project) : null;
  });
});

export const getProjectById = cache(async (id: string): Promise<CmsProject | null> => {
  const fallback = fallbackProjects.find((project) => project.id === id || project.slug === id) ?? null;

  return runOrFallback(fallback, async () => {
    const project = await prisma!.project.findUnique({
      where: { id },
      include: {
        galleryImages: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    return project ? mapProjectRecord(project) : null;
  });
});

export const getRelatedProjects = cache(async (slugs: string[]): Promise<CmsProject[]> => {
  const projects = await getProjects();
  const bySlug = new Map(projects.map((project) => [project.slug, project]));
  return slugs.map((slug) => bySlug.get(slug)).filter((project): project is CmsProject => Boolean(project));
});

export const getHomepageContent = cache(async () => {
  const [settings, metrics, skills, experienceItems, projects] = await Promise.all([
    getSiteSettings(),
    getMetrics(),
    getSkills(),
    getExperienceItems(),
    getProjects(),
  ]);

  return {
    settings,
    metrics,
    skills,
    experienceItems,
    featuredProjects: projects.filter((project) => project.featured),
  };
});

export const getPublicSiteContent = cache(async () => {
  const [settings, metrics, skills, experienceItems, projects] = await Promise.all([
    getSiteSettings(),
    getMetrics(),
    getSkills(),
    getExperienceItems(),
    getProjects(),
  ]);

  return {
    settings,
    projects,
    metrics: metrics.map(mapMetricToView),
    skills: skills.map(mapSkillToView),
    experienceItems: experienceItems.map(mapExperienceItemToView),
    siteMeta: mapSiteSettingsToSiteMeta(settings),
    productViews: projects.map(mapProjectToView),
  };
});

export async function getPublicMetrics(): Promise<Metric[]> {
  return (await getMetrics()).map(mapMetricToView);
}

export async function getPublicSkills(): Promise<Skill[]> {
  return (await getSkills()).map(mapSkillToView);
}

export async function getPublicExperienceItems(): Promise<ExperienceItem[]> {
  return (await getExperienceItems()).map(mapExperienceItemToView);
}

export async function getPublicProjects(): Promise<Project[]> {
  return (await getProjects()).map(mapProjectToView);
}

export async function getPublicProjectBySlug(slug: string): Promise<Project | null> {
  const project = await getProjectBySlug(slug);
  return project ? mapProjectToView(project) : null;
}
