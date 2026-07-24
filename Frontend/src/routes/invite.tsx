import { createRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Route as RootRoute } from "./__root";
import { InvitePage } from "@pages/invite/ui/InvitePage";

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "/invite",
  component: InvitePage,
  validateSearch: z.object({
    token: z.string().optional(),
  }),
});
