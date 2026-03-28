interface TooltipProps {
  text: string;
}

export default function Tooltip({ text }: TooltipProps) {
  return (
    <div className="pointer-events-none absolute -bottom-11 left-1/2 z-[100] w-[299px] -translate-x-1/2 rounded-lg bg-dark p-2 text-center text-xs font-normal leading-[140%] tracking-normal text-white opacity-0 transition-opacity group-hover/tooltip:opacity-100">
      {text}
    </div>
  );
}
