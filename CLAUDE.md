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

## Interaction Design

All interactive elements must feel alive and premium. When adding or modifying buttons, cards, links, or any clickable element, always apply:

- **Spring physics**: Use Framer Motion `type: "spring"` with `stiffness: 300–400`, `damping: 15–20` — never use linear or duration-based transitions for interactions.
- **Hover lift**: Cards and large clickables lift on hover (`y: -4` to `-6`) with a subtle border brighten (`white/[0.06]` → `white/[0.15]`).
- **Tap response**: Every clickable must have `whileTap` — scale down to `0.95–0.98` for a satisfying press feel.
- **Glow accents**: Cards use a top-edge gradient glow (`from-transparent via-white/20 to-transparent`) that appears on hover.
- **Link nudge**: Text links shift right (`x: 2`) on hover with spring physics.
- **Navbar active indicator**: Uses Framer Motion `layoutId` for an animated pill that slides between active nav items.
- **Tech tags**: Subtle `scale: 1.05` on hover with background/border brighten.
- **No dead elements**: If it's clickable, it must visibly react to hover and press. Static-looking buttons are not acceptable.
