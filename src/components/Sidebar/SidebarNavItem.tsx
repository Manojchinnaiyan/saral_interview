import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import NavIcon from "./NavIcon";
import type { NavItem } from "@/constants/navigation";

interface SidebarNavItemProps {
  item: NavItem;
}

export default function SidebarNavItem({ item }: SidebarNavItemProps) {
  return (
    <NavLink
      to={item.path}
      style={{ minWidth: "156px", gap: "8px", padding: "8px" }}
      className={({ isActive }) =>
        cn(
          "flex h-9 w-[156px] items-center rounded-[10px] text-sm font-medium transition-colors",
          isActive
            ? "bg-[#FFFDFF] text-purple-700"
            : "text-gray-600 hover:text-gray-900"
        )
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={cn(
              "flex h-5 w-5 shrink-0 items-center justify-center",
              isActive ? "text-purple-700" : "text-gray-500"
            )}
          >
            <NavIcon name={item.icon} size={16} />
          </span>
          <span>{item.label}</span>
        </>
      )}
    </NavLink>
  );
}
