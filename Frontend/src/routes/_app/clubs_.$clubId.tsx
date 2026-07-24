import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "./route";
import { ClubDetailsPage } from "@pages/clubs/ui/ClubDetailsPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/clubs/$clubId",
  component: ClubDetailsPage,
});
