"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TodoTab } from "@/components/dashboard/TodoTab";

export default function TodosPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Todos" }]} />
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Team Todos</h1>
          <p className="opacity-70 mt-1">Collaborative task management for your team</p>
        </div>
      </div>

      <div
        className="rounded-xl p-6 border"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <TodoTab />
      </div>
    </div>
  );
}
