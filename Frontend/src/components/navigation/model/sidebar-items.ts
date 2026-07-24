import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Compass,
  Users,
  CalendarDays,
  Bell,
  UserCircle,
  GraduationCap,
  Layers,
  Flag,
  BarChart3,
  Settings,
} from "lucide-react";

export type SidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const mainNavItems: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Discover Clubs", href: "/clubs", icon: Compass },
  { label: "My Clubs", href: "/my-clubs", icon: Users },
  { label: "Events", href: "/events", icon: CalendarDays },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Profile", href: "/profile", icon: UserCircle },
];

export const adminNavItems: SidebarItem[] = [
  { label: "Students", href: "/admin/students", icon: GraduationCap },
  { label: "Manage Clubs", href: "/admin/club-management", icon: Layers },
  { label: "Reports", href: "/admin/reports", icon: Flag },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export const bottomNavItems: SidebarItem[] = [
  { label: "Settings", href: "/settings", icon: Settings },
];
