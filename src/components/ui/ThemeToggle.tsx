"use client";

import { useTheme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  showLabel?: boolean;
  size?: "sm" | "md";
}

const themeLabels: Record<string, string> = {
  dark: "Dark",
  light: "Light",
  miami: "Miami",
};

const themeIcons: Record<string, string> = {
  dark: "🌙",
  light: "☀️",
  miami: "🌴",
};

const nextThemeLabels: Record<string, string> = {
  dark: "light",
  light: "miami",
  miami: "dark",
};

export function ThemeToggle({ showLabel = false, size = "md" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isMiami = theme === "miami";

  const toggleWidth = size === "sm" ? "w-12" : "w-14";
  const toggleHeight = size === "sm" ? "h-6" : "h-7";
  const knobSize = size === "sm" ? "w-5 h-5" : "w-6 h-6";
  const translateX = size === "sm" ? "translate-x-6" : "translate-x-7";

  const knobPosition = theme === "dark" ? "translate-x-0" : theme === "light" ? translateX : `translate-x-3`;

  return (
    <div className="flex items-center gap-3">
      {showLabel && (
        <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          {themeLabels[theme]}
        </span>
      )}
      <button
        onClick={toggleTheme}
        className={`${toggleWidth} ${toggleHeight} rounded-full p-0.5 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2`}
        style={{
          backgroundColor: isMiami
            ? "linear-gradient(90deg, #ff2d95, #00e5ff)" 
            : theme === "light" ? "var(--primary)" : "var(--border)",
          background: isMiami
            ? "linear-gradient(90deg, #ff2d95, #00e5ff)"
            : undefined,
          // @ts-expect-error CSS custom property
          "--tw-ring-offset-color": "var(--background)",
          "--tw-ring-color": "var(--primary)",
        }}
        title={`Switch to ${nextThemeLabels[theme]} mode`}
        aria-label={`Switch to ${nextThemeLabels[theme]} mode`}
      >
        <div
          className={`${knobSize} rounded-full flex items-center justify-center transition-transform duration-300 ${knobPosition}`}
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          <span className="text-xs">{themeIcons[theme]}</span>
        </div>
      </button>
    </div>
  );
}
