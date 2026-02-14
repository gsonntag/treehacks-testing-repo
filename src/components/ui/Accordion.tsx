"use client";

import { useState } from "react";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            className="rounded-lg border overflow-hidden"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--card-bg)" }}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:opacity-90 transition"
            >
              <span className="font-medium">{item.title}</span>
              <span className="text-lg">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-0 border-t" style={{ borderColor: "var(--border)" }}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
