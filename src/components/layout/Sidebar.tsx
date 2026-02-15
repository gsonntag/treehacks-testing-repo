"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/analytics", label: "Analytics", icon: "📈" },
  { href: "/projects", label: "Projects", icon: "📁" },
  { href: "/team", label: "Team", icon: "👥" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
  { href: "/reports", label: "Reports", icon: "📋" },
];

const secondaryItems = [
  { href: "/help", label: "Help", icon: "❓" },
  { href: "/feedback", label: "Feedback", icon: "💬" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col h-screen transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
      style={{ backgroundColor: "var(--sidebar-bg)" }}
    >
      <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
        {!collapsed && (
          <Link href="/" className="font-bold text-lg" style={{ color: "var(--primary)" }}>
            CommandHub
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-full hover:opacity-80 transition"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                isActive ? "font-medium" : "opacity-80 hover:opacity-100"
              }`}
              style={{
                backgroundColor: isActive ? "var(--primary)" : "transparent",
                color: isActive ? "#fff" : "var(--foreground)",
              }}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t" style={{ borderColor: "var(--border)" }}>
          {secondaryItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg opacity-70 hover:opacity-100 transition"
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          ))}
        </div>
      </nav>

      {!collapsed && (
        <div className="p-3 border-t text-xs opacity-60" style={{ borderColor: "var(--border)" }}>
          v2.4.1 • CommandHub
        </div>
      )}
    </aside>
  );
}
