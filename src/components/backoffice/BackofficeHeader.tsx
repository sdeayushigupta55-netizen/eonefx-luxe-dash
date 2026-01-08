import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Maximize2, Minimize2, Bell, Settings, Grid3X3, PanelLeftClose, PanelLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBackofficeSidebar } from "@/contexts/BackofficeSidebarContext";

type Theme = "gold" | "light" | "blue";

export function BackofficeHeader() {
  const navigate = useNavigate();
  const [currentTheme, setCurrentTheme] = useState<Theme>("gold");
  const { isCollapsed, isMobile, toggleSidebar } = useBackofficeSidebar();

  const themes: { id: Theme; label: string }[] = [
    { id: "gold", label: "Gold" },
    { id: "light", label: "Light" },
    { id: "blue", label: "Blue" },
  ];

  return (
    <header className="sticky top-0 z-40 flex h-14 sm:h-16 items-center justify-between border-b border-[#2a2f3a] bg-[#16191f] px-3 sm:px-6">
      {/* Left - Toggle */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            "h-9 w-9 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1f28] transition-all duration-300",
            !isMobile && isCollapsed && "rotate-180"
          )}
        >
          {isMobile ? (
            <Menu className="h-5 w-5" />
          ) : isCollapsed ? (
            <PanelLeft className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Center - Theme Switcher */}
      <div className="hidden lg:flex items-center rounded-full bg-[#1a1f28] p-0.5">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setCurrentTheme(theme.id)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200",
              currentTheme === theme.id
                ? theme.id === "gold" 
                  ? "bg-[#D7A928] text-black"
                  : theme.id === "light"
                  ? "bg-white text-black"
                  : "bg-blue-500 text-white"
                : "text-gray-400 hover:text-white"
            )}
          >
            {theme.label}
          </button>
        ))}
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-white hover:bg-[#1a1f28] hidden sm:flex">
          <Plus className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className={cn("h-9 w-9 text-gray-400 hover:text-white hover:bg-[#1a1f28] hidden sm:flex", isCollapsed && "text-[#D7A928]")}>
          {isCollapsed ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 text-gray-400 hover:text-white hover:bg-[#1a1f28]">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">34</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-white hover:bg-[#1a1f28]">
          <Settings className="h-5 w-5" />
        </Button>
        <div className="ml-1 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#D7A928] to-[#A8842C]">
          <span className="text-xs sm:text-sm font-bold text-black">JD</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="h-9 w-9 text-gray-400 hover:text-white hover:bg-[#1a1f28] hidden sm:flex">
          <Grid3X3 className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
