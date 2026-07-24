import { useNavigate, useRouterState } from "@tanstack/react-router";
import { GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuthStore } from "@shared/store/auth-store";
import { mainNavItems, adminNavItems, bottomNavItems, type SidebarItem } from "../model/sidebar-items";

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const isAdmin = user?.role === "UniversityAdmin";

  return (
    <aside
      className={`fixed left-0 top-0 h-full hidden md:flex flex-col bg-black z-50 shadow-sm transition-[width] duration-200 ease-in-out ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-4 overflow-hidden">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-white">
          <GraduationCap className="h-5 w-5 text-black" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold text-white whitespace-nowrap">
            Student Hub
          </span>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm text-black hover:bg-neutral-50 z-10"
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>

      {/* Main nav */}
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto px-2 py-4 scrollbar-thin">
        {mainNavItems.map((item) => (
          <NavButton key={item.label} item={item} pathname={pathname} collapsed={collapsed} navigate={navigate} />
        ))}

        {/* Admin section */}
        {isAdmin && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-1">
            {!collapsed && (
              <span className="px-3 text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                Admin
              </span>
            )}
            {adminNavItems.map((item) => (
              <NavButton key={item.label} item={item} pathname={pathname} collapsed={collapsed} navigate={navigate} />
            ))}
          </div>
        )}

        {/* Bottom section */}
        <div className="mt-auto pt-4 border-t border-white/10 space-y-1">
          {bottomNavItems.map((item) => (
            <NavButton key={item.label} item={item} pathname={pathname} collapsed={collapsed} navigate={navigate} />
          ))}
        </div>
      </nav>

      {/* User profile at bottom */}
      <div className="border-t border-white/10 p-3 flex items-center gap-3 overflow-hidden">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-600 text-xs font-medium text-white">
          {user?.name?.charAt(0).toUpperCase() ?? "U"}
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-white truncate">
              {user?.name ?? "User"}
            </p>
            <p className="text-[11px] text-neutral-400 truncate">
              {user?.email ?? ""}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

function NavButton({
  item,
  pathname,
  collapsed,
  navigate,
}: {
  item: SidebarItem;
  pathname: string;
  collapsed: boolean;
  navigate: ReturnType<typeof useNavigate>;
}) {
  const Icon = item.icon;
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <button
      onClick={() => navigate({ to: item.href as "/" })}
      className={`flex items-center gap-3 h-11 rounded px-3 transition-all duration-200 w-full ${
        isActive
          ? "bg-white/10 border-l-4 border-white text-white font-bold"
          : "text-neutral-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
      }`}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && (
        <span className="text-[13px] whitespace-nowrap">{item.label}</span>
      )}
    </button>
  );
}
