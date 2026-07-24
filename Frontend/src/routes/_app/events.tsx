import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "./route";
import { EventsPage } from "@pages/events/ui/EventsPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/events",
  component: EventsPage,
});
