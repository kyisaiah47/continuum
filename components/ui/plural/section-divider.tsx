import { cn } from "@/lib/utils";

interface SectionDividerProps {
  label?: string;
  showArrow?: boolean;
  className?: string;
}

export function SectionDivider({ label, showArrow = false, className }: SectionDividerProps) {
  return (
    <div className={cn("flex items-center gap-3 py-10 border-t border-white/[0.08]", className)}>
      {label && (
        <span className="text-xs font-medium uppercase tracking-[0.1em] text-white/40">
          {label}
        </span>
      )}
      {showArrow && (
        <span className="text-white/30">↓</span>
      )}
    </div>
  );
}
