import React, { createContext, useContext, useState, useEffect } from "react";

interface BackofficeSidebarContextType {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  setCollapsed: (collapsed: boolean) => void;
  setMobileOpen: (open: boolean) => void;
}

const BackofficeSidebarContext = createContext<BackofficeSidebarContextType | undefined>(undefined);

export function BackofficeSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("backoffice-sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    localStorage.setItem("backoffice-sidebar-collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev: boolean) => !prev);
    }
  };

  return (
    <BackofficeSidebarContext.Provider
      value={{
        isCollapsed,
        isMobileOpen,
        isMobile,
        toggleSidebar,
        setCollapsed: setIsCollapsed,
        setMobileOpen: setIsMobileOpen,
      }}
    >
      {children}
    </BackofficeSidebarContext.Provider>
  );
}

export function useBackofficeSidebar() {
  const context = useContext(BackofficeSidebarContext);
  if (!context) {
    throw new Error("useBackofficeSidebar must be used within BackofficeSidebarProvider");
  }
  return context;
}
