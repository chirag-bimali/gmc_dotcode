# Migration Notes

Issues, technical debt, and recommendations for improvement before rebuilding or scaling.

## Critical Issues

### 1. No Authentication Implementation

**Current state:** `auth-store.ts` is empty. Token read from `localStorage` without validation.
**Risk:** No login flow, no token refresh, no route guards, no session expiry handling.
**Recommendation:** Implement auth flow before going to production:
- Login page + auth store (Zustand)
- Route guards via TanStack Router's `beforeLoad` (redirect to login if no token)
- Token refresh interceptor (Axios response 401 → refresh → retry)
- Logout on token expiry

### 2. No Global Error Boundary

**Current state:** Only `notFoundComponent` exists per route. No `ErrorBoundary` wrapping the app.
**Risk:** Unhandled errors crash the entire app with a white screen.
**Recommendation:** Add React Error Boundary at the root and per-page level.

### 3. Toast/Notification System Commented Out

**Current state:** `queryCache.onError` has `toast.error()` calls commented out.
**Risk:** Users see no feedback when API calls fail silently.
**Recommendation:** Install a toast library (e.g., `sonner`) and wire it into the query/mutation error handlers.

---

## Technical Debt

### 4. Inconsistent Error Handling in API Functions

**Current state:** Entity API functions (e.g., `area.api.ts`) wrap every call in try/catch with `console.error` + rethrow.
**Problem:** This is redundant — the Axios interceptor already normalizes errors, and React Query handles retries/error state.
**Recommendation:** Remove try/catch from API functions. Let errors propagate naturally:
```typescript
// Before (redundant)
export const getAreas = async (): Promise<Area[]> => {
  try {
    const response = await http.get("/area");
    return (response.data as ApiResponse<Area[]>).data || [];
  } catch (error) {
    console.error("Error fetching areas:", error);
    throw error;
  }
};

// After (clean)
export const getAreas = async (): Promise<Area[]> => {
  const response = await http.get("/area");
  return (response.data as ApiResponse<Area[]>).data || [];
};
```

### 5. Inconsistent API Response Unwrapping

**Current state:** `getAreas()` handles both `ApiResponse<Area[]>` and raw `Area[]` (line 8-13 in area.api.ts).
**Problem:** Suggests the API contract isn't stable. Makes the code defensive in ways that hide bugs.
**Recommendation:** Standardize on a single API wrapper that always unwraps `ApiResponse<T>`:
```typescript
// shared/api/http.ts
export async function apiGet<T>(url: string): Promise<T> {
  const response = await http.get(url);
  const data = response.data as ApiResponse<T>;
  return data.data!;
}
```

### 6. Page Naming Convention is Verbose

**Current state:** Pages like `data-collection-form-draft-household-profile-economy` have 7-word names.
**Problem:** File paths become unwieldy. Hard to find things.
**Recommendation:** Use nested folders instead of flat naming:
```
pages/
└── data-collection/
    └── drafts/
        └── household/
            ├── member/
            ├── residence/
            ├── agriculture/
            ├── economy/
            └── health/
```

### 7. Some Pages Have Own API Layer (Breaking FSD)

**Current state:** `pages/master-setup-municipalities/api/` contains API calls.
**Problem:** In FSD, API calls belong in the `entities` layer, not `pages`.
**Recommendation:** Move page-specific APIs to their own entity slice, or promote them to `features/`.

### 8. `console.log` in Production Code

**Current state:** `env.ts` line 8 has `console.log(value)` for every env var.
**Recommendation:** Remove debug logging from config validation.

---

## Missing Abstractions

### 9. No Typed API Client Wrapper

**Current state:** Every API function manually casts `response.data as ApiResponse<T>`.
**Recommendation:** Create typed wrappers:
```typescript
export const api = {
  get: <T>(url: string) => http.get(url).then(r => (r.data as ApiResponse<T>).data!),
  post: <T, D>(url: string, data: D) => http.post(url, data).then(r => (r.data as ApiResponse<T>).data!),
  patch: <T, D>(url: string, data: D) => http.patch(url, data).then(r => (r.data as ApiResponse<T>).data!),
  delete: (url: string) => http.delete(url),
};
```

### 10. No Pagination Hook

**Current state:** `ApiResponse` has pagination fields (`page`, `totalCount`, `hasNext`), but no shared `usePaginatedQuery` hook.
**Recommendation:** Create a reusable paginated query hook that handles page state and returns pagination metadata.

### 11. No Loading Skeleton Components

**Current state:** No skeleton/shimmer components in `shared/ui/`.
**Recommendation:** Add `Skeleton` component for consistent loading states.

### 12. No Confirmation Dialog Pattern

**Current state:** Each page implements its own delete confirmation modal.
**Recommendation:** Create a shared `ConfirmDialog` component or use a promise-based confirm pattern.

---

## Performance Concerns

### 13. IndexedDB Persistence for All Case Stores

**Current state:** `useCaseTreeStore` persists the entire tree to IndexedDB on every state change.
**Risk:** Large surveys with many nodes will cause frequent, large IndexedDB writes.
**Recommendation:** Debounce persistence (Zustand has no built-in debounce for `persist`). Consider using `zustand-debounce` or throttling via a custom storage adapter.

### 14. No Image Optimization

**Current state:** Images in `shared/assets/` are raw PNG/SVG.
**Recommendation:** For any image-heavy pages, add `vite-imagetools` or use responsive images.

### 15. Query Retry on 4xx is Partially Disabled

**Current state:** `shouldRetry` has a bug — line 6 returns `false` for ANY response with a statusCode (not just 4xx). This effectively disables all retries for any API error that returns a structured response.
**Recommendation:** Fix the retry logic:
```typescript
const shouldRetry = (failureCount: number, error: unknown) => {
  if (failureCount >= 2) return false;
  const response = error as ApiResponse<object>;
  if (response?.statusCode >= 400 && response?.statusCode < 500 && response?.statusCode !== 429)
    return false;
  return true;
};
```
(Remove the standalone `if (response?.statusCode) return false;` check.)

---

## Scalability Issues

### 16. No i18n Foundation

**Current state:** All strings are hardcoded in English/Nepali.
**Risk:** If localization is needed later, it requires touching every component.
**Recommendation:** If multi-language is planned, add `react-intl` or `i18next` early.

### 17. No Role-Based Access Control

**Current state:** No permission system. All routes accessible to all users.
**Recommendation:** Add role/permission context that route guards and UI elements can check.

### 18. No WebSocket/Real-Time Infrastructure

**Current state:** Purely REST-based polling.
**Risk:** If real-time features are needed (notifications, live collaboration), there's no foundation.
**Recommendation:** Consider adding a WebSocket client if real-time sync of survey data between devices is planned.

---

## Recommended Refactors (Priority Order)

1. **Fix `shouldRetry` bug** — Immediate; currently breaks retry for all structured API errors
2. **Add Error Boundary** — Immediate; prevents white-screen crashes
3. **Implement auth flow** — Before production; security requirement
4. **Wire up toast notifications** — Before production; user feedback
5. **Remove redundant try/catch from API functions** — Low effort, cleaner code
6. **Add typed API wrapper (`api.get<T>`)** — Medium effort, eliminates casting boilerplate
7. **Restructure page naming** — Medium effort, improves DX for new developers
8. **Add pagination hook** — When more paginated endpoints appear
9. **Debounce IndexedDB persistence** — When survey size grows
10. **Move page-level APIs to entities** — Gradual; do during next feature work
