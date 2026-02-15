"use client";

import { useTheme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function ThemeToggle({ showLabel = false, size = "md" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  const toggleWidth = size === "sm" ? "w-12" : "w-14";
  const toggleHeight = size === "sm" ? "h-6" : "h-7";
  const knobSize = size === "sm" ? "w-5 h-5" : "w-6 h-6";
  const translateX = size === "sm" ? "translate-x-6" : "translate-x-7";

  return (
    <div className="flex items-center gap-3">
      {showLabel && (
        <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          {isLight ? "Light" : "Dark"}
        </span>
      )}
      <button
        onClick={toggleTheme}
        className={`${toggleWidth} ${toggleHeight} rounded-full p-0.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2`}
        style={{
          backgroundColor: isLight ? "var(--primary)" : "var(--border)",
          // @ts-expect-error CSS custom property
          "--tw-ring-offset-color": "var(--background)",
          "--tw-ring-color": "var(--primary)",
        }}
        title={`Switch to ${isLight ? "dark" : "light"} mode`}
        aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      >
        <div
          className={`${knobSize} rounded-full flex items-center justify-center transition-transform duration-300 ${
            isLight ? translateX : "translate-x-0"
          }`}
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          <span className="text-xs">{isLight ? "☀️" : "🌙"}</span>
        </div>
      </button>
    </div>
  );
}
