# Boilerplate Checklist

Minimal files needed to recreate this architecture from scratch.

## Foundation (must create first)

- [ ] `package.json` — ESM type, all dependencies
- [ ] `tsconfig.json` + `tsconfig.app.json` + `tsconfig.node.json` — path aliases
- [ ] `vite.config.ts` — Tailwind plugin + TanStack Router plugin + React plugin + aliases
- [ ] `eslint.config.ts` — flat config with TS, React hooks, FSD steiger
- [ ] `index.html` — SPA shell with `<div id="root">`
- [ ] `.env.development` + `.env.example.development`

## App Layer

- [ ] `src/app/main.tsx` — StrictMode > QueryClientProvider > RouterProvider
- [ ] `src/app/router.ts` — `createRouter({ routeTree })`
- [ ] `src/app/providers/QueryClientProvider.tsx` — PersistQueryClientProvider
- [ ] `src/app/styles/index.css` — Design system (CSS variables + @theme + base styles)

## Shared Layer

- [ ] `src/shared/api/http.ts` — Axios instance with auth interceptor + error normalization
- [ ] `src/shared/api/query-client.ts` — QueryClient with stale/gc/retry config
- [ ] `src/shared/api/index.ts` — Barrel export
- [ ] `src/shared/config/env.ts` — Validated environment variables
- [ ] `src/shared/config/router.ts` — RouteContext type
- [ ] `src/shared/lib/cn.ts` — clsx + tailwind-merge
- [ ] `src/shared/lib/idb-persist-storage.ts` — Zustand StateStorage adapter for IndexedDB
- [ ] `src/shared/lib/query-persister.ts` — TanStack Query IndexedDB persister
- [ ] `src/shared/model/ApiResponse.ts` — Generic API response envelope type
- [ ] `src/shared/store/ui-store.ts` — Theme + sidebar Zustand store
- [ ] `src/shared/util/mapServerErrors.ts` — API errors → RHF field errors
- [ ] `src/shared/util/pickDirtyFields.ts` — Extract dirty fields for PATCH

## Shared UI (Design System Primitives)

- [ ] `src/shared/ui/Button/Button.tsx` — CVA button (primary/secondary/ghost/danger/outline)
- [ ] `src/shared/ui/Input/Input.tsx` — Base text input
- [ ] `src/shared/ui/Input/FormField.tsx` — Label + input + error wrapper
- [ ] `src/shared/ui/Input/Select.tsx` — Native select
- [ ] `src/shared/ui/Input/SearchSelect.tsx` — Searchable dropdown
- [ ] `src/shared/ui/Input/Textarea.tsx` — Textarea
- [ ] `src/shared/ui/Input/ToggleField.tsx` — Radio pill toggle
- [ ] `src/shared/ui/Modal/Modal.tsx` — Overlay modal

## Routes (File-Based)

- [ ] `src/routes/__root.tsx` — Root with Outlet + DevTools + 404
- [ ] `src/routes/index.tsx` — Redirect "/" → "/dashboard"
- [ ] `src/routes/_app/route.tsx` — Layout (sidebar + breadcrumbs + outlet)
- [ ] `src/routes/_app/dashboard.tsx` — First page

## Navigation Widget

- [ ] `src/components/navigation/model/sidebar-items.ts` — Nav config
- [ ] `src/components/navigation/ui/SidebarNavMenu.tsx` — Sidebar layout
- [ ] `src/components/navigation/ui/SidebarNavItem.tsx` — Nav item
- [ ] `src/components/navigation/ui/BreadCrumbs.tsx` — Route-aware breadcrumbs

## Entity Template (copy per domain entity)

- [ ] `src/entities/{name}/index.ts` — Barrel export
- [ ] `src/entities/{name}/api/{name}.api.ts` — CRUD HTTP functions
- [ ] `src/entities/{name}/model/types.ts` — Zod schema + inferred TS types
- [ ] `src/entities/{name}/model/{name}.key.ts` — Query key factory
- [ ] `src/entities/{name}/hooks/{name}.query.ts` — useQuery hooks
- [ ] `src/entities/{name}/hooks/{name}.mutation.ts` — useMutation hooks

## Page Template (copy per page)

- [ ] `src/pages/{name}/index.ts` — Barrel export
- [ ] `src/pages/{name}/model/types.ts` — Page-specific types
- [ ] `src/pages/{name}/ui/{PageName}.tsx` — Main page component
- [ ] `src/routes/_app/{name}.tsx` — Route file importing page component

## Testing

- [ ] `src/tests/setup.ts` — `import "@testing-library/jest-dom"`
- [ ] `vitest.config.ts` — jsdom environment
- [ ] `playwright.config.ts` — Multi-browser E2E
- [ ] `tests-e2e/example.spec.ts` — Smoke test

## CI

- [ ] `.github/workflows/playwright.yml` — E2E on push

---

## Minimal Starter (absolute minimum to boot)

If you want the app running with just a sidebar, dashboard page, and one entity:

```
src/
├── app/
│   ├── main.tsx
│   ├── router.ts
│   ├── providers/QueryClientProvider.tsx
│   └── styles/index.css
├── routes/
│   ├── __root.tsx
│   ├── index.tsx
│   └── _app/
│       ├── route.tsx
│       └── dashboard.tsx
├── components/navigation/
│   ├── model/sidebar-items.ts
│   └── ui/SidebarNavMenu.tsx, BreadCrumbs.tsx
├── entities/example/
│   ├── api/example.api.ts
│   ├── model/types.ts, example.key.ts
│   └── hooks/example.query.ts, example.mutation.ts
├── pages/dashboard/
│   └── ui/DashboardPage.tsx
├── shared/
│   ├── api/http.ts, query-client.ts
│   ├── config/env.ts, router.ts
│   ├── lib/cn.ts, idb-persist-storage.ts, query-persister.ts
│   ├── model/ApiResponse.ts
│   ├── store/ui-store.ts
│   ├── ui/Button/, Input/, Modal/
│   └── util/mapServerErrors.ts, pickDirtyFields.ts
└── tests/setup.ts
```

Total: ~35 files to get a fully functional boilerplate with the same architecture.
