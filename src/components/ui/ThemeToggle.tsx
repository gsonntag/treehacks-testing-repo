"use client";

import { useTheme } from "@/components/ThemeProvider";

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

const nextTheme: Record<string, string> = {
  dark: "light",
  light: "miami",
  miami: "dark",
};

interface ThemeToggleProps {
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function ThemeToggle({ showLabel = false, size = "md" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const btnPadding = size === "sm" ? "px-2.5 py-1" : "px-3 py-1.5";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className="flex items-center gap-3">
      {showLabel && (
        <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          {themeLabels[theme]}
        </span>
      )}
      <button
        onClick={toggleTheme}
        className={`${btnPadding} ${textSize} rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center gap-1.5 font-medium`}
        style={{
          backgroundColor: "var(--primary)",
          color: "#fff",
          // @ts-expect-error CSS custom property
          "--tw-ring-offset-color": "var(--background)",
          "--tw-ring-color": "var(--primary)",
        }}
        title={`Switch to ${nextTheme[theme]} mode`}
        aria-label={`Switch to ${nextTheme[theme]} mode`}
      >
        <span>{themeIcons[theme]}</span>
        <span>{themeLabels[theme]}</span>
      </button>
    </div>
  );
}
