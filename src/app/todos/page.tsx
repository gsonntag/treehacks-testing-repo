"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TodoList } from "@/components/todo/TodoList";

export default function TodosPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Todos" }]} />

      <div>
        <h1 className="text-2xl font-bold mb-2">Team Todos</h1>
        <p className="opacity-70">
          Collaborate with your team on shared tasks. Assign, prioritize, and track progress together.
        </p>
      </div>

      <div
        className="rounded-xl p-6 border"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <TodoList />
      </div>
    </div>
  );
}
