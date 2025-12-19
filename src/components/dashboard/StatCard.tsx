import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CardVariant = "gold" | "teal" | "green" | "neutral";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  variant?: CardVariant;
  className?: string;
}

const variantStyles: Record<CardVariant, { card: string; icon: string; iconBg: string }> = {
  gold: {
    card: "card-glow-gold",
    icon: "text-primary",
    iconBg: "bg-primary/10",
  },
  teal: {
    card: "card-glow-teal",
    icon: "text-accent",
    iconBg: "bg-accent/10",
  },
  green: {
    card: "card-glow-green",
    icon: "text-success",
    iconBg: "bg-success/10",
  },
  neutral: {
    card: "border border-border shadow-card",
    icon: "text-muted-foreground",
    iconBg: "bg-muted",
  },
};

export function StatCard({ icon: Icon, label, value, variant = "neutral", className }: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "rounded-2xl bg-card p-4 sm:p-5 hover-lift transition-all duration-200",
        styles.card,
        className
      )}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={cn("flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl flex-shrink-0", styles.iconBg)}>
          <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", styles.icon)} />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground truncate">{label}</p>
          <p className="text-lg sm:text-2xl font-bold text-foreground truncate">{value}</p>
        </div>
      </div>
    </div>
  );
}
