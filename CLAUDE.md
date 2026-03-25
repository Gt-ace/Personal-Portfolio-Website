# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (port 5000, Vite HMR + Express)
npm run build        # Build client (Vite) + server (esbuild) to dist/
npm run start        # Run production server (NODE_ENV=production)
npm run check        # TypeScript type checking (tsc, no emit)
npm run db:push      # Push Drizzle schema changes to PostgreSQL
```

## Architecture

Full-stack TypeScript portfolio website. Single Express server (port 5000) serves both the API and the React SPA.

**Client** (`client/`): React 18 + wouter routing + TanStack React Query + Tailwind CSS + shadcn/ui (Radix). Framer Motion for animations. Pages: Home, Projects, Contact, 404. `ParticleBackground` component renders on all pages.

**Server** (`server/`): Express with session auth (Passport). In dev, Vite runs as Express middleware for HMR. In production, serves pre-built static files from `dist/public/`. API routes under `/api/*`. Storage layer uses an interface pattern (`IStorage`) with in-memory implementation (`MemStorage`).

**Shared** (`shared/schema.ts`): Drizzle ORM schema + Zod validation schemas, imported by both client and server for type safety across the network boundary.

**Database**: PostgreSQL via Neon serverless. Drizzle ORM for schema definition, Drizzle Kit for migrations.

## Path Aliases

- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/`

## Theming

Dark mode by default (`theme.json`: appearance "dark", variant "professional", primary white). Tailwind uses CSS variable-based HSL colors. shadcn/ui components are pre-installed in `client/src/components/ui/`.

## Key Patterns

- Client fetches use `apiRequest()` from `lib/queryClient.ts` (includes credentials for session cookies)
- React Query manages server state; `getQueryFn()` is a typed fetch wrapper
- wouter handles client routing (lightweight, not react-router)
- Server logging middleware auto-logs all `/api` requests with status codes
