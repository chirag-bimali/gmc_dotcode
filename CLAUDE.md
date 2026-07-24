# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Hamro Student Hub — a university community platform for verified students to discover clubs, participate in communities, and attend events. Monorepo with `Backend/` (ASP.NET Core) and `Frontend/` (React).

## Commands

### Backend (.NET 10)

```bash
cd Backend
dotnet build                          # Build all projects
dotnet run --project Hub.API          # Run API (http://localhost:5207)
dotnet test                           # Run tests (when added)
```

### Frontend (React + Vite)

```bash
cd Frontend
npm install                           # Install dependencies
npm run dev                           # Dev server (http://localhost:5173)
npm run build                         # TypeScript check + production build
npm run lint                          # ESLint (flat config)
npm run format                        # Prettier
npm run test                          # Vitest unit tests
npm run test:e2e                      # Playwright E2E tests
```

## Architecture

### Backend — Clean Architecture

```
Hub.API            → ASP.NET Core Web API entry point
Hub.Application    → Use cases, DTOs, interfaces (references Domain)
Hub.Domain         → Entities, enums, value objects (no dependencies)
Hub.Infrastructure → EF Core, external services (references Application)
```

Solution file: `Backend/Hub.slnx`. Database: PostgreSQL (planned, EF Core not yet wired). Domain entities are fully defined at `Hub.Domain/Entities/` with Data Annotations ready for EF Core mapping.

### Frontend — Feature-Sliced Design (FSD)

Layers in `Frontend/src/` with strict import rules (each layer can only import from layers below it):

```
app/       → Entry point, providers, router config, global styles
routes/    → File-based routing (TanStack Router, auto-generates routeTree.gen.ts)
pages/     → Page compositions
widgets/   → Complex UI blocks (not yet populated)
features/  → User interactions/actions (not yet populated)
entities/  → Business entities (not yet populated)
shared/    → Reusable infrastructure: api/, config/, lib/, model/, store/, ui/, util/
```

Key tech: React 19 · TypeScript 5.9 · TanStack Router (file-based) · TanStack Query 5 · Zustand 5 · React Hook Form + Zod 4 · Tailwind CSS 4 · Vitest · Playwright

### Path Aliases (Frontend)

`@app/*`, `@components/*`, `@providers/*`, `@pages/*`, `@widgets/*`, `@features/*`, `@entities/*`, `@shared/*` — all resolve to `./src/<layer>/*`.

### API Contract

Standardized `ApiResponse<T>` envelope defined at `shared/model/`. Backend should return responses in this shape.

### Environment Variables (Frontend)

Validated at startup via Zod (`shared/config/env.ts`):
- `VITE_API_BASE_URL` — Backend API URL (default: `http://localhost:5242/api`)
- `VITE_APP_NAME` — Display name
- `VITE_ENV` — `development` | `staging` | `production`

## Design System

Grayscale palette, 8px spacing grid, Inter font. CSS variables and Tailwind theme defined in `app/styles/index.css`. UI components use CVA (class-variance-authority) for variants. See `Frontend/Design.md` for full spec.

## Key Conventions

- Backend follows CQRS-lite pattern: commands/queries in Application layer, handlers as services
- Frontend forms use React Hook Form with Zod schemas; server errors mapped via `shared/util/mapServerErrors`
- Zustand stores use persist middleware for client-side state that survives refresh
- TanStack Router generates route types automatically — run `npm run dev` to regenerate `routeTree.gen.ts` after adding routes
- Component styling: Tailwind utility classes + `cn()` helper from `shared/lib/` for conditional merging
