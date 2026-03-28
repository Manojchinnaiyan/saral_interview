import { useState } from "react";
import { cn } from "@/lib/utils";

interface ToggleProps {
  label: string;
  description?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Toggle({
  label,
  description,
  defaultChecked = false,
  onChange,
}: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900">{label}</span>
        {description && (
          <span className="text-xs text-gray-400">{description}</span>
        )}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={handleToggle}
        className={cn(
          "flex h-5 w-9 cursor-pointer items-center rounded-full p-0.5 transition-colors",
          checked ? "bg-brand" : "bg-gray-200"
        )}
      >
        <div
          className={cn(
            "h-4 w-4 rounded-full bg-white shadow transition-transform",
            checked && "translate-x-4"
          )}
        />
      </button>
    </div>
  );
}
