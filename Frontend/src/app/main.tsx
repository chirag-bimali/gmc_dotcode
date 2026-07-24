import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import "./styles/index.css";
import "@shared/config/env";
import { router } from "./router";
import { QueryClientProvider } from "./providers/QueryClientProvider";
import { enableMocking } from "@shared/mocks";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found");
}

enableMocking().then(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
});
