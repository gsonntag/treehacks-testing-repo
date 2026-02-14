"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  assignee: string;
  priority: "low" | "medium" | "high";
  createdBy: string;
}

const initialTasks: Task[] = [
  { id: 1, title: "Review pull request #42", completed: false, assignee: "Jane", priority: "high", createdBy: "John" },
  { id: 2, title: "Update documentation", completed: true, assignee: "John", priority: "low", createdBy: "Jane" },
  { id: 3, title: "Fix login page bug", completed: false, assignee: "Alex", priority: "high", createdBy: "Sam" },
  { id: 4, title: "Design new dashboard layout", completed: false, assignee: "Sam", priority: "medium", createdBy: "Alex" },
  { id: 5, title: "Set up CI/CD pipeline", completed: true, assignee: "Jane", priority: "medium", createdBy: "John" },
  { id: 6, title: "Write unit tests for API", completed: false, assignee: "John", priority: "low", createdBy: "Jane" },
];

const teamMembers = ["Jane", "John", "Alex", "Sam"];

export default function TodosPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState(teamMembers[0]);
  const [newTaskPriority, setNewTaskPriority] = useState<"low" | "medium" | "high">("medium");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Math.max(...tasks.map((t) => t.id)) + 1,
      title: newTaskTitle.trim(),
      completed: false,
      assignee: newTaskAssignee,
      priority: newTaskPriority,
      createdBy: "You",
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Todos" }]} />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Team Todo List</h1>
          <p className="opacity-70 text-sm mt-1">
            {activeCount} active tasks • {completedCount} completed
          </p>
        </div>
      </div>

      {/* Add new task */}
      <div
        className="rounded-xl p-6 border"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <h2 className="font-semibold mb-4">Add New Task</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Enter task title..."
            className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
          />
          <select
            value={newTaskAssignee}
            onChange={(e) => setNewTaskAssignee(e.target.value)}
            className="px-4 py-2 rounded-lg border focus:outline-none"
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
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value as "low" | "medium" | "high")}
            className="px-4 py-2 rounded-lg border focus:outline-none"
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
            onClick={addTask}
            className="px-6 py-2 rounded-lg font-medium text-white transition hover:opacity-90"
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
            className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
              filter === f ? "text-white" : "opacity-70 hover:opacity-100"
            }`}
            style={{
              backgroundColor: filter === f ? "var(--primary)" : "var(--card-bg)",
            }}
          >
            {f} {f === "all" ? `(${tasks.length})` : f === "active" ? `(${activeCount})` : `(${completedCount})`}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div
            className="rounded-xl p-8 border text-center opacity-70"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            No tasks found.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`rounded-xl p-4 border flex items-center gap-4 transition ${
                task.completed ? "opacity-60" : ""
              }`}
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition ${
                  task.completed
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-gray-400 hover:border-green-500"
                }`}
              >
                {task.completed && "✓"}
              </button>

              <div className="flex-1 min-w-0">
                <p className={`font-medium ${task.completed ? "line-through" : ""}`}>
                  {task.title}
                </p>
                <p className="text-sm opacity-60">
                  Assigned to <span className="font-medium">{task.assignee}</span> • Created by{" "}
                  <span className="font-medium">{task.createdBy}</span>
                </p>
              </div>

              <Badge
                variant={
                  task.priority === "high"
                    ? "danger"
                    : task.priority === "medium"
                      ? "warning"
                      : "info"
                }
              >
                {task.priority}
              </Badge>

              <button
                onClick={() => deleteTask(task.id)}
                className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition"
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
