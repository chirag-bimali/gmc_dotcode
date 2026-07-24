# Project Structure

## Directory Tree

```
mis-frontend/
├── .env.development              # Dev environment variables
├── .env.example.development      # Template for dev env
├── .env.production               # Production environment variables
├── .github/workflows/            # CI: Playwright E2E
├── eslint.config.ts              # ESLint 9 flat config
├── index.html                    # SPA entry HTML
├── package.json                  # Dependencies & scripts
├── playwright.config.ts          # E2E test configuration
├── tailwind.config.ts            # Tailwind content paths
├── tsconfig.json                 # TS project references
├── tsconfig.app.json             # App TS config (path aliases)
├── tsconfig.node.json            # Node TS config (vite, etc.)
├── vite.config.ts                # Vite + plugins
├── vitest.config.ts              # Unit test config
├── public/                       # Static assets (served as-is)
│   ├── favicon.svg
│   └── icons.svg
├── tests-e2e/                    # Playwright E2E tests
│   └── example.spec.ts
└── src/
    ├── app/                      # APP LAYER
    ├── components/               # WIDGETS LAYER (navigation)
    ├── entities/                 # ENTITIES LAYER
    ├── features/                 # FEATURES LAYER (thin)
    ├── pages/                    # PAGES LAYER
    ├── routes/                   # FILE-BASED ROUTES
    ├── shared/                   # SHARED LAYER
    └── tests/                    # Test setup
```

## Layer Details

### `src/app/` — Application Shell

Entry point, providers, router instance, global styles.

```
app/
├── main.tsx                      # React root: StrictMode > QueryClientProvider > RouterProvider
├── router.ts                     # createRouter(routeTree)
├── routeTree.gen.ts              # Auto-generated (gitignored)
├── vite-env.d.ts                 # Vite client type declarations
├── providers/
│   └── QueryClientProvider.tsx   # PersistQueryClientProvider wrapper
└── styles/
    └── index.css                 # Full design system (CSS vars + Tailwind @theme)
```

### `src/routes/` — File-Based Routing

TanStack Router convention. Directory structure = URL structure.

```
routes/
├── __root.tsx                    # Root route (Outlet + DevTools + 404)
├── index.tsx                     # "/" → redirect to "/dashboard"
└── _app/                         # Layout route (sidebar + breadcrumbs)
    ├── route.tsx                 # Layout: SidebarNavMenu + Breadcrumbs + Outlet
    ├── dashboard.tsx             # /dashboard
    ├── reports.tsx               # /reports
    ├── bulk-import.tsx           # /bulk-import
    ├── master-setup/             # /master-setup/*
    │   ├── route.tsx             # Layout: breadcrumb context
    │   ├── index.tsx             # /master-setup
    │   ├── municipalities.tsx    # /master-setup/municipalities
    │   ├── wards.tsx             # /master-setup/wards
    │   ├── toles.tsx
    │   ├── departments.tsx
    │   ├── programs.tsx
    │   ├── fiscal-years.tsx
    │   └── survey-options.tsx
    └── data-collection/          # /data-collection/*
        ├── route.tsx             # Layout: breadcrumb
        ├── index.tsx             # /data-collection
        └── forms/drafts/         # /data-collection/forms/drafts/*
            ├── route.tsx
            ├── index.tsx
            └── $caseId/          # Dynamic: /forms/drafts/:caseId
                ├── route.tsx
                ├── house-profile/
                ├── household-profile/
                │   └── $householdId/  # Dynamic: .../:householdId
                │       ├── member-details.tsx
                │       ├── residence.tsx
                │       ├── agriculture.tsx
                │       ├── economic.tsx
                │       ├── health.tsx
                │       ├── facilities.tsx
                │       ├── livestock.tsx
                │       ├── disaster.tsx
                │       ├── decision-making.tsx
                │       └── social-cultural.tsx
                └── institute-profile/
```

### `src/pages/` — Page Components

Each page is a self-contained slice with its own model, UI, and (sometimes) API layer.

```
pages/
├── dashboard/                    # Dashboard page
├── data-collection/              # Data collection listing
├── data-collection-form-drafts/  # Draft management table
├── data-collection-form-draft-navigation/  # Form category navigation
├── data-collection-form-draft-household-profile-navigation/  # Household list
├── data-collection-form-draft-household-profile-member/       # Member form
├── data-collection-form-draft-household-profile-residence/    # Residence form
├── data-collection-form-draft-household-profile-agriculture/  # Agriculture form
├── data-collection-form-draft-household-profile-economy/      # Economy form
├── data-collection-form-draft-household-profile-health/       # Health form
├── data-collection-form-draft-household-profile-facility/     # Facility form
├── master-setup/                 # Master setup landing page
├── master-setup-municipalities/  # Municipality CRUD
├── master-setup-wards/           # Ward CRUD
├── master-setup-toles/           # Tole listing
├── master-setup-departments/     # Department listing
├── master-setup-fiscal-years/    # Fiscal year listing
├── master-setup-programs/        # Program listing
└── master-setup-survey-options/  # Survey option CRUD
```

**Page internal structure:**
```
page-name/
├── index.ts           # Public barrel export
├── model/             # Types, Zod schemas, form options
│   ├── types.ts
│   └── options.ts     # (form select options)
├── api/               # API calls (if page-specific)
├── lib/               # Page-specific utilities
└── ui/                # Page component + sub-components
    ├── index.ts
    ├── PageComponent.tsx
    └── components/    # Page-specific child components
```

### `src/entities/` — Domain Entities

Core business objects with full CRUD infrastructure.

```
entities/
├── area/              # Municipality area management
│   ├── api/           # getAreas, createArea, updateArea, deleteArea
│   ├── hooks/         # useAreas, useAreaDetail, useAreaMutation
│   └── model/         # Area type, areaKeys factory
├── case/              # Survey case (offline-first)
│   ├── catalog/       # Category node factories
│   └── model/         # 4 Zustand stores (draft, tree, form, UI)
├── district/          # District entity (same pattern as area)
│   ├── api/
│   ├── hooks/
│   └── model/
└── option/            # Survey option entity
    ├── api/           # option-item + option-list APIs
    ├── hooks/         # Queries + mutations for both
    └── model/
```

### `src/shared/` — Shared Infrastructure

Cross-cutting concerns available to all layers.

```
shared/
├── api/               # HTTP client + QueryClient
│   ├── http.ts        # Axios instance (auth interceptor, error normalization)
│   └── query-client.ts  # QueryClient config (stale/gc/retry)
├── assets/            # Images, SVGs
├── config/
│   ├── env.ts         # Validated VITE_ environment variables
│   └── router.ts      # RouteContext type definition
├── lib/
│   ├── cn.ts          # clsx + tailwind-merge
│   ├── idb-persist-storage.ts  # Zustand StateStorage → IndexedDB
│   ├── query-persister.ts      # TanStack Query → IndexedDB persister
│   └── optionItemToSelectOption.ts
├── model/
│   ├── ApiResponse.ts   # Generic API response envelope type
│   ├── option.ts        # Shared OptionItem/OptionList Zod schemas
│   └── toggle.ts        # ToggleOption type
├── store/
│   ├── auth-store.ts    # Auth store (placeholder)
│   └── ui-store.ts      # Theme + sidebar state
├── ui/                  # Design system primitives
│   ├── Button/          # CVA button (primary/secondary/ghost/danger/outline)
│   ├── ButtonLink/      # Router-aware link styled as button
│   ├── Input/           # Input, Select, SearchSelect, Textarea, ToggleField, FormField
│   ├── MasterSetupHeader/  # Section header + table layout
│   └── Modal/           # Overlay modal
└── util/
    ├── mapServerErrors.ts   # API validation → RHF errors
    └── pickDirtyFields.ts   # Dirty field extraction for PATCH
```

### `src/components/` — Widget Components

Complex composed components (currently: navigation).

```
components/
└── navigation/
    ├── model/
    │   └── sidebar-items.ts    # Navigation configuration (routes, icons, groups)
    └── ui/
        ├── SidebarNavMenu.tsx  # Main sidebar layout
        ├── SidebarNavItem.tsx  # Individual nav item
        ├── SidebarSectionTitle.tsx
        └── BreadCrumbs.tsx     # Route-aware breadcrumb
```

## Path Aliases

Defined in `tsconfig.app.json`:

| Alias | Maps To |
|-------|---------|
| `@app/*` | `./src/app/*` |
| `@components/*` | `./src/components/*` |
| `@providers/*` | `./src/app/providers/*` |
| `@pages/*` | `./src/pages/*` |
| `@widgets/*` | `./src/widgets/*` |
| `@features/*` | `./src/features/*` |
| `@entities/*` | `./src/entities/*` |
| `@shared/*` | `./src/shared/*` |
