import { useNavigate, useRouterState } from "@tanstack/react-router";
import { GraduationCap, LogOut } from "lucide-react";
import { useAuthStore } from "@shared/store/auth-store";
import { mainNavItems, adminNavItems } from "../model/sidebar-items";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const isAdmin = user?.role === "UniversityAdmin";

  function handleNav(href: string) {
    navigate({ to: href as "/" });
    onClose();
  }

  function handleLogout() {
    logout();
    navigate({ to: "/login" });
  }

  return (
    <div
      className={`fixed inset-0 z-[60] flex md:hidden ${open ? "" : "pointer-events-none"}`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-black">Student Hub</h1>
            <p className="text-xs text-neutral-500">Menu</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <button
                key={item.label}
                onClick={() => handleNav(item.href)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-[13px] font-medium transition-colors ${
                  isActive
                    ? "bg-neutral-100 text-black font-bold"
                    : "text-neutral-500 hover:bg-neutral-50"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}

          {isAdmin && (
            <>
              <div className="pt-3 mt-3 border-t border-neutral-200">
                <span className="px-3 text-[10px] uppercase tracking-widest text-neutral-400 font-medium">
                  Admin
                </span>
              </div>
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href || pathname.startsWith(item.href + "/");

                return (
                  <button
                    key={item.label}
                    onClick={() => handleNav(item.href)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-[13px] font-medium transition-colors ${
                      isActive
                        ? "bg-neutral-100 text-black font-bold"
                        : "text-neutral-500 hover:bg-neutral-50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                );
              })}
            </>
          )}
        </nav>

        {/* Logout */}
        <div className="border-t border-neutral-200 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-[13px] font-medium text-neutral-500 hover:bg-neutral-50"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
}
