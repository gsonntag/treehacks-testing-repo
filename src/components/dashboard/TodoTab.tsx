"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  assignee: string;
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

const initialTodos: Todo[] = [
  {
    id: "1",
    text: "Review project requirements",
    completed: true,
    assignee: "Jane",
    priority: "high",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    text: "Set up development environment",
    completed: true,
    assignee: "John",
    priority: "high",
    createdAt: new Date("2024-01-16"),
  },
  {
    id: "3",
    text: "Design database schema",
    completed: false,
    assignee: "Alex",
    priority: "medium",
    createdAt: new Date("2024-01-17"),
  },
  {
    id: "4",
    text: "Implement authentication",
    completed: false,
    assignee: "Jane",
    priority: "high",
    createdAt: new Date("2024-01-18"),
  },
  {
    id: "5",
    text: "Write unit tests",
    completed: false,
    assignee: "Sam",
    priority: "low",
    createdAt: new Date("2024-01-19"),
  },
];

const teamMembers = ["Jane", "John", "Alex", "Sam"];

export function TodoTab() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoAssignee, setNewTodoAssignee] = useState(teamMembers[0]);
  const [newTodoPriority, setNewTodoPriority] = useState<Todo["priority"]>("medium");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = () => {
    if (!newTodoText.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newTodoText.trim(),
      completed: false,
      assignee: newTodoAssignee,
      priority: newTodoPriority,
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
    setNewTodoText("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.filter((t) => !t.completed).length;

  const priorityColors = {
    low: "info",
    medium: "warning",
    high: "danger",
  } as const;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex gap-4 mb-4">
        <div
          className="px-4 py-2 rounded-lg"
          style={{ backgroundColor: "var(--input-bg)" }}
        >
          <span className="text-sm opacity-70">Total: </span>
          <span className="font-bold">{todos.length}</span>
        </div>
        <div
          className="px-4 py-2 rounded-lg"
          style={{ backgroundColor: "var(--input-bg)" }}
        >
          <span className="text-sm opacity-70">Active: </span>
          <span className="font-bold" style={{ color: "var(--warning)" }}>
            {activeCount}
          </span>
        </div>
        <div
          className="px-4 py-2 rounded-lg"
          style={{ backgroundColor: "var(--input-bg)" }}
        >
          <span className="text-sm opacity-70">Completed: </span>
          <span className="font-bold" style={{ color: "var(--accent)" }}>
            {completedCount}
          </span>
        </div>
      </div>

      {/* Add new todo */}
      <div
        className="p-4 rounded-lg border"
        style={{
          backgroundColor: "var(--input-bg)",
          borderColor: "var(--border)",
        }}
      >
        <h3 className="font-medium mb-3">Add New Task</h3>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border outline-none focus:ring-2"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--border)",
              // @ts-expect-error CSS custom property
              "--tw-ring-color": "var(--primary)",
            }}
          />
          <select
            value={newTodoAssignee}
            onChange={(e) => setNewTodoAssignee(e.target.value)}
            className="px-3 py-2 rounded-lg border outline-none"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--border)",
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
            onChange={(e) =>
              setNewTodoPriority(e.target.value as Todo["priority"])
            }
            className="px-3 py-2 rounded-lg border outline-none"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--border)",
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={addTodo}
            className="px-4 py-2 rounded-lg font-medium text-white transition hover:opacity-90"
            style={{ backgroundColor: "var(--primary)" }}
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition capitalize"
            style={{
              backgroundColor:
                filter === f ? "var(--primary)" : "var(--input-bg)",
              color: filter === f ? "#fff" : "var(--foreground)",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Todo list */}
      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <div
            className="text-center py-8 opacity-60"
            style={{ color: "var(--muted)" }}
          >
            No tasks found
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 rounded-lg border transition hover:opacity-90"
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--border)",
                opacity: todo.completed ? 0.7 : 1,
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 rounded cursor-pointer accent-current"
                style={{ accentColor: "var(--primary)" }}
              />
              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium ${
                    todo.completed ? "line-through opacity-60" : ""
                  }`}
                >
                  {todo.text}
                </p>
                <p className="text-sm opacity-60">
                  Assigned to: {todo.assignee}
                </p>
              </div>
              <Badge variant={priorityColors[todo.priority]}>
                {todo.priority}
              </Badge>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-2 rounded hover:opacity-70 transition text-lg"
                style={{ color: "var(--danger)" }}
                title="Delete task"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
