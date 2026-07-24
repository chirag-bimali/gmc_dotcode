import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "../route";
import { AdminStudentsPage } from "@pages/admin/students/ui/AdminStudentsPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/admin/students",
  component: AdminStudentsPage,
});
