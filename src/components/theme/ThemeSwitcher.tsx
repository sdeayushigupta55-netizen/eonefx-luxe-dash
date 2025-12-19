import { useTheme, Theme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const themes: { value: Theme; label: string }[] = [
  { value: "gold", label: "Gold" },
  { value: "light", label: "Light" },
  { value: "blue", label: "Blue" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center rounded-lg bg-muted/50 p-1 gap-1">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
            theme === t.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
