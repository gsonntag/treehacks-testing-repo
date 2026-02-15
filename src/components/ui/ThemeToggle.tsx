"use client";

import { useTheme } from "@/components/ThemeProvider";
import { useState, useRef, useEffect } from "react";

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

export function ThemeToggle({ showLabel = false, size = "md" }: ThemeToggleProps) {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const buttonSize = size === "sm" ? "p-2" : "p-2.5";
  const fontSize = size === "sm" ? "text-sm" : "text-base";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        {showLabel && (
          <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            {themeLabels[theme]}
          </span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${buttonSize} ${fontSize} rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center gap-2`}
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--border)",
            // @ts-expect-error CSS custom property
            "--tw-ring-offset-color": "var(--background)",
            "--tw-ring-color": "var(--primary)",
          }}
          title={`Current theme: ${themeLabels[theme]}`}
          aria-label="Select theme"
        >
          <span>{themeIcons[theme]}</span>
          <span className="text-xs">▼</span>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 py-1 rounded-lg shadow-lg z-50 min-w-[120px]"
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--border)",
          }}
        >
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTheme(t);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left flex items-center gap-2 transition-colors ${
                theme === t ? "font-medium" : "opacity-80 hover:opacity-100"
              }`}
              style={{
                backgroundColor: theme === t ? "var(--primary)" : "transparent",
                color: theme === t ? "#fff" : "var(--foreground)",
              }}
            >
              <span>{themeIcons[t]}</span>
              <span className="text-sm">{themeLabels[t]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
