import { cn } from "@/lib/utils";
import { SettingsBadge } from "./SettingsBadge";
import { LucideIcon } from "lucide-react";

type GlowColor = "gold" | "teal" | "green";

interface SettingsItem {
  label: string;
  badge?: "new" | "updated" | "coming-soon";
}

interface SettingsCardProps {
  icon: LucideIcon;
  title: string;
  items: SettingsItem[];
  glowColor: GlowColor;
  className?: string;
  onItemClick?: (label: string) => void;
}

const glowClasses: Record<GlowColor, string> = {
  gold: "card-glow-gold",
  teal: "card-glow-teal",
  green: "card-glow-green",
};

const iconColors: Record<GlowColor, string> = {
  gold: "text-primary",
  teal: "text-accent",
  green: "text-success",
};

export function SettingsCard({
  icon: Icon,
  title,
  items,
  glowColor,
  className,
  onItemClick,
}: SettingsCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-card p-5 hover-lift",
        glowClasses[glowColor],
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon className={cn("h-5 w-5", iconColors[glowColor])} />
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
      </div>

      <ul className="space-y-1">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-2 settings-item cursor-pointer"
            onClick={() => onItemClick?.(item.label)}
          >
            <span className="text-sm">{item.label}</span>
            {item.badge && <SettingsBadge variant={item.badge} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
