import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "../route";
import { AdminClubManagementPage } from "@pages/admin/club-management/ui/AdminClubManagementPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/admin/club-management",
  component: AdminClubManagementPage,
});