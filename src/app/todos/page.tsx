"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  assignee: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
}

const teamMembers = ["Jane", "John", "Alex", "Sam"];

const initialTodos: Todo[] = [
  { id: 1, text: "Review pull request for authentication module", completed: false, assignee: "Jane", priority: "high", createdAt: "2024-01-15" },
  { id: 2, text: "Update documentation for API endpoints", completed: true, assignee: "John", priority: "medium", createdAt: "2024-01-14" },
  { id: 3, text: "Fix responsive layout issues on mobile", completed: false, assignee: "Alex", priority: "medium", createdAt: "2024-01-13" },
  { id: 4, text: "Set up CI/CD pipeline for staging", completed: false, assignee: "Sam", priority: "high", createdAt: "2024-01-12" },
  { id: 5, text: "Write unit tests for user service", completed: true, assignee: "Jane", priority: "low", createdAt: "2024-01-11" },
];

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoAssignee, setNewTodoAssignee] = useState(teamMembers[0]);
  const [newTodoPriority, setNewTodoPriority] = useState<"low" | "medium" | "high">("medium");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = () => {
    if (!newTodoText.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
      assignee: newTodoAssignee,
      priority: newTodoPriority,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTodos([newTodo, ...todos]);
    setNewTodoText("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((t) => !t.completed).length;
  const completedTodosCount = todos.filter((t) => t.completed).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "info";
    }
  };

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Todos" }]} />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Team Todos</h1>
          <p className="opacity-70 mt-1">Collaborative task list for all team members</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: "var(--accent)", color: "#fff" }}>
            {activeTodosCount} Active
          </span>
          <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: "var(--muted)", color: "#fff" }}>
            {completedTodosCount} Done
          </span>
        </div>
      </div>

      {/* Add Todo Form */}
      <div
        className="rounded-xl p-6 border"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <h2 className="font-semibold mb-4">Add New Todo</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
          <select
            value={newTodoAssignee}
            onChange={(e) => setNewTodoAssignee(e.target.value)}
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          >
            {teamMembers.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
          <select
            value={newTodoPriority}
            onChange={(e) => setNewTodoPriority(e.target.value as "low" | "medium" | "high")}
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={addTodo}
            className="px-6 py-2 rounded-lg font-medium text-white transition hover:opacity-90"
            style={{ backgroundColor: "var(--primary)" }}
          >
            Add Todo
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
              filter === f ? "text-white" : "opacity-70 hover:opacity-100"
            }`}
            style={{
              backgroundColor: filter === f ? "var(--primary)" : "var(--card-bg)",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        {filteredTodos.length === 0 ? (
          <div className="p-8 text-center opacity-60">
            <p>No todos found. {filter !== "all" && "Try a different filter or "} Add a new one!</p>
          </div>
        ) : (
          <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-4 p-4 hover:opacity-95 transition"
                style={{ borderColor: "var(--border)" }}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                    todo.completed ? "text-white" : ""
                  }`}
                  style={{
                    borderColor: todo.completed ? "var(--accent)" : "var(--border)",
                    backgroundColor: todo.completed ? "var(--accent)" : "transparent",
                  }}
                >
                  {todo.completed && "✓"}
                </button>
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium ${todo.completed ? "line-through opacity-50" : ""}`}
                    style={{ color: "var(--foreground)" }}
                  >
                    {todo.text}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-sm">
                    <span className="opacity-60">Assigned to {todo.assignee}</span>
                    <span className="opacity-40">•</span>
                    <span className="opacity-60">{todo.createdAt}</span>
                  </div>
                </div>
                <Badge variant={getPriorityColor(todo.priority) as "success" | "warning" | "danger" | "info"}>
                  {todo.priority}
                </Badge>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 rounded-lg hover:opacity-80 transition text-sm"
                  style={{ color: "var(--danger)" }}
                  title="Delete todo"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
