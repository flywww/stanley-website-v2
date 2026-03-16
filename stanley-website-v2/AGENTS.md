# Repository Guidelines

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS v4
- pnpm

## Commands
- `pnpm dev`
- `pnpm build`
- `pnpm lint`

## Project Structure
- `app/`: routes and page entry points
- `components/`: shared UI pieces
- `lib/site-data.ts`: current content source for pages
- `public/images/`: approved copied assets for the website

## Content Rules
- Treat `lib/site-data.ts` as the current structured content source.
- Source-of-truth planning and raw materials live in the Obsidian vault under:
  - `/Users/stanley/Library/Mobile Documents/iCloud~md~obsidian/Documents/LifeOSVault/01 Inbox/20260313 Stanley Website`
- Use product images only from the approved `site-assets/portfolio-images/` folder in the vault.
- Do not use exported images from `site-assets/20231221-portfolio/` for website UI. That package is text/reference only.

## Design Rules
- The site should feel like a personal builder, but remain credible for employers in medical and software industries.
- Avoid generic default landing-page aesthetics.
- Preserve light/dark compatibility.

## Editing Rules
- Keep changes small and explicit.
- Prefer updating shared data in `lib/site-data.ts` over hardcoding repeated content in page files.
- When adding new product pages, extend the `products` array first.
