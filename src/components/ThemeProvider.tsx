"use client";

import { createContext, useContext, useEffect } from "react";

type Theme = "light";

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Force light mode - always use light theme
  const theme: Theme = "light";

  useEffect(() => {
    // Always set light mode
    document.documentElement.setAttribute("data-theme", "light");
    // Clear any stored theme preference to ensure light mode
    localStorage.removeItem("theme");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
