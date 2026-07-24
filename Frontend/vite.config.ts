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
