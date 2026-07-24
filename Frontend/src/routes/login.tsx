import { createRoute, redirect } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import { LoginPage } from "@pages/login/ui/LoginPage";
import { getMe } from "@features/auth/api/getMe";

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: "/login",
  component: LoginPage,
  beforeLoad: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      await getMe();
      throw redirect({ to: "/dashboard" });
    } catch (e) {
      if (e instanceof Error && "to" in e) throw e;
    }
  },
});
