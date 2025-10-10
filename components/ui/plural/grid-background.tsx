import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  children: React.ReactNode;
  className?: string;
  showCorners?: boolean;
}

export function GridBackground({ children, className, showCorners = true }: GridBackgroundProps) {
  return (
    <div className={cn("relative grid-background", className)}>
      {showCorners && (
        <>
          {/* Top left corner */}
          <div className="absolute top-0 left-0 text-white/15 text-sm font-light select-none pointer-events-none">
            +
          </div>
          {/* Top right corner */}
          <div className="absolute top-0 right-0 text-white/15 text-sm font-light select-none pointer-events-none">
            +
          </div>
          {/* Bottom left corner */}
          <div className="absolute bottom-0 left-0 text-white/15 text-sm font-light select-none pointer-events-none">
            +
          </div>
          {/* Bottom right corner */}
          <div className="absolute bottom-0 right-0 text-white/15 text-sm font-light select-none pointer-events-none">
            +
          </div>
        </>
      )}
      {children}
    </div>
  );
}
