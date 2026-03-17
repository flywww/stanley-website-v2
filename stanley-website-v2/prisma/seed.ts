import { PrismaClient } from "@prisma/client";

import { contactPage, experienceHighlights, keySkills, metrics, products, projectsPage, siteMeta } from "../lib/site-data";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to seed the CMS.");
  }

  const prisma = new PrismaClient();

  try {
    const existingSiteSettings = await prisma.siteSettings.count();
    const existingProjects = await prisma.project.count();

    if (existingSiteSettings > 0 || existingProjects > 0) {
      console.log("Seed skipped: CMS data already exists.");
      return;
    }

    await prisma.siteSettings.create({
      data: {
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
      },
    });

    await prisma.metric.createMany({
      data: metrics.map((metric, index) => ({
        label: metric.label,
        value: metric.value,
        sortOrder: index,
      })),
    });

    await prisma.skill.createMany({
      data: keySkills.map((skill, index) => ({
        title: skill.title,
        description: skill.description,
        sortOrder: index,
      })),
    });

    await prisma.experienceItem.createMany({
      data: experienceHighlights.map((item, index) => ({
        company: item.company,
        role: item.role,
        time: item.time,
        bullets: item.bullets,
        sortOrder: index,
      })),
    });

    for (const [index, product] of products.entries()) {
      await prisma.project.create({
        data: {
          slug: product.slug,
          name: product.name,
          featured: product.featured,
          sortOrder: index,
          featuredImageUrl: product.featuredImage,
          gridImageUrl: product.gridImage,
          brief: product.brief,
          roleTags: product.roleTags,
          contributionTags: product.contributionTags,
          problem: product.problem,
          solution: product.solution,
          outcome: product.outcome,
          capabilities: product.capabilities,
          relatedSlugs: product.related,
          galleryImages: {
            create: product.gallery.map((image, galleryIndex) => ({
              src: image.src,
              alt: image.alt,
              sortOrder: galleryIndex,
            })),
          },
        },
      });
    }

    console.log("Seed completed.");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
