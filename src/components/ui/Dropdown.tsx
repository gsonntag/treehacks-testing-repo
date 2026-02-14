"use client";

import { useState, useRef, useEffect } from "react";

interface DropdownItem {
  id: string;
  label: string;
  onClick?: () => void;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
}

export function Dropdown({ trigger, items }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="focus:outline-none">
        {trigger}
      </button>
      {open && (
        <div
          className="absolute right-0 mt-2 py-1 rounded-lg shadow-xl border min-w-[160px] z-50"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)" }}
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm hover:opacity-90"
              style={{ backgroundColor: "transparent" }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
