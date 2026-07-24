import { createRoute } from "@tanstack/react-router";
import { Route as AppRoute } from "./route";
import { EventDetailPage } from "@pages/events/ui/EventDetailPage";

export const Route = createRoute({
  getParentRoute: () => AppRoute,
  path: "/events/$eventId",
  component: EventDetailPage,
});
