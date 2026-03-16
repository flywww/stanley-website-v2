import type { Metadata, MetadataRoute } from "next";

import type { Project } from "@/lib/site-data";
import { siteMeta } from "@/lib/site-data";

export const siteOrigin = siteMeta.siteUrl;
export const siteBaseUrl = new URL(siteOrigin);
export const isProductionDeployment = process.env.VERCEL_ENV === "production";

const defaultDescription = "Product team lead building medical and software products.";
const defaultOgImage = siteMeta.defaultOgImage;

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

export function absoluteUrl(path = "/") {
  return new URL(path, siteBaseUrl).toString();
}

type PageMetadataOptions = {
  path: string;
  title?: string;
  description?: string;
  images?: string[];
};

export function createPageMetadata({
  path,
  title,
  description = defaultDescription,
  images = [defaultOgImage],
}: PageMetadataOptions): Metadata {
  const resolvedImages = images.length > 0 ? images : [defaultOgImage];

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(path),
      title: title ? `${title} | ${siteMeta.name}` : siteMeta.name,
      description,
      siteName: siteMeta.name,
      images: resolvedImages,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${siteMeta.name}` : siteMeta.name,
      description,
      images: resolvedImages,
    },
  };
}

export function createProjectMetadata(project: Project): Metadata {
  const image = project.featuredImage ?? project.gridImage ?? defaultOgImage;

  return createPageMetadata({
    path: `/projects/${project.slug}`,
    title: project.name,
    description: project.brief,
    images: [image],
  });
}

export function createHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: siteMeta.name,
        url: siteOrigin,
        description: siteMeta.intro,
      },
      {
        "@type": "Person",
        name: siteMeta.name,
        url: siteOrigin,
        image: absoluteUrl(siteMeta.avatar),
        jobTitle: siteMeta.title,
        description: siteMeta.intro,
        email: siteMeta.email,
        homeLocation: {
          "@type": "Place",
          name: siteMeta.location,
        },
        sameAs: [siteMeta.linkedin, siteMeta.github, siteMeta.x],
      },
    ],
  };
}

export function createProjectsJsonLd(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Selected product work",
    url: absoluteUrl("/projects"),
    description: "Selected product work across medical and software products.",
    mainEntity: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.name,
      url: absoluteUrl(`/projects/${project.slug}`),
      description: project.brief,
      image: absoluteUrl(project.featuredImage ?? project.gridImage ?? defaultOgImage),
    })),
  };
}

export function createProjectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    url: absoluteUrl(`/projects/${project.slug}`),
    description: project.brief,
    image: [absoluteUrl(project.featuredImage ?? project.gridImage ?? defaultOgImage)],
    creator: {
      "@type": "Person",
      name: siteMeta.name,
      url: siteOrigin,
    },
    keywords: [...new Set([...project.roleTags, ...project.capabilities])].join(", "),
  };
}

export function createRobotsConfig(): MetadataRoute.Robots {
  if (isProductionDeployment) {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: absoluteUrl("/sitemap.xml"),
      host: siteOrigin,
    };
  }

  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
