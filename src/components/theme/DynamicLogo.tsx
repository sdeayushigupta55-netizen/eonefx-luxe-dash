import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface DynamicLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function DynamicLogo({ size = "md", showText = true }: DynamicLogoProps) {
  const { theme } = useTheme();

  const sizeClasses = {
    sm: { icon: "h-8", text: "text-lg" },
    md: { icon: "h-10", text: "text-xl" },
    lg: { icon: "h-12", text: "text-2xl" },
  };

  const textStyles = {
    gold: "text-[#D7A928]",
    light: "text-[#D7A928]",
    blue: "text-blue-400",
  };

  const iconColor = {
    gold: "#D7A928",
    light: "#D7A928",
    blue: "#60A5FA",
  };

  return (
    <div className="flex items-center gap-2">
      {/* Golden Horse Icons */}
      <div className={cn("flex items-center", sizeClasses[size].icon)}>
        <svg
          viewBox="0 0 60 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto"
        >
          {/* Left Horse - facing right */}
          <g fill={iconColor[theme]}>
            {/* Horse body */}
            <path d="M5 28C5 28 8 20 12 18C16 16 18 18 20 16C22 14 20 10 22 8C24 6 28 8 26 12C24 16 26 18 28 20C30 22 28 28 28 28L24 32L20 30L16 32L12 30L8 32L5 28Z" />
            {/* Horse head */}
            <path d="M22 8C22 8 24 4 26 4C28 4 30 6 28 8C26 10 24 10 22 8Z" />
            {/* Horse mane */}
            <path d="M18 12C18 10 20 8 22 8C22 10 20 14 18 14C16 14 18 12 18 12Z" />
            {/* Horse legs */}
            <path d="M10 28L8 36M14 28L14 36M20 28L20 36M24 28L26 36" stroke={iconColor[theme]} strokeWidth="2" strokeLinecap="round" />
          </g>
          
          {/* Right Horse - facing left (mirrored) */}
          <g fill={iconColor[theme]} transform="translate(60, 0) scale(-1, 1)">
            {/* Horse body */}
            <path d="M5 28C5 28 8 20 12 18C16 16 18 18 20 16C22 14 20 10 22 8C24 6 28 8 26 12C24 16 26 18 28 20C30 22 28 28 28 28L24 32L20 30L16 32L12 30L8 32L5 28Z" />
            {/* Horse head */}
            <path d="M22 8C22 8 24 4 26 4C28 4 30 6 28 8C26 10 24 10 22 8Z" />
            {/* Horse mane */}
            <path d="M18 12C18 10 20 8 22 8C22 10 20 14 18 14C16 14 18 12 18 12Z" />
            {/* Horse legs */}
            <path d="M10 28L8 36M14 28L14 36M20 28L20 36M24 28L26 36" stroke={iconColor[theme]} strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* e-onefx text */}
      {showText && (
        <span
          className={cn(
            "font-bold tracking-tight transition-all duration-300",
            sizeClasses[size].text,
            textStyles[theme]
          )}
        >
          e-onefx
        </span>
      )}
    </div>
  );
}
