import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Menu, Search, Bell, MessageCircle, ChevronDown, LogOut, UserCircle } from "lucide-react";
import { useAuthStore } from "@shared/store/auth-store";

type TopbarProps = {
  title: string;
  sidebarCollapsed: boolean;
  onMenuOpen: () => void;
};

export function Topbar({ title, sidebarCollapsed, onMenuOpen }: TopbarProps) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate({ to: "/login" });
  }

  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-white/95 backdrop-blur-sm flex items-center justify-between px-4 lg:px-6 z-40 border-b border-neutral-200 transition-[left] duration-200 ease-in-out ${
        sidebarCollapsed ? "md:left-16" : "md:left-60"
      } left-0`}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuOpen}
          className="p-2 text-black hover:bg-neutral-100 rounded-lg md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-bold text-black">{title}</h2>
      </div>

      {/* Center - Search */}
      <div className="hidden sm:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search clubs, courses, or events..."
            className="w-full h-10 pl-10 pr-4 bg-neutral-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-black/10 outline-none transition-all"
          />
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-1">
        <button className="relative p-2 text-neutral-500 hover:bg-neutral-100 rounded-lg transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
        </button>
        <button className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-lg transition-colors">
          <MessageCircle className="h-5 w-5" />
        </button>

        <div className="h-6 w-px bg-neutral-200 mx-2" />

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 rounded-lg px-2 py-1.5 hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-200"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-black">
              {user?.name?.charAt(0).toUpperCase() ?? "U"}
            </div>
            <ChevronDown className="h-4 w-4 text-neutral-500" />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate({ to: "/dashboard" });
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  <UserCircle className="h-4 w-4" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
