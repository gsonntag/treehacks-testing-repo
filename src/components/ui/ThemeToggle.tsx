"use client";

import { useTheme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  showLabel?: boolean;
  size?: "sm" | "md";
}

const themeConfig = {
  dark: { icon: "🌙", label: "Dark", next: "light" },
  light: { icon: "☀️", label: "Light", next: "miami" },
  miami: { icon: "🌴", label: "Miami", next: "dark" },
} as const;

export function ThemeToggle({ showLabel = false, size = "md" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const config = themeConfig[theme];

  const buttonSize = size === "sm" ? "px-3 py-1.5" : "px-4 py-2";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className="flex items-center gap-3">
      {showLabel && (
        <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          {config.label}
        </span>
      )}
      <button
        onClick={toggleTheme}
        className={`${buttonSize} ${textSize} rounded-full flex items-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105`}
        style={{
          backgroundColor: theme === "miami" ? "linear-gradient(135deg, #00d4ff, #ff6b9d)" : "var(--card-bg)",
          background: theme === "miami" ? "linear-gradient(135deg, #00d4ff, #ff6b9d)" : "var(--card-bg)",
          border: "1px solid var(--border)",
          color: "var(--foreground)",
          // @ts-expect-error CSS custom property
          "--tw-ring-offset-color": "var(--background)",
          "--tw-ring-color": "var(--primary)",
        }}
        title={`Switch to ${config.next} mode`}
        aria-label={`Current: ${config.label} mode. Click to switch to ${config.next} mode`}
      >
        <span>{config.icon}</span>
        <span className="font-medium">{config.label}</span>
      </button>
    </div>
  );
}
