import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed right-8 top-8 z-[100] flex items-center gap-2 rounded-xl bg-dark px-5 py-3 text-sm font-medium text-white transition-all duration-300",
        show ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      )}
    >
      <CheckCircle size={20} className="text-[#4ADE80]" fill="#4ADE80" stroke="#303030" />
      {message}
    </div>
  );
}
