# Stanley Website V2

Personal website for Stanley Lin, built with Next.js App Router, TypeScript, Tailwind CSS v4, and local static content.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- pnpm

## Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm start
```

## Routes

- `/`
- `/projects`
- `/projects/[slug]`
- `/contact`

## Content Source

The current implementation uses `lib/site-data.ts` as the content source.

Planning notes and source material live in the Obsidian vault under:

- `/Users/stanley/Library/Mobile Documents/iCloud~md~obsidian/Documents/LifeOSVault/01 Inbox/20260313 Stanley Website`

## Images

Product and company visuals in this repo are copied from the approved source folder in the vault:

- `site-assets/portfolio-images/`

Do not pull website images from `site-assets/20231221-portfolio/` exports for UI use. That package is for text/content reference only.

## Current Scope

- Homepage with hero, featured products, key skills, and experience
- Projects index with all products
- Product detail pages with image galleries
- Contact page
