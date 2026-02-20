"use client";

import { useTheme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  showLabel?: boolean;
  size?: "sm" | "md";
}

const THEME_META: Record<string, { icon: string; label: string; next: string }> = {
  dark: { icon: "🌙", label: "Dark", next: "light" },
  light: { icon: "☀️", label: "Light", next: "miami" },
  miami: { icon: "🌴", label: "Miami", next: "dark" },
};

export function ThemeToggle({ showLabel = false, size = "md" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const meta = THEME_META[theme] || THEME_META.dark;

  const btnSize = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggleTheme}
        className={`${btnSize} rounded-lg font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center gap-2`}
        style={{
          backgroundColor: "var(--input-bg)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
          // @ts-expect-error CSS custom property
          "--tw-ring-offset-color": "var(--background)",
          "--tw-ring-color": "var(--primary)",
        }}
        title={`Switch to ${meta.next} mode`}
        aria-label={`Switch to ${meta.next} mode`}
      >
        <span>{meta.icon}</span>
        {showLabel && <span>{meta.label}</span>}
      </button>
    </div>
  );
}
