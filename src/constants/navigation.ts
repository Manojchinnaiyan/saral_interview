import type { IconName } from "@/components/Sidebar/NavIcon";

export interface NavItem {
  label: string;
  path: string;
  icon: IconName;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/", icon: "home" },
  { label: "Insights", path: "/insights", icon: "insights" },
  { label: "Gamification", path: "/gamification", icon: "gamification" },
  { label: "Applications", path: "/applications", icon: "applications" },
  { label: "Payments", path: "/payments", icon: "payments" },
];

export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { label: "Settings", path: "/settings", icon: "settings" },
];
