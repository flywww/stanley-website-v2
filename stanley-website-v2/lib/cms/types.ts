import type { ExperienceItem, GalleryImage, Metric, Project, Skill } from "@/lib/site-data";

export type CmsSiteSettings = {
  id: string;
  name: string;
  title: string;
  siteUrl: string;
  avatarImageUrl: string;
  defaultOgImageUrl: string;
  eyebrow: string;
  headline: string;
  intro: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
  x: string;
  footerHeadline: string;
  projectsPageTitle: string;
  contactPageTitle: string;
  contactPageIntro: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CmsMetric = Metric & {
  id: string;
  sortOrder: number;
};

export type CmsSkill = Skill & {
  id: string;
  sortOrder: number;
};

export type CmsExperienceItem = ExperienceItem & {
  id: string;
  sortOrder: number;
};

export type CmsProjectGalleryImage = GalleryImage & {
  id: string;
  sortOrder: number;
};

export type CmsProject = Project & {
  id: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  relatedSlugs: string[];
  gallery: CmsProjectGalleryImage[];
  gridImageUrl: string;
  featuredImageUrl?: string | null;
};

export type CmsEnvironmentStatus = {
  hasDatabase: boolean;
  hasAuth: boolean;
  hasBlob: boolean;
  hasAdminLogin: boolean;
};
