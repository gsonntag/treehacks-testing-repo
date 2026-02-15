"use client";

import { useTheme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ThemeToggle({ showLabel = false, size = "md" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const sizes = {
    sm: { track: "w-10 h-5", thumb: "w-4 h-4", translate: "translate-x-5", icon: "text-xs" },
    md: { track: "w-12 h-6", thumb: "w-5 h-5", translate: "translate-x-6", icon: "text-sm" },
    lg: { track: "w-14 h-7", thumb: "w-6 h-6", translate: "translate-x-7", icon: "text-base" },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      {showLabel && (
        <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          {theme === "dark" ? "Dark" : "Light"}
        </span>
      )}
      <button
        onClick={toggleTheme}
        className={`relative inline-flex ${s.track} items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2`}
        style={{
          backgroundColor: theme === "dark" ? "var(--border)" : "var(--primary)",
          // @ts-expect-error CSS custom property
          "--tw-ring-color": "var(--primary)",
          "--tw-ring-offset-color": "var(--background)",
        }}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <span
          className={`${s.thumb} rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
            theme === "light" ? s.translate : "translate-x-0.5"
          }`}
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          <span className={s.icon}>{theme === "dark" ? "🌙" : "☀️"}</span>
        </span>
      </button>
    </div>
  );
}
