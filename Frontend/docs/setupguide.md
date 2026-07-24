# Setup Guide

## Prerequisites

- Node.js 20+ (ESM support required)
- npm 10+

## 1. package.json Dependencies

### Production Dependencies

```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "@tanstack/react-router": "^1.168.0",
    "@tanstack/react-query": "^5.95.0",
    "@tanstack/react-query-persist-client": "^5.95.0",
    "zustand": "^5.0.0",
    "axios": "^1.16.0",
    "react-hook-form": "^7.72.0",
    "@hookform/resolvers": "^5.2.0",
    "zod": "^4.3.0",
    "idb-keyval": "^6.2.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^3.3.0",
    "lucide-react": "^1.7.0"
  }
}
```

### Development Dependencies

```json
{
  "devDependencies": {
    "typescript": "^5.9.0",
    "vite": "^8.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "@tailwindcss/vite": "^4.2.0",
    "tailwindcss": "^4.2.0",
    "@tanstack/router-plugin": "^1.168.0",
    "@tanstack/react-router-devtools": "^1.168.0",
    "@tanstack/react-query-devtools": "^5.95.0",
    "eslint": "^9.39.0",
    "typescript-eslint": "^8.0.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.0",
    "@feature-sliced/steiger-plugin": "^0.3.0",
    "prettier": "^3.8.0",
    "vitest": "^4.1.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "jsdom": "^26.0.0",
    "@playwright/test": "^1.58.0"
  }
}
```

## 2. TypeScript Configuration

### tsconfig.json (project references)

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

### tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "paths": {
      "@app/*": ["./src/app/*"],
      "@components/*": ["./src/components/*"],
      "@providers/*": ["./src/app/providers/*"],
      "@pages/*": ["./src/pages/*"],
      "@widgets/*": ["./src/widgets/*"],
      "@features/*": ["./src/features/*"],
      "@entities/*": ["./src/entities/*"],
      "@shared/*": ["./src/shared/*"]
    }
  },
  "include": ["src"]
}
```

### tsconfig.node.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  },
  "include": ["vite.config.ts", "eslint.config.ts", "tailwind.config.ts", "vitest.config.ts"]
}
```

## 3. Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    TanStackRouterVite({
      autoCodeSplitting: true,
      routeTreeFileHeader: ["/* eslint-disable */"],
      generatedRouteTree: "./src/app/routeTree.gen.ts",
      routesDirectory: "./src/routes",
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@app": "/src/app",
      "@components": "/src/components",
      "@providers": "/src/app/providers",
      "@pages": "/src/pages",
      "@widgets": "/src/widgets",
      "@features": "/src/features",
      "@entities": "/src/entities",
      "@shared": "/src/shared",
    },
  },
});
```

## 4. ESLint Configuration

```typescript
// eslint.config.ts
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  { ignores: ["dist", "src/app/routeTree.gen.ts"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
  {
    files: ["src/routes/**"],
    rules: { "react-refresh/only-export-components": "off" },
  },
);
```

## 5. Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
} satisfies Config;
```

Note: The actual design system is defined in `src/app/styles/index.css` using Tailwind 4's `@theme` directive and CSS custom properties.

## 6. Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
  },
});
```

## 7. Environment Variables

```bash
# .env.example.development
VITE_APP_NAME=MIS
VITE_API_BASE_URL=http://localhost:5242/api
VITE_ENV=development
```

**Required variables:**
| Variable | Description |
|----------|-------------|
| `VITE_APP_NAME` | Application display name |
| `VITE_API_BASE_URL` | Backend API base URL (no trailing slash) |
| `VITE_ENV` | Environment: `development` / `staging` / `production` |

All are validated at startup via `src/shared/config/env.ts`. The app crashes immediately with a clear error if any are missing.

## 8. Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "vitest",
    "test:e2e": "playwright test"
  }
}
```

## 9. Quick Start

```bash
# Clone and install
git clone <repo-url> && cd mis-frontend
npm install

# Set up environment
cp .env.example.development .env.development
# Edit .env.development with your API URL

# Start development
npm run dev
# App runs at http://localhost:5173

# Run tests
npm test              # Unit tests (Vitest)
npx playwright test   # E2E tests
```
