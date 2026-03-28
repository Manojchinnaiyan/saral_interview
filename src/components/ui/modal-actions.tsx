import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface ModalActionsProps {
  onCancel: () => void;
  onConfirm: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  confirmEnabled?: boolean;
  tooltip?: ReactNode;
}

export default function ModalActions({
  onCancel,
  onConfirm,
  cancelLabel = "Cancel",
  confirmLabel = "Create Reward",
  confirmEnabled = true,
  tooltip,
}: ModalActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        className="w-[168px] rounded-[10px] border-border-default px-4 py-2 text-base font-normal leading-[140%] tracking-normal text-dark shadow-none"
        onClick={onCancel}
      >
        {cancelLabel}
      </Button>
      <div className="group/tooltip relative flex-1">
        <Button
          onClick={onConfirm}
          className={`w-full rounded-lg text-base font-normal leading-[140%] tracking-normal text-white ${
            confirmEnabled ? "bg-brand hover:bg-[#B028B0]" : "bg-brand-light"
          }`}
        >
          {confirmLabel}
        </Button>
        {tooltip}
      </div>
    </div>
  );
}
