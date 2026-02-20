"use client";

import { useTheme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  showLabel?: boolean;
  size?: "sm" | "md";
}

const THEME_LABELS: Record<string, string> = {
  dark: "Dark",
  light: "Light",
  miami: "Miami",
};

const THEME_ICONS: Record<string, string> = {
  dark: "🌙",
  light: "☀️",
  miami: "🌴",
};

const NEXT_THEME: Record<string, string> = {
  dark: "light",
  light: "miami",
  miami: "dark",
};

export function ThemeToggle({ showLabel = false, size = "md" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const btnSize = size === "sm" ? "w-8 h-8 text-sm" : "w-10 h-10 text-base";

  return (
    <div className="flex items-center gap-3">
      {showLabel && (
        <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          {THEME_LABELS[theme]}
        </span>
      )}
      <button
        onClick={toggleTheme}
        className={`${btnSize} rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-110`}
        style={{
          backgroundColor: theme === "miami" ? "var(--primary)" : "var(--border)",
          // @ts-expect-error CSS custom property
          "--tw-ring-offset-color": "var(--background)",
          "--tw-ring-color": "var(--primary)",
        }}
        title={`Switch to ${NEXT_THEME[theme]} mode`}
        aria-label={`Switch to ${NEXT_THEME[theme]} mode`}
      >
        <span>{THEME_ICONS[theme]}</span>
      </button>
    </div>
  );
}
