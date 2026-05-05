# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### interX (`artifacts/interx`)
- **Type**: react-vite
- **Preview path**: `/`
- **Description**: Cross-border second-hand e-commerce landing page
- **Stack**: React + Vite + Tailwind CSS v4 + Framer Motion
- **Theme**: Always-dark (black bg, neon green `#39FF14` → electric blue `#0022FF` gradient accent)
- **Fonts**: Space Grotesk (body), Space Mono (logo/mono)
- **Sections**: Navbar, Hero, SearchBar, CategoryStrip, StatsStrip, ListingsGrid, HowItWorks, Footer
- **Components**: All modular in `src/components/`
- **Pages**: Home (`/`), ProductDetail (`/product/:id`), CreateListing (`/sell`)
- **i18n**: `src/lib/i18n.ts` (EN/ZH/KO translations), `src/contexts/LanguageContext.tsx` (React context + `useLang()` hook). Language persisted in `localStorage`. Toggle in Navbar (desktop: dropdown, mobile: cycle button). Every component/page uses `useLang()`.

### API Server (`artifacts/api-server`)
- Express 5 backend serving `/api`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Dark Mode Note
Dark mode is always-on for interX. The `dark` class is set on the `<html>` element in `index.html`. Do NOT use `@apply dark` in CSS — Tailwind v4 does not support that.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
