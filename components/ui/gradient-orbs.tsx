import { cn } from "@/lib/utils";

interface GradientOrbsProps {
  className?: string;
  variant?: "default" | "minimal" | "intense";
}

export function GradientOrbs({ className, variant = "default" }: GradientOrbsProps) {
  const variants = {
    default: {
      purple: "bg-purple-600/20 blur-[120px]",
      blue: "bg-blue-600/20 blur-[120px]",
      purpleSize: "w-1/2 h-1/2",
      blueSize: "w-1/3 h-1/3",
    },
    minimal: {
      purple: "bg-purple-600/10 blur-[100px]",
      blue: "bg-blue-600/10 blur-[100px]",
      purpleSize: "w-1/3 h-1/3",
      blueSize: "w-1/4 h-1/4",
    },
    intense: {
      purple: "bg-purple-600/30 blur-[150px]",
      blue: "bg-blue-600/30 blur-[150px]",
      purpleSize: "w-2/3 h-2/3",
      blueSize: "w-1/2 h-1/2",
    },
  };

  const config = variants[variant];

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Purple orb - top left */}
      <div
        className={cn(
          "absolute top-0 -left-1/4 rounded-full animate-pulse",
          config.purpleSize,
          config.purple
        )}
        style={{ animationDuration: "4s" }}
      />

      {/* Blue orb - bottom right */}
      <div
        className={cn(
          "absolute -bottom-1/4 -right-1/4 rounded-full animate-pulse",
          config.blueSize,
          config.blue
        )}
        style={{ animationDuration: "6s", animationDelay: "1s" }}
      />

      {/* Additional purple orb - center */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse opacity-50",
          config.purpleSize,
          config.purple
        )}
        style={{ animationDuration: "5s", animationDelay: "2s" }}
      />
    </div>
  );
}

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "minimal" | "intense";
}

export function GradientBackground({ children, className, variant = "default" }: GradientBackgroundProps) {
  return (
    <div className={cn("relative", className)}>
      <GradientOrbs variant={variant} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
