"use client";

import { useTheme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  showLabel?: boolean;
  size?: "sm" | "md";
}

const themeIcons: Record<string, string> = {
  dark: "🌙",
  light: "☀️",
  miami: "🌴",
};

const themeLabels: Record<string, string> = {
  dark: "Dark",
  light: "Light",
  miami: "Miami",
};

const nextTheme: Record<string, string> = {
  dark: "light",
  light: "miami",
  miami: "dark",
};

export function ThemeToggle({ showLabel = false, size = "md" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const buttonSize = size === "sm" ? "w-10 h-10" : "w-12 h-12";
  const iconSize = size === "sm" ? "text-lg" : "text-xl";

  return (
    <div className="flex items-center gap-3">
      {showLabel && (
        <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          {themeLabels[theme]}
        </span>
      )}
      <button
        onClick={toggleTheme}
        className={`${buttonSize} rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-110`}
        style={{
          backgroundColor: "var(--card-bg)",
          borderWidth: "2px",
          borderColor: "var(--primary)",
          // @ts-expect-error CSS custom property
          "--tw-ring-offset-color": "var(--background)",
          "--tw-ring-color": "var(--primary)",
        }}
        title={`Switch to ${nextTheme[theme]} mode`}
        aria-label={`Switch to ${nextTheme[theme]} mode`}
      >
        <span className={iconSize}>{themeIcons[theme]}</span>
      </button>
    </div>
  );
}
