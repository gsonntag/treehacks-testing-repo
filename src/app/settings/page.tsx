"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useTheme } from "@/components/ThemeProvider";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Settings" }]} />
      <h1 className="text-2xl font-bold">Settings</h1>

      <div
        className="rounded-xl p-6 border max-w-xl"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <h2 className="font-semibold mb-4">Appearance</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Theme</p>
            <p className="text-sm opacity-70">Switch between light and dark mode</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: theme === "dark" ? "var(--muted)" : "var(--foreground)" }}>☀️</span>
            <button
              onClick={toggleTheme}
              className="relative w-14 h-7 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: theme === "dark" ? "var(--primary)" : "var(--border)",
              }}
              role="switch"
              aria-checked={theme === "dark"}
              aria-label="Toggle dark mode"
            >
              <span
                className="absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200"
                style={{
                  transform: theme === "dark" ? "translateX(32px)" : "translateX(4px)",
                }}
              />
            </button>
            <span className="text-sm" style={{ color: theme === "dark" ? "var(--foreground)" : "var(--muted)" }}>🌙</span>
          </div>
        </div>
      </div>

      <div
        className="rounded-xl p-6 border max-w-xl"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <h2 className="font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span>Email notifications</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span>Push notifications</span>
            <input type="checkbox" className="rounded" />
          </label>
        </div>
      </div>
    </div>
  );
}
