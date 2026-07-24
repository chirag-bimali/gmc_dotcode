# Architecture

## Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 19.2.4 |
| Language | TypeScript | 5.9.3 |
| Build Tool | Vite | 8.0.12 |
| Package Manager | npm | (lockfile: package-lock.json) |
| Routing | TanStack Router (file-based) | 1.168.4 |
| Server State | TanStack React Query + persist-client | 5.95.2 |
| Client State | Zustand (with middleware) | 5.0.12 |
| HTTP Client | Axios | 1.16.0 |
| Forms | React Hook Form + @hookform/resolvers | 7.72.0 |
| Validation | Zod | 4.3.6 |
| Styling | Tailwind CSS 4 (CSS-first config) | 4.2.2 |
| Component Variants | class-variance-authority (CVA) | 0.7.1 |
| Class Merging | clsx + tailwind-merge | - |
| Icons | lucide-react | 1.7.0 |
| Offline Storage | idb-keyval (IndexedDB) | 6.2.2 |
| Unit Testing | Vitest + @testing-library/react | 4.1.2 |
| E2E Testing | Playwright | 1.58.2 |
| Linting | ESLint 9 (flat config) + @feature-sliced/steiger-plugin | 9.39.4 |
| Formatting | Prettier | 3.8.1 |

## Architectural Methodology: Feature-Sliced Design (FSD)

The project follows [Feature-Sliced Design](https://feature-sliced.design/) with enforcement via the `@feature-sliced/steiger-plugin` ESLint plugin.

### Layer Hierarchy (top to bottom)

```
app/        → Entry point, providers, global config, styles
routes/     → File-based route definitions (TanStack Router convention)
pages/      → Page-level compositions (full screens)
widgets/    → (mapped to components/) Complex composed UI blocks
features/   → User-facing interactions (Inferred: currently thin)
entities/   → Business domain models with API, hooks, model slices
shared/     → Reusable UI, utilities, API client, config, types
```

### Import Rules

Each layer may only import from layers below it:
- `app` → can import from all layers
- `pages` → can import from `entities`, `shared`
- `entities` → can import from `shared` only
- `shared` → cannot import from any higher layer

### Slice Structure (within each layer)

Each slice follows a consistent internal structure:
```
entity-name/
├── index.ts        # Public API (barrel export)
├── api/            # HTTP functions (CRUD operations)
├── hooks/          # React Query hooks (useQuery/useMutation)
├── model/          # Types, Zod schemas, query keys, stores
├── lib/            # Internal utilities
├── ui/             # React components
└── catalog/        # Static data / factory functions (if needed)
```

## Key Architectural Decisions

### 1. Offline-First Data Collection

Survey drafts persist to **IndexedDB** via `idb-keyval` + Zustand `persist` middleware. This enables field workers to collect household data without network connectivity.

### 2. Query Persistence

React Query results are cached to IndexedDB (opt-in per query via `meta: { persist: true }`). Cache survives page refreshes for up to 24 hours.

### 3. File-Based Routing with Auto Code-Splitting

TanStack Router Vite plugin generates the route tree from `src/routes/` filesystem. Every route is automatically code-split — no manual lazy loading.

### 4. CSS Variable Design System

A full design system is implemented via CSS custom properties (`--mis-*` prefix) with light/dark theme support via `[data-theme]` attribute. Tailwind 4's `@theme` directive maps these to utility classes.

### 5. Backend Contract

The backend is a .NET API. The frontend mirrors the API response envelope:
```typescript
type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: ApiError;
  statusCode: number;
  timestamp: Date;
  // pagination fields
  page?: number; pageSize?: number; totalCount?: number;
  hasNext?: boolean; hasPrevious?: boolean;
}
```

### 6. Authentication (Minimal)

Token is stored in `localStorage` as `accessToken`. Axios request interceptor attaches `Bearer` token. No auth guards or login flow exist yet — this is a placeholder.

## Component Design Patterns

| Pattern | Implementation |
|---------|---------------|
| Variant-based components | CVA (`class-variance-authority`) for Button, Input |
| Class composition | `cn()` = `clsx` + `twMerge` |
| Form fields | `FormField` wrapper: label + input + error display |
| Server error mapping | `mapServerErrors`: PascalCase API errors → camelCase RHF fields |
| Partial updates | `pickDirtyFields`: only PATCH modified fields |
| Query keys | Factory pattern: `entityKeys.list()`, `entityKeys.detail(id)` |

## State Ownership

| State Type | Owner | Persistence |
|-----------|-------|-------------|
| Server data | React Query | IndexedDB (24h, opt-in) |
| UI preferences (theme, sidebar) | Zustand `useUiStore` | localStorage |
| Case drafts | Zustand `useCaseDraftStore` | IndexedDB |
| Case tree structure | Zustand `useCaseTreeStore` | IndexedDB |
| Form draft values | Zustand `useFormDraftStore` | IndexedDB |
| Transient UI state (selections) | Zustand `useCaseUiStore` | None |
| Auth token | Raw localStorage | localStorage |
