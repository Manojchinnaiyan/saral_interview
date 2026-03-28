import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeTierModal,
  setSelectedTier,
  setRewardWith,
} from "@/store/slices/gamificationSlice";
import Modal from "@/components/ui/modal";
import FormField from "@/components/ui/form-field";
import SelectField from "@/components/ui/select-field";
import type { SelectOption } from "@/components/ui/select-field";
import ModalActions from "@/components/ui/modal-actions";

const TIER_OPTIONS: SelectOption[] = [
  { label: "Tier Name Here", value: "tier_1" },
  { label: "Tier Name Here", value: "tier_2" },
  { label: "Tier Name Here", value: "tier_3" },
  { label: "Tier Name Here", value: "tier_4" },
  { label: "Tier Name Here", value: "tier_5" },
];

export default function SelectTierModal() {
  const dispatch = useAppDispatch();
  const { isTierModalOpen, selectedTier } = useAppSelector(
    (state) => state.gamification
  );
  const [localTier, setLocalTier] = useState(selectedTier);

  if (!isTierModalOpen) return null;

  const handleGoBack = () => {
    setLocalTier(selectedTier);
    dispatch(closeTierModal());
  };

  const handleSave = () => {
    if (!localTier) return;
    dispatch(setSelectedTier(localTier));
    dispatch(setRewardWith("upgrade_commission"));
    dispatch(closeTierModal());
  };

  return (
    <Modal
      isOpen={isTierModalOpen}
      onClose={handleGoBack}
      title="Select a commission tier"
      width="400px"
    >
      <div className="flex flex-col gap-4">
        <FormField label="Upgrade to" required>
          <SelectField
            placeholder="Select a tier"
            options={TIER_OPTIONS}
            value={localTier}
            onChange={(val) => setLocalTier(val)}
            defaultOpen
          />
        </FormField>
      </div>

      <ModalActions
        onCancel={handleGoBack}
        onConfirm={handleSave}
        cancelLabel="Go Back"
        confirmLabel="Save"
        confirmEnabled={!!localTier}
      />
    </Modal>
  );
}
