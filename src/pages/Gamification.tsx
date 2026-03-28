import { Bell } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openRewardModal, hideToastMessage } from "@/store/slices/gamificationSlice";
import CreateRewardModal from "@/components/CreateRewardModal";
import Toast from "@/components/ui/toast";
import gridPattern from "@/assets/grid-pattern.svg";
import cardBgPattern1 from "@/assets/card-bg-pattern.svg";
import cardBgPattern2 from "@/assets/card-bg-pattern-2.svg";
import giftIcon from "@/assets/icons/gift.svg";
import crownIcon from "@/assets/icons/crown.svg";
import ticketSaleIcon from "@/assets/icons/ticket-sale.svg";
import { Button } from "@/components/ui/button";

interface Feature {
  icon: string;
  title: string;
  description: string;
  bgPattern: string;
}

const FEATURES: Feature[] = [
  {
    icon: giftIcon,
    title: "Reward Your Ambassadors",
    description: "Boost campaign performance by setting up rewards for ambassadors",
    bgPattern: cardBgPattern1,
  },
  {
    icon: crownIcon,
    title: "Set Milestones",
    description: "Set up custom goals for sales, posts, or time-based achievements",
    bgPattern: cardBgPattern2,
  },
  {
    icon: ticketSaleIcon,
    title: "Customise Incentives",
    description: "Create custom incentives like flat fees, free products, or special commissions.",
    bgPattern: cardBgPattern1,
  },
];

export default function Gamification() {
  const dispatch = useAppDispatch();
  const showToast = useAppSelector((state) => state.gamification.showToast);

  return (
    <div className="flex h-full flex-col">
      <CreateRewardModal />
      <Toast
        message="Reward Created!"
        isVisible={showToast}
        onClose={() => dispatch(hideToastMessage())}
      />

      {/* Page Header */}
      <header className="flex h-16 w-full max-w-[1252px] items-center justify-between bg-white px-[146px] py-4">
        <h1 className="text-lg font-semibold text-gray-900">Gamification</h1>
        <div className="flex items-center gap-3">
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold leading-none text-white ring-2 ring-white">
              5
            </span>
          </button>
          <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-300 ring-2 ring-white">
            <img
              src="https://i.pravatar.cc/32"
              alt="User avatar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center bg-white">
        {/* Hero Card */}
        <div className="relative mt-[38px] flex h-[322px] w-[960px] items-center justify-center">
          <img
            src={gridPattern}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          />
          <div className="relative z-10 flex h-[155px] w-[354px] flex-col items-center gap-6 text-center">
            <div className="-mt-5 flex flex-col gap-1">
              <h2 className="text-center text-[28px] font-semibold leading-[140%] tracking-normal text-gray-900">
                Gamify your Campaign
              </h2>
              <p className="text-sm text-gray-500">
                Enable gamification to start crafting
                <br />
                your custom reward system.
              </p>
            </div>
            <Button
              onClick={() => dispatch(openRewardModal())}
              className="h-10 w-[310px] rounded-[10px] bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-[#B028B0]"
            >
              Enable Gamification
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="relative z-10 -mt-[70px] grid h-[200px] w-[924px] grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="relative flex h-[200px] w-[292px] flex-col items-center justify-center overflow-hidden rounded-lg border border-brand-border bg-white text-center shadow-card"
            >
              <img
                src={feature.bgPattern}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
              />
              <div className="relative z-10 flex h-[70px] w-[70px] items-center justify-center rounded-[13px] bg-brand-icon">
                <div className="flex h-[51px] w-[51px] items-center justify-center rounded-[9px] bg-white">
                  <img src={feature.icon} alt={feature.title} width={30} height={30} />
                </div>
              </div>
              <h3 className="relative z-10 mt-3 text-sm font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="relative z-10 mt-1 max-w-[220px] text-xs leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
