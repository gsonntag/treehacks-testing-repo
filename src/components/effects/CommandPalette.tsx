"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Command {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  keywords?: string[];
  category: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const commands: Command[] = [
    // Navigation
    { id: "dashboard", label: "Go to Dashboard", icon: "🏠", category: "Navigation", keywords: ["home"], action: () => router.push("/") },
    { id: "projects", label: "Go to Projects", icon: "📁", category: "Navigation", keywords: ["folder"], action: () => router.push("/projects") },
    { id: "team", label: "Go to Team", icon: "👥", category: "Navigation", keywords: ["members", "people"], action: () => router.push("/team") },
    { id: "analytics", label: "Go to Analytics", icon: "📊", category: "Navigation", keywords: ["stats", "charts"], action: () => router.push("/analytics") },
    { id: "reports", label: "Go to Reports", icon: "📄", category: "Navigation", keywords: ["documents"], action: () => router.push("/reports") },
    { id: "settings", label: "Go to Settings", icon: "⚙️", category: "Navigation", keywords: ["config", "preferences"], action: () => router.push("/settings") },
    { id: "docs", label: "Go to Documentation", icon: "📚", category: "Navigation", keywords: ["help", "guide"], action: () => router.push("/docs") },
    
    // Actions
    { id: "new-project", label: "Create New Project", icon: "➕", category: "Actions", keywords: ["add"], action: () => { router.push("/projects"); alert("Opening new project modal..."); } },
    { id: "export", label: "Export Data", icon: "📤", category: "Actions", keywords: ["download"], action: () => alert("Exporting data...") },
    { id: "refresh", label: "Refresh Dashboard", icon: "🔄", category: "Actions", keywords: ["reload"], action: () => window.location.reload() },
    
    // Theme
    { id: "theme-toggle", label: "Toggle Theme", icon: "🎨", category: "Appearance", keywords: ["dark", "light", "mode"], action: () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    }},
  ];

  const filteredCommands = commands.filter((cmd) => {
    const searchLower = search.toLowerCase();
    return (
      cmd.label.toLowerCase().includes(searchLower) ||
      cmd.keywords?.some((k) => k.toLowerCase().includes(searchLower)) ||
      cmd.category.toLowerCase().includes(searchLower)
    );
  });

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  const executeCommand = useCallback((cmd: Command) => {
    cmd.action();
    setIsOpen(false);
    setSearch("");
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command palette with Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      
      // Close with Escape
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearch("");
        setSelectedIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      e.preventDefault();
      executeCommand(filteredCommands[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  let flatIndex = -1;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={() => {
          setIsOpen(false);
          setSearch("");
          setSelectedIndex(0);
        }}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] pointer-events-none">
        <div
          className="w-full max-w-lg rounded-xl shadow-2xl border overflow-hidden pointer-events-auto animate-slide-down"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)" }}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
            <span className="text-xl">⌘</span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a command or search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "var(--foreground)" }}
            />
            <kbd
              className="px-2 py-1 text-xs rounded"
              style={{ backgroundColor: "var(--input-bg)", color: "var(--muted)" }}
            >
              ESC
            </kbd>
          </div>
          
          {/* Commands List */}
          <div className="max-h-80 overflow-y-auto p-2">
            {Object.keys(groupedCommands).length === 0 ? (
              <div className="text-center py-8 opacity-60">
                <p className="text-sm">No commands found</p>
              </div>
            ) : (
              Object.entries(groupedCommands).map(([category, cmds]) => (
                <div key={category} className="mb-2">
                  <p className="text-xs font-medium opacity-50 px-2 py-1 uppercase tracking-wider">
                    {category}
                  </p>
                  {cmds.map((cmd) => {
                    flatIndex++;
                    const isSelected = flatIndex === selectedIndex;
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => executeCommand(cmd)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          isSelected ? "ring-2 ring-offset-1 ring-blue-500" : ""
                        }`}
                        style={{
                          backgroundColor: isSelected ? "var(--input-bg)" : "transparent",
                        }}
                      >
                        <span className="text-lg">{cmd.icon}</span>
                        <span className="text-sm">{cmd.label}</span>
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
          
          {/* Footer */}
          <div
            className="flex items-center justify-between px-4 py-2 border-t text-xs"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--input-bg)" }}>↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--input-bg)" }}>↓</kbd>
                <span className="ml-1">Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--input-bg)" }}>↵</kbd>
                <span className="ml-1">Select</span>
              </span>
            </div>
            <span>Press <kbd className="px-1.5 py-0.5 rounded mx-1" style={{ backgroundColor: "var(--input-bg)" }}>⌘K</kbd> to toggle</span>
          </div>
        </div>
      </div>
    </>
  );
}
