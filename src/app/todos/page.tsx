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

const initialTodos: Todo[] = [
  { id: 1, text: "Review project requirements", completed: true, assignee: "Jane", priority: "high", createdAt: "2024-01-15" },
  { id: 2, text: "Set up development environment", completed: true, assignee: "John", priority: "high", createdAt: "2024-01-15" },
  { id: 3, text: "Design database schema", completed: false, assignee: "Alex", priority: "medium", createdAt: "2024-01-16" },
  { id: 4, text: "Create API endpoints", completed: false, assignee: "Sam", priority: "medium", createdAt: "2024-01-16" },
  { id: 5, text: "Write unit tests", completed: false, assignee: "Jane", priority: "low", createdAt: "2024-01-17" },
  { id: 6, text: "Deploy to staging", completed: false, assignee: "John", priority: "low", createdAt: "2024-01-18" },
];

const teamMembers = ["Jane", "John", "Alex", "Sam"];

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
      text: newTodoText.trim(),
      completed: false,
      assignee: newTodoAssignee,
      priority: newTodoPriority,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTodos([...todos, newTodo]);
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

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.filter((t) => !t.completed).length;

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      default:
        return "info";
    }
  };

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Todos" }]} />

      <div>
        <h1 className="text-2xl font-bold mb-2">Team Todo List</h1>
        <p className="opacity-70">Collaborate with your team on tasks and track progress together.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className="rounded-xl p-4 border"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
        >
          <div className="text-3xl font-bold" style={{ color: "var(--primary)" }}>
            {todos.length}
          </div>
          <div className="text-sm opacity-70">Total Tasks</div>
        </div>
        <div
          className="rounded-xl p-4 border"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
        >
          <div className="text-3xl font-bold" style={{ color: "var(--accent)" }}>
            {completedCount}
          </div>
          <div className="text-sm opacity-70">Completed</div>
        </div>
        <div
          className="rounded-xl p-4 border"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
        >
          <div className="text-3xl font-bold" style={{ color: "var(--warning)" }}>
            {activeCount}
          </div>
          <div className="text-sm opacity-70">In Progress</div>
        </div>
      </div>

      {/* Add New Todo */}
      <div
        className="rounded-xl p-6 border"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <h2 className="font-semibold mb-4">Add New Task</h2>
        <div className="flex flex-col sm:flex-row gap-3">
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
            className="px-6 py-2 rounded-lg font-medium transition hover:opacity-90"
            style={{ backgroundColor: "var(--primary)", color: "#fff" }}
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition"
            style={{
              backgroundColor: filter === f ? "var(--primary)" : "var(--card-bg)",
              color: filter === f ? "#fff" : "var(--foreground)",
              border: `1px solid ${filter === f ? "var(--primary)" : "var(--border)"}`,
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === "all" && ` (${todos.length})`}
            {f === "active" && ` (${activeCount})`}
            {f === "completed" && ` (${completedCount})`}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        {filteredTodos.length === 0 ? (
          <div className="p-8 text-center opacity-60">No tasks found</div>
        ) : (
          <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-4 p-4 hover:opacity-90 transition"
                style={{ backgroundColor: todo.completed ? "var(--input-bg)" : "transparent" }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 rounded cursor-pointer"
                  style={{ accentColor: "var(--primary)" }}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium ${todo.completed ? "line-through opacity-60" : ""}`}
                  >
                    {todo.text}
                  </p>
                  <div className="flex gap-2 mt-1 text-xs opacity-70">
                    <span>Assigned to: {todo.assignee}</span>
                    <span>•</span>
                    <span>{todo.createdAt}</span>
                  </div>
                </div>
                <Badge variant={getPriorityVariant(todo.priority) as "danger" | "warning" | "info"}>
                  {todo.priority}
                </Badge>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 rounded-lg hover:opacity-80 transition"
                  style={{ backgroundColor: "var(--input-bg)", color: "var(--danger)" }}
                  title="Delete task"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Progress Bar */}
      <div
        className="rounded-xl p-6 border"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <h2 className="font-semibold mb-4">Team Progress</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Completion</span>
            <span>{todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0}%</span>
          </div>
          <div
            className="h-3 rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--input-bg)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${todos.length > 0 ? (completedCount / todos.length) * 100 : 0}%`,
                backgroundColor: "var(--accent)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
