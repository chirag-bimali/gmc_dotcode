import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "./route";
import { DiscoverClubsPage } from "@pages/clubs/ui/DiscoverClubsPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/clubs",
  component: DiscoverClubsPage,
});
