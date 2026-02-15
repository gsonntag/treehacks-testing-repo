"use client";

import { useTheme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function ThemeToggle({ showLabel = false, size = "md" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light";
      case "miami":
        return "Miami";
      default:
        return "Dark";
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return "☀️";
      case "miami":
        return "🌴";
      default:
        return "🌙";
    }
  };

  const getNextTheme = () => {
    switch (theme) {
      case "dark":
        return "light";
      case "light":
        return "miami";
      default:
        return "dark";
    }
  };

  const toggleWidth = size === "sm" ? "w-12" : "w-14";
  const toggleHeight = size === "sm" ? "h-6" : "h-7";
  const knobSize = size === "sm" ? "w-5 h-5" : "w-6 h-6";
  
  const getTranslateClass = () => {
    if (theme === "dark") return "translate-x-0";
    if (theme === "light") return size === "sm" ? "translate-x-3" : "translate-x-3.5";
    return size === "sm" ? "translate-x-6" : "translate-x-7";
  };

  return (
    <div className="flex items-center gap-3">
      {showLabel && (
        <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          {getThemeLabel()}
        </span>
      )}
      <button
        onClick={toggleTheme}
        className={`${toggleWidth} ${toggleHeight} rounded-full p-0.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2`}
        style={{
          backgroundColor: theme === "miami" ? "var(--secondary)" : theme === "light" ? "var(--primary)" : "var(--border)",
          // @ts-expect-error CSS custom property
          "--tw-ring-offset-color": "var(--background)",
          "--tw-ring-color": "var(--primary)",
        }}
        title={`Switch to ${getNextTheme()} mode`}
        aria-label={`Switch to ${getNextTheme()} mode`}
      >
        <div
          className={`${knobSize} rounded-full flex items-center justify-center transition-transform duration-300 ${getTranslateClass()}`}
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          <span className="text-xs">{getThemeIcon()}</span>
        </div>
      </button>
    </div>
  );
}
