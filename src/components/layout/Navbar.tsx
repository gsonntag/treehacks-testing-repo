"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Dropdown } from "@/components/ui/Dropdown";
import { useState } from "react";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header
      className="h-16 border-b flex items-center justify-between px-6 sticky top-0 z-40"
      style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <input
            type="search"
            placeholder="Search projects, team, docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "var(--input-bg)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg opacity-60">🔍</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span
          className="px-2 py-1 text-xs font-semibold rounded-full"
          style={{
            backgroundColor: "#fbbf24",
            color: "#1f2937",
          }}
        >
          Test Mode
        </span>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:opacity-80 transition"
          style={{ backgroundColor: "var(--input-bg)" }}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-lg hover:opacity-80 transition relative"
            style={{ backgroundColor: "var(--input-bg)" }}
          >
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
          </button>
          {notificationsOpen && (
            <div
              className="absolute right-0 mt-2 w-80 rounded-lg shadow-xl border p-4"
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)" }}
            >
              <h3 className="font-semibold mb-3">Notifications</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 rounded" style={{ backgroundColor: "var(--input-bg)" }}>
                  <p className="font-medium">Deploy completed</p>
                  <p className="opacity-70 text-xs">2 min ago</p>
                </div>
                <div className="p-2 rounded" style={{ backgroundColor: "var(--input-bg)" }}>
                  <p className="font-medium">New team member</p>
                  <p className="opacity-70 text-xs">1 hour ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <Dropdown
          trigger={
            <div className="flex items-center gap-2 pl-4 border-l cursor-pointer" style={{ borderColor: "var(--border)" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium" style={{ backgroundColor: "var(--primary)", color: "#fff" }}>
                JD
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">Jane Doe</p>
                <p className="text-xs opacity-70">Admin</p>
              </div>
            </div>
          }
          items={[
            { id: "profile", label: "Profile" },
            { id: "settings", label: "Settings" },
            { id: "logout", label: "Log out" },
          ]}
        />
      </div>
    </header>
  );
}
