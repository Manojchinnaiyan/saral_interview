import { NAV_ITEMS, BOTTOM_NAV_ITEMS } from "@/constants/navigation";
import SidebarNavItem from "./SidebarNavItem";
import SaralLogo from "./SaralLogo";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-[188px] min-w-[188px] flex-col justify-between bg-brand-bg p-4">
      <div className="flex flex-col gap-4">
        <div className="px-1">
          <SaralLogo />
        </div>
        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem key={item.path} item={item} />
          ))}
        </nav>
      </div>
      <nav className="flex flex-col gap-0.5">
        {BOTTOM_NAV_ITEMS.map((item) => (
          <SidebarNavItem key={item.path} item={item} />
        ))}
      </nav>
    </aside>
  );
}
