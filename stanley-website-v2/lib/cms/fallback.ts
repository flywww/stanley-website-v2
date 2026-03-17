import { contactPage, experienceHighlights, keySkills, metrics, products, projectsPage, siteMeta } from "@/lib/site-data";

import type { CmsExperienceItem, CmsMetric, CmsProject, CmsSiteSettings, CmsSkill } from "@/lib/cms/types";

const fallbackTimestamp = new Date("2024-01-01T00:00:00.000Z");

export const fallbackSiteSettings: CmsSiteSettings = {
  id: "site",
  name: siteMeta.name,
  title: siteMeta.title,
  siteUrl: siteMeta.siteUrl,
  avatarImageUrl: siteMeta.avatar,
  defaultOgImageUrl: siteMeta.defaultOgImage,
  eyebrow: siteMeta.eyebrow,
  headline: siteMeta.headline,
  intro: siteMeta.intro,
  email: siteMeta.email,
  location: siteMeta.location,
  linkedin: siteMeta.linkedin,
  github: siteMeta.github,
  x: siteMeta.x,
  footerHeadline: siteMeta.footerHeadline,
  projectsPageTitle: projectsPage.title,
  contactPageTitle: contactPage.title,
  contactPageIntro: contactPage.intro,
  createdAt: fallbackTimestamp,
  updatedAt: fallbackTimestamp,
};

export const fallbackMetrics: CmsMetric[] = metrics.map((metric, index) => ({
  id: `metric-${index}`,
  ...metric,
  sortOrder: index,
}));

export const fallbackSkills: CmsSkill[] = keySkills.map((skill, index) => ({
  id: `skill-${index}`,
  ...skill,
  sortOrder: index,
}));

export const fallbackExperienceItems: CmsExperienceItem[] = experienceHighlights.map((item, index) => ({
  id: `experience-${index}`,
  ...item,
  sortOrder: index,
}));

export const fallbackProjects: CmsProject[] = products.map((project, index) => ({
  id: project.slug,
  slug: project.slug,
  name: project.name,
  featured: project.featured,
  featuredImage: project.featuredImage,
  featuredImageUrl: project.featuredImage ?? null,
  gridImage: project.gridImage,
  gridImageUrl: project.gridImage,
  gallery: project.gallery.map((image, galleryIndex) => ({
    id: `${project.slug}-gallery-${galleryIndex}`,
    src: image.src,
    alt: image.alt,
    sortOrder: galleryIndex,
  })),
  brief: project.brief,
  roleTags: project.roleTags,
  contributionTags: project.contributionTags,
  problem: project.problem,
  solution: project.solution,
  outcome: project.outcome,
  capabilities: project.capabilities,
  related: project.related,
  relatedSlugs: project.related,
  sortOrder: index,
  createdAt: fallbackTimestamp,
  updatedAt: fallbackTimestamp,
}));
