import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeRewardModal,
  setRewardEvent,
  setRewardEventAmount,
  setRewardWith,
  setRewardWithAmount,
  setIsTimeBound,
  setEndDate,
  openTierModal,
  setPostCount,
  setPostDuration,
  showToastMessage,
} from "@/store/slices/gamificationSlice";
import Modal from "@/components/ui/modal";
import FormField from "@/components/ui/form-field";
import SelectField from "@/components/ui/select-field";
import type { SelectOption } from "@/components/ui/select-field";
import Toggle from "@/components/ui/toggle";
import DatePicker from "@/components/ui/date-picker";
import ModalActions from "@/components/ui/modal-actions";
import Tooltip from "@/components/ui/tooltip";
import SelectTierModal from "@/components/SelectTierModal";

const REWARD_EVENT_OPTIONS: SelectOption[] = [
  { label: "Cross $X in sales", value: "cross_x_sales", hasAmountInput: true },
  { label: "Posts X times every Y period", value: "posts_x_times", hasDualInput: true },
  { label: "Is Onboarded", value: "is_onboarded" },
];

export default function CreateRewardModal() {
  const dispatch = useAppDispatch();
  const {
    isRewardModalOpen,
    rewardEvent,
    rewardEventAmount,
    rewardWith,
    rewardWithAmount,
    isTimeBound,
    endDate,
    selectedTier,
    isTierModalOpen,
    postCount,
    postDuration,
  } = useAppSelector((state) => state.gamification);

  const isEventComplete =
    (rewardEvent === "cross_x_sales" && !!rewardEventAmount) ||
    (rewardEvent === "posts_x_times" && !!postCount && !!postDuration) ||
    rewardEvent === "is_onboarded";

  const REWARD_WITH_OPTIONS: SelectOption[] = [
    { label: "Flat $X bonus", value: "flat_bonus", hasAmountInput: true },
    {
      label: selectedTier
        ? "Upgrade to (Tier Name Here)"
        : "Upgrade Commission Tier",
      value: "upgrade_commission",
      editable: !!selectedTier,
      disabled: rewardEvent !== "cross_x_sales",
    },
  ];

  const [autoOpenRewardWith, setAutoOpenRewardWith] = useState(false);

  const handleClose = () => {
    dispatch(closeRewardModal());
    setAutoOpenRewardWith(false);
  };

  const handleCreateReward = () => {
    if (!rewardEvent || !rewardWith) return;
    if (isTimeBound && !endDate) return;
    dispatch(closeRewardModal());
    dispatch(showToastMessage());
  };

  const handleEventChange = (val: string) => {
    dispatch(setRewardEvent(val));
  };

  const handleRewardWithChange = (val: string) => {
    if (val === "upgrade_commission") {
      if (!selectedTier) {
        dispatch(openTierModal());
      } else {
        dispatch(setRewardWith(val));
      }
    } else {
      dispatch(setRewardWith(val));
    }
    setAutoOpenRewardWith(false);
  };

  const handleRewardWithOpenChange = (open: boolean) => {
    if (!open) setAutoOpenRewardWith(false);
  };

  const getEventDisplayValue = () => {
    if (!rewardEvent) return undefined;
    const option = REWARD_EVENT_OPTIONS.find((o) => o.value === rewardEvent);
    if (!option) return undefined;
    if (option.hasAmountInput && rewardEventAmount) {
      return option.label.replace("$X", `$${rewardEventAmount}`);
    }
    if (option.hasDualInput) {
      if (postCount && postDuration) {
        return `Posts ${postCount} times every ${postDuration}`;
      }
      if (postCount) {
        return `Posts ${postCount} times every Y period`;
      }
      return option.label;
    }
    return option.label;
  };

  const getRewardWithDisplayValue = () => {
    if (!rewardWith) return undefined;
    if (rewardWith === "upgrade_commission" && selectedTier) {
      return "Upgrade to (Tier Name Here)";
    }
    const option = REWARD_WITH_OPTIONS.find((o) => o.value === rewardWith);
    if (!option) return undefined;
    if (option.hasAmountInput && rewardWithAmount) {
      return option.label.replace("$X", `$${rewardWithAmount}`);
    }
    return option.label;
  };

  const getTooltipText = () => {
    if (!rewardEvent || !rewardWith) {
      return "Choose a reward trigger and a reward to continue";
    }
    if (isTimeBound && !endDate) {
      return "Choose reward end date to continue";
    }
    return null;
  };

  if (isTierModalOpen) {
    return <SelectTierModal />;
  }

  const tooltipText = getTooltipText();

  return (
    <Modal
      isOpen={isRewardModalOpen}
      onClose={handleClose}
      title="Create your reward system"
      width="400px"
    >
      <div className="flex flex-col gap-4">
        <FormField label="Reward event" required>
          <SelectField
            placeholder="Select an event"
            options={REWARD_EVENT_OPTIONS}
            value={rewardEvent}
            onChange={handleEventChange}
            amount={rewardEvent === "posts_x_times" ? postCount : rewardEventAmount}
            onAmountChange={(val) =>
              rewardEvent === "posts_x_times"
                ? dispatch(setPostCount(val))
                : dispatch(setRewardEventAmount(val))
            }
            secondaryValue={postDuration}
            onSecondaryChange={(val) => dispatch(setPostDuration(val))}
            displayValue={getEventDisplayValue()}
            onSave={() => setAutoOpenRewardWith(true)}
            onCancelEdit={() => {
              dispatch(setRewardEventAmount(""));
              dispatch(setPostCount(""));
              dispatch(setPostDuration(""));
            }}
          />
        </FormField>

        <FormField label="Reward with" required>
          <SelectField
            placeholder="Select a reward"
            options={REWARD_WITH_OPTIONS}
            value={rewardWith}
            onChange={handleRewardWithChange}
            amount={rewardWithAmount}
            onAmountChange={(val) => dispatch(setRewardWithAmount(val))}
            displayValue={getRewardWithDisplayValue()}
            onOpenChange={handleRewardWithOpenChange}
            defaultOpen={autoOpenRewardWith}
            onSave={() => {}}
            onCancelEdit={() => dispatch(setRewardWithAmount(""))}
            onEditOption={(val) => {
              if (val === "upgrade_commission") dispatch(openTierModal());
            }}
            disabled={!isEventComplete}
          />
        </FormField>

        <Toggle
          label="Make the reward time bound"
          description="Choose an end date to stop this reward automatically."
          defaultChecked={isTimeBound}
          onChange={(val) => dispatch(setIsTimeBound(val))}
        />

        {isTimeBound && (
          <DatePicker
            value={endDate}
            onChange={(val) => dispatch(setEndDate(val))}
          />
        )}
      </div>

      <ModalActions
        onCancel={handleClose}
        onConfirm={handleCreateReward}
        confirmEnabled={!!rewardEvent && !!rewardWith}
        tooltip={tooltipText ? <Tooltip text={tooltipText} /> : undefined}
      />
    </Modal>
  );
}
