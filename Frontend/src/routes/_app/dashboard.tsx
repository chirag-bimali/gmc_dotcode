import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "./route";
import { DashboardPage } from "@pages/dashboard/ui/DashboardPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/dashboard",
  component: DashboardPage,
});
