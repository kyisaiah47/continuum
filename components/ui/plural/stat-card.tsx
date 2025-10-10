import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string | number;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className={cn("text-center p-12 border-r border-white/[0.03] last:border-r-0", className)}>
      <div className="text-7xl font-light tracking-tight text-white mb-4">
        {value}
      </div>
      <div className="text-sm text-white/60 leading-relaxed">
        {label}
      </div>
    </div>
  );
}
