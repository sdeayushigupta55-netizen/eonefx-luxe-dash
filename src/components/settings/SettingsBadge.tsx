import { cn } from "@/lib/utils";

type BadgeVariant = "new" | "updated" | "coming-soon";

interface SettingsBadgeProps {
  variant: BadgeVariant;
  className?: string;
}

export function SettingsBadge({ variant, className }: SettingsBadgeProps) {
  const variants = {
    new: "bg-success/20 text-success border-success/30 shadow-glow-green",
    updated: "bg-primary/20 text-primary border-primary/30 shadow-glow-gold",
    "coming-soon": "bg-muted text-muted-foreground border-muted-foreground/30",
  };

  const labels = {
    new: "New",
    updated: "Updated",
    "coming-soon": "Coming Soon",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-md border",
        variants[variant],
        className
      )}
    >
      {labels[variant]}
    </span>
  );
}
