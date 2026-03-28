import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, ChevronUp, Check, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useClickOutside } from "@/hooks/useClickOutside";

export interface SelectOption {
  label: string;
  value: string;
  hasAmountInput?: boolean;
  hasDualInput?: boolean;
  editable?: boolean;
  disabled?: boolean;
}

interface SelectFieldProps {
  placeholder: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  amount?: string;
  onAmountChange?: (amount: string) => void;
  displayValue?: string;
  onOpenChange?: (isOpen: boolean) => void;
  defaultOpen?: boolean;
  onSave?: () => void;
  onCancelEdit?: () => void;
  onEditOption?: (value: string) => void;
  secondaryValue?: string;
  onSecondaryChange?: (value: string) => void;
  disabled?: boolean;
}

const DURATION_OPTIONS = ["14 days", "1 month", "2 months", "3 months", "1 year"] as const;

export default function SelectField({
  placeholder,
  options,
  value,
  onChange,
  amount,
  onAmountChange,
  displayValue,
  onOpenChange,
  defaultOpen = false,
  onSave,
  onCancelEdit,
  onEditOption,
  secondaryValue,
  onSecondaryChange,
  disabled = false,
}: SelectFieldProps) {
  const [isOpen, setIsOpenState] = useState(defaultOpen);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const isEditingAmount = isOpen && selectedOption?.hasAmountInput;
  const isEditingDual = isOpen && selectedOption?.hasDualInput;
  const isEditingInline = isEditingAmount || isEditingDual;
  const [durationOpen, setDurationOpen] = useState(false);

  const setIsOpen = (open: boolean) => {
    setIsOpenState(open);
    onOpenChange?.(open);
  };

  useEffect(() => {
    if (defaultOpen) {
      setIsOpenState(true);
      onOpenChange?.(true);
    }
  }, [defaultOpen]);

  const showText = displayValue ?? selectedOption?.label;
  const handleClose = useCallback(() => setIsOpen(false), []);
  useClickOutside(containerRef, handleClose);

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 items-center justify-between rounded-lg border px-3 transition-colors",
          disabled ? "cursor-not-allowed border-gray-200 opacity-50" : "cursor-pointer",
          !disabled && isOpen ? "border-brand ring-1 ring-brand" : "border-gray-200"
        )}
      >
        <span className={cn("text-sm", showText ? "text-gray-900" : "text-gray-400")}>
          {showText || placeholder}
        </span>
        {isOpen ? (
          <ChevronUp size={16} className="text-gray-400" />
        ) : (
          <ChevronDown size={16} className="text-gray-400" />
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 w-[352px] rounded-lg border border-border-default bg-white p-1 shadow-dropdown">
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <div key={option.value}>
                {/* Option row */}
                <div
                  onClick={() => {
                    if (option.disabled) return;
                    onChange(option.value);
                    if (!option.hasAmountInput && !option.hasDualInput) setIsOpen(false);
                    setDurationOpen(false);
                  }}
                  className={cn(
                    "group/edit flex h-10 items-center justify-between text-sm transition-colors",
                    option.disabled ? "cursor-not-allowed text-gray-300" : "cursor-pointer",
                    !option.disabled && isSelected
                      ? "rounded-lg bg-brand-selected px-2 text-brand"
                      : !option.disabled && "px-3 text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <span>{option.label}</span>
                  {isSelected && option.editable && onEditOption ? (
                    <Pencil
                      size={16}
                      className="cursor-pointer text-brand opacity-0 transition-opacity group-hover/edit:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditOption(option.value);
                        setIsOpen(false);
                      }}
                    />
                  ) : isSelected ? (
                    <Check size={16} className="text-brand" />
                  ) : null}
                </div>

                {/* Amount input ($X) */}
                {isSelected && option.hasAmountInput && (
                  <div className="mx-auto mb-2 flex h-10 w-[344px] items-center overflow-hidden rounded-lg border-2 border-brand">
                    <span className="flex h-full items-center bg-brand-input px-3 text-sm text-gray-500">
                      $
                    </span>
                    <input
                      placeholder="e.g. 100"
                      value={amount || ""}
                      onChange={(e) => onAmountChange?.(e.target.value)}
                      className="h-full flex-1 border-none px-3 text-sm text-gray-900 outline-none"
                      autoFocus
                    />
                  </div>
                )}

                {/* Dual input (count + duration) */}
                {isSelected && option.hasDualInput && (
                  <div className="mx-auto mb-2 flex w-[344px] items-center gap-2">
                    <input
                      type="number"
                      placeholder="eg: 4"
                      value={amount || ""}
                      onChange={(e) => onAmountChange?.(e.target.value)}
                      className="h-10 w-[120px] rounded-lg border-2 border-brand px-3 text-sm text-gray-900 outline-none"
                      autoFocus
                    />
                    <div className="relative flex-1">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setDurationOpen(!durationOpen);
                        }}
                        className={cn(
                          "flex h-10 cursor-pointer items-center justify-between rounded-lg border px-3 text-sm",
                          durationOpen ? "border-2 border-brand" : "border-border-default"
                        )}
                      >
                        <span className={secondaryValue ? "text-gray-900" : "text-gray-400"}>
                          {secondaryValue || "Select duration"}
                        </span>
                        {durationOpen ? (
                          <ChevronUp size={14} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={14} className="text-gray-400" />
                        )}
                      </div>
                      {durationOpen && (
                        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-[60] rounded-lg border border-border-default bg-white p-1 shadow-dropdown">
                          {DURATION_OPTIONS.map((d) => (
                            <div
                              key={d}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSecondaryChange?.(d);
                                setDurationOpen(false);
                              }}
                              className="flex h-9 cursor-pointer items-center rounded-md px-3 text-sm text-gray-900 hover:bg-gray-50"
                            >
                              {d}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Save / Cancel inside dropdown */}
          {isEditingInline && (
            <div className="flex items-center gap-2 pt-1">
              <Button
                variant="outline"
                className="flex-1 rounded-[10px] border-border-default text-base font-normal leading-[140%] text-dark shadow-none"
                onClick={() => {
                  onCancelEdit?.();
                  setIsOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className={cn(
                  "flex-1 rounded-[10px] text-base font-normal leading-[140%] text-white",
                  amount && (!isEditingDual || secondaryValue) ? "bg-brand" : "bg-brand-light"
                )}
                onClick={() => {
                  onSave?.();
                  setIsOpen(false);
                }}
              >
                Save
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
