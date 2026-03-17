import type { Metadata, MetadataRoute } from "next";

import type { CmsSiteSettings } from "@/lib/cms/types";
import type { Project } from "@/lib/site-data";

export const isProductionDeployment = process.env.VERCEL_ENV === "production";

const defaultDescription = "Product team lead building medical and software products.";

export function getRobotsDirectives(): Metadata["robots"] {
  if (isProductionDeployment) {
    return {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    };
  }

  return {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-image-preview": "none",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export function absoluteUrl(siteUrl: string, path = "/") {
  return new URL(path, siteUrl).toString();
}

type PageMetadataOptions = {
  site: CmsSiteSettings;
  path: string;
  title?: string;
  description?: string;
  images?: string[];
};

export function createPageMetadata({
  site,
  path,
  title,
  description = defaultDescription,
  images = [site.defaultOgImageUrl],
}: PageMetadataOptions): Metadata {
  const resolvedImages = images.length > 0 ? images : [site.defaultOgImageUrl];

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(site.siteUrl, path),
      title: title ? `${title} | ${site.name}` : site.name,
      description,
      siteName: site.name,
      images: resolvedImages,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${site.name}` : site.name,
      description,
      images: resolvedImages,
    },
  };
}

export function createProjectMetadata(site: CmsSiteSettings, project: Project): Metadata {
  const image = project.featuredImage ?? project.gridImage ?? site.defaultOgImageUrl;

  return createPageMetadata({
    site,
    path: `/projects/${project.slug}`,
    title: project.name,
    description: project.brief,
    images: [image],
  });
}

export function createHomeJsonLd(site: CmsSiteSettings) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: site.name,
        url: site.siteUrl,
        description: site.intro,
      },
      {
        "@type": "Person",
        name: site.name,
        url: site.siteUrl,
        image: absoluteUrl(site.siteUrl, site.avatarImageUrl),
        jobTitle: site.title,
        description: site.intro,
        email: site.email,
        homeLocation: {
          "@type": "Place",
          name: site.location,
        },
        sameAs: [site.linkedin, site.github, site.x],
      },
    ],
  };
}

export function createProjectsJsonLd(site: CmsSiteSettings, projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Selected product work",
    url: absoluteUrl(site.siteUrl, "/projects"),
    description: "Selected product work across medical and software products.",
    mainEntity: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.name,
      url: absoluteUrl(site.siteUrl, `/projects/${project.slug}`),
      description: project.brief,
      image: absoluteUrl(site.siteUrl, project.featuredImage ?? project.gridImage ?? site.defaultOgImageUrl),
    })),
  };
}

export function createProjectJsonLd(site: CmsSiteSettings, project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    url: absoluteUrl(site.siteUrl, `/projects/${project.slug}`),
    description: project.brief,
    image: [absoluteUrl(site.siteUrl, project.featuredImage ?? project.gridImage ?? site.defaultOgImageUrl)],
    creator: {
      "@type": "Person",
      name: site.name,
      url: site.siteUrl,
    },
    keywords: [...new Set([...project.roleTags, ...project.capabilities])].join(", "),
  };
}

export function createRobotsConfig(siteUrl: string): MetadataRoute.Robots {
  if (isProductionDeployment) {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: absoluteUrl(siteUrl, "/sitemap.xml"),
      host: siteUrl,
    };
  }

  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
