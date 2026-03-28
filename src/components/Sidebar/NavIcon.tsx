import homeIcon from "@/assets/icons/nav/home.svg";
import insightsIcon from "@/assets/icons/nav/insights.svg";
import gamificationIcon from "@/assets/icons/nav/gamification.svg";
import applicationsIcon from "@/assets/icons/nav/applications.svg";
import paymentsIcon from "@/assets/icons/nav/payments.svg";
import settingsIcon from "@/assets/icons/nav/settings.svg";

type IconName = "home" | "insights" | "gamification" | "applications" | "payments" | "settings";

const iconMap: Record<IconName, string> = {
  home: homeIcon,
  insights: insightsIcon,
  gamification: gamificationIcon,
  applications: applicationsIcon,
  payments: paymentsIcon,
  settings: settingsIcon,
};

interface NavIconProps {
  name: IconName;
  size?: number;
}

export default function NavIcon({ name, size = 20 }: NavIconProps) {
  const icon = iconMap[name];
  return <img src={icon} alt={name} width={size} height={size} />;
}

export type { IconName };
