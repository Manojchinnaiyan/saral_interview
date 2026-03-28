import { useState, useRef, useCallback, useMemo } from "react";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

function formatDate(date: Date): string {
  return `${date.getDate()} ${MONTHS[date.getMonth()]?.slice(0, 3)}, ${date.getFullYear()}`;
}

function toISODate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(value) : null;
  const [viewMonth, setViewMonth] = useState(
    selectedDate ? selectedDate.getMonth() : new Date().getMonth()
  );
  const [viewYear, setViewYear] = useState(
    selectedDate ? selectedDate.getFullYear() : new Date().getFullYear()
  );

  const handleClose = useCallback(() => setIsOpen(false), []);
  useClickOutside(containerRef, handleClose);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const handleSelectDate = (day: number) => {
    onChange(toISODate(new Date(viewYear, viewMonth, day)));
    setIsOpen(false);
  };

  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();
    const cells: { day: number; currentMonth: boolean }[] = [];

    for (let i = firstDay - 1; i >= 0; i--)
      cells.push({ day: daysInPrevMonth - i, currentMonth: false });
    for (let i = 1; i <= daysInMonth; i++)
      cells.push({ day: i, currentMonth: true });
    const totalCells = Math.ceil(cells.length / 7) * 7;
    for (let i = 1; cells.length < totalCells; i++)
      cells.push({ day: i, currentMonth: false });

    return cells;
  }, [viewMonth, viewYear]);

  const displayValue = selectedDate ? formatDate(selectedDate) : "";

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 cursor-pointer items-center gap-2 rounded-lg border px-3 transition-colors",
          isOpen ? "border-brand ring-1 ring-brand" : "border-gray-200"
        )}
      >
        <Calendar size={16} className="text-gray-500" />
        <span className={cn("text-sm", displayValue ? "text-gray-900" : "text-gray-400")}>
          {displayValue || "Select End Date"}
        </span>
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-[60] w-[300px] rounded-xl border border-border-default bg-white p-3 shadow-dropdown">
          {/* Header */}
          <div className="mb-2 flex items-center justify-between">
            <button
              onClick={prevMonth}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
            >
              <ArrowLeft size={14} />
            </button>
            <span className="text-sm font-semibold text-gray-900">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              onClick={nextMonth}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
            >
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Day headers */}
          <div className="mb-1 grid grid-cols-7">
            {DAYS.map((day) => (
              <div key={day} className="flex h-8 items-center justify-center text-xs font-medium text-gray-400">
                {day}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((cell, idx) => {
              const isSelected =
                cell.currentMonth &&
                selectedDate?.getDate() === cell.day &&
                selectedDate?.getMonth() === viewMonth &&
                selectedDate?.getFullYear() === viewYear;

              return (
                <button
                  key={idx}
                  onClick={() => cell.currentMonth && handleSelectDate(cell.day)}
                  className={cn(
                    "flex h-8 cursor-pointer items-center justify-center text-sm transition-colors",
                    !cell.currentMonth && "text-gray-300",
                    cell.currentMonth && !isSelected && "text-gray-700 hover:rounded-lg hover:bg-gray-100",
                    isSelected && "rounded-lg bg-brand text-white"
                  )}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
