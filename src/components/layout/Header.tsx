import { useState } from "react";
import { Plus, Maximize2, Minimize2, Bell, Settings, Grid3X3, PanelLeftClose, PanelLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { QuickActionsDropdown } from "@/components/header/QuickActionsDropdown";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

export function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const { isCollapsed, isMobile, toggleSidebar } = useSidebar();

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 sm:h-16 items-center justify-between border-b border-border bg-card px-3 sm:px-6">
        {/* Left - Toggle & Title */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Sidebar Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(
              "h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300",
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
          <h1 className="text-base sm:text-lg font-semibold text-foreground">Dashboard</h1>
        </div>

        {/* Center - Theme Switcher (hidden on small screens) */}
        <div className="hidden lg:block">
          <ThemeSwitcher />
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Theme switcher for tablet */}
          <div className="hidden md:block lg:hidden">
            <ThemeSwitcher />
          </div>

          {/* Quick Actions Button */}
          <div className="relative hidden sm:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
              className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Plus className="h-5 w-5" />
            </Button>
            <QuickActionsDropdown 
              isOpen={isQuickActionsOpen} 
              onClose={() => setIsQuickActionsOpen(false)} 
            />
          </div>

          {/* Full Screen Toggle - hidden on mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(
              "h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 hidden sm:flex",
              isCollapsed && "text-primary"
            )}
          >
            {isCollapsed ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-destructive text-[9px] sm:text-[10px] font-bold text-destructive-foreground">
              34
            </span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
            className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* Avatar */}
          <div className="ml-1 sm:ml-2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
            <span className="text-xs sm:text-sm font-bold text-primary-foreground">JD</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted hidden sm:flex"
          >
            <Grid3X3 className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
