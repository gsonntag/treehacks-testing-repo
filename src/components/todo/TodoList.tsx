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

const teamMembers = ["Jane", "John", "Alex", "Sam", "Emma"];

const initialTodos: Todo[] = [
  {
    id: "1",
    text: "Review pull request #42",
    completed: false,
    assignee: "Jane",
    priority: "high",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    text: "Update documentation",
    completed: true,
    assignee: "John",
    priority: "medium",
    createdAt: new Date("2024-01-14"),
  },
  {
    id: "3",
    text: "Fix login bug",
    completed: false,
    assignee: "Alex",
    priority: "high",
    createdAt: new Date("2024-01-13"),
  },
  {
    id: "4",
    text: "Design new landing page",
    completed: false,
    assignee: "Emma",
    priority: "medium",
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "5",
    text: "Set up CI/CD pipeline",
    completed: true,
    assignee: "Sam",
    priority: "low",
    createdAt: new Date("2024-01-11"),
  },
];

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoAssignee, setNewTodoAssignee] = useState(teamMembers[0]);
  const [newTodoPriority, setNewTodoPriority] = useState<"low" | "medium" | "high">("medium");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");

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
    
    setTodos([newTodo, ...todos]);
    setNewTodoText("");
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    const statusMatch = 
      filter === "all" ? true :
      filter === "active" ? !todo.completed :
      todo.completed;
    
    const assigneeMatch = assigneeFilter === "all" || todo.assignee === assigneeFilter;
    
    return statusMatch && assigneeMatch;
  });

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "danger";
      case "medium": return "warning";
      case "low": return "info";
      default: return "info";
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex items-center gap-4 text-sm">
        <span className="opacity-70">
          {completedCount} of {totalCount} tasks completed
        </span>
        <div
          className="flex-1 h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--input-bg)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${totalCount ? (completedCount / totalCount) * 100 : 0}%`,
              backgroundColor: "var(--accent)",
            }}
          />
        </div>
      </div>

      {/* Add Todo Form */}
      <div
        className="p-4 rounded-lg border"
        style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--border)" }}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
              // @ts-expect-error CSS custom property
              "--tw-ring-color": "var(--primary)",
            }}
          />
          <select
            value={newTodoAssignee}
            onChange={(e) => setNewTodoAssignee(e.target.value)}
            className="px-3 py-2 rounded-lg border focus:outline-none"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          >
            {teamMembers.map(member => (
              <option key={member} value={member}>{member}</option>
            ))}
          </select>
          <select
            value={newTodoPriority}
            onChange={(e) => setNewTodoPriority(e.target.value as "low" | "medium" | "high")}
            className="px-3 py-2 rounded-lg border focus:outline-none"
            style={{
              backgroundColor: "var(--card-bg)",
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
            className="px-4 py-2 rounded-lg font-medium transition hover:opacity-90"
            style={{ backgroundColor: "var(--primary)", color: "#fff" }}
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
          {(["all", "active", "completed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className="px-3 py-1.5 text-sm capitalize transition"
              style={{
                backgroundColor: filter === status ? "var(--primary)" : "var(--card-bg)",
                color: filter === status ? "#fff" : "var(--foreground)",
              }}
            >
              {status}
            </button>
          ))}
        </div>
        <select
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          className="px-3 py-1.5 text-sm rounded-lg border focus:outline-none"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
        >
          <option value="all">All Members</option>
          {teamMembers.map(member => (
            <option key={member} value={member}>{member}</option>
          ))}
        </select>
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <div
            className="p-8 text-center rounded-lg border opacity-60"
            style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--border)" }}
          >
            No tasks found
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition ${
                todo.completed ? "opacity-60" : ""
              }`}
              style={{
                backgroundColor: "var(--input-bg)",
                borderColor: "var(--border)",
              }}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className="w-5 h-5 rounded border-2 flex items-center justify-center transition"
                style={{
                  borderColor: todo.completed ? "var(--accent)" : "var(--border)",
                  backgroundColor: todo.completed ? "var(--accent)" : "transparent",
                }}
              >
                {todo.completed && <span className="text-white text-xs">✓</span>}
              </button>
              
              <div className="flex-1 min-w-0">
                <p className={`${todo.completed ? "line-through" : ""}`}>
                  {todo.text}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs opacity-70">
                  <span>👤 {todo.assignee}</span>
                  <span>•</span>
                  <span>{todo.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
              
              <Badge variant={getPriorityColor(todo.priority) as "info" | "warning" | "danger"}>
                {todo.priority}
              </Badge>
              
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-1.5 rounded hover:opacity-70 transition text-sm"
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
