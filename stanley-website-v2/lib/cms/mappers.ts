import type { ExperienceItem, Metric, Project, Skill } from "@/lib/site-data";

import type { CmsExperienceItem, CmsMetric, CmsProject, CmsSiteSettings, CmsSkill } from "@/lib/cms/types";

export function mapSiteSettingsToSiteMeta(settings: CmsSiteSettings) {
  return {
    name: settings.name,
    title: settings.title,
    siteUrl: settings.siteUrl,
    avatar: settings.avatarImageUrl,
    defaultOgImage: settings.defaultOgImageUrl,
    eyebrow: settings.eyebrow,
    headline: settings.headline,
    intro: settings.intro,
    email: settings.email,
    location: settings.location,
    linkedin: settings.linkedin,
    github: settings.github,
    x: settings.x,
    footerHeadline: settings.footerHeadline,
  };
}

export function mapMetricToView(metric: CmsMetric): Metric {
  return {
    label: metric.label,
    value: metric.value,
  };
}

export function mapSkillToView(skill: CmsSkill): Skill {
  return {
    title: skill.title,
    description: skill.description,
  };
}

export function mapExperienceItemToView(item: CmsExperienceItem): ExperienceItem {
  return {
    company: item.company,
    role: item.role,
    time: item.time,
    bullets: item.bullets,
  };
}

export function mapProjectToView(project: CmsProject): Project {
  return {
    slug: project.slug,
    name: project.name,
    featured: project.featured,
    featuredImage: project.featuredImageUrl ?? undefined,
    gridImage: project.gridImageUrl,
    gallery: project.gallery.map((image) => ({
      src: image.src,
      alt: image.alt,
    })),
    brief: project.brief,
    roleTags: project.roleTags,
    contributionTags: project.contributionTags,
    problem: project.problem,
    solution: project.solution,
    outcome: project.outcome,
    capabilities: project.capabilities,
    related: project.relatedSlugs,
  };
}
