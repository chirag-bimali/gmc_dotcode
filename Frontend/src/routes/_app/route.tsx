import { useState, useEffect } from "react";
import { Outlet, createRoute, redirect, useRouterState } from "@tanstack/react-router";
import { Route as RootRoute } from "../__root";
import { getMe } from "@features/auth/api/getMe";
import { Sidebar } from "@components/navigation/ui/Sidebar";
import { Topbar } from "@components/navigation/ui/Topbar";
import { MobileDrawer } from "@components/navigation/ui/MobileDrawer";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/clubs": "Discover Clubs",
  "/my-clubs": "My Clubs",
  "/events": "Events",
  "/notifications": "Notifications",
  "/profile": "Profile",
  "/analytics": "Analytics",
  "/settings": "Settings",
  "/admin/club-management": "Club Management",
};

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const title = pageTitles[pathname] ?? "Student Hub";

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1024 && window.innerWidth >= 768 && !collapsed) {
        setCollapsed(true);
      } else if (window.innerWidth >= 1024 && collapsed) {
        setCollapsed(false);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [collapsed]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Desktop sidebar */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      {/* Mobile drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Main wrapper */}
      <div
        className={`flex flex-col min-h-screen transition-[padding-left] duration-200 ease-in-out ${
          collapsed ? "md:pl-16" : "md:pl-60"
        }`}
      >
        <Topbar
          title={title}
          sidebarCollapsed={collapsed}
          onMenuOpen={() => setDrawerOpen(true)}
        />

        {/* Page content */}
        <main className="mt-16 flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-[1100px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  id: "app",
  component: AppLayout,
  beforeLoad: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw redirect({ to: "/login" });
    }

    try {
      await getMe();
    } catch {
      localStorage.removeItem("accessToken");
      throw redirect({ to: "/login" });
    }
  },
});
