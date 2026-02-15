"use client";

import { useState, useEffect } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function ProductivityPage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    // Trigger animation phases
    const timer1 = setTimeout(() => setAnimationPhase(1), 100);
    const timer2 = setTimeout(() => setAnimationPhase(2), 600);
    const timer3 = setTimeout(() => setAnimationPhase(3), 1200);
    const timer4 = setTimeout(() => {
      setAnimationPhase(4);
      setTimeout(() => setShowWelcome(false), 800);
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const tasks = [
    { id: 1, title: "Review pull requests", status: "in-progress", priority: "high" },
    { id: 2, title: "Update documentation", status: "pending", priority: "medium" },
    { id: 3, title: "Fix navigation bug", status: "completed", priority: "high" },
    { id: 4, title: "Team standup meeting", status: "completed", priority: "low" },
    { id: 5, title: "Deploy staging environment", status: "pending", priority: "high" },
  ];

  const focusTime = 4.5;
  const tasksCompleted = 12;
  const streakDays = 7;

  return (
    <>
      {/* Fullscreen Welcome Animation */}
      {showWelcome && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, var(--background) 0%, var(--card-bg) 50%, var(--sidebar-bg) 100%)",
            opacity: animationPhase >= 4 ? 0 : 1,
            transition: "opacity 0.8s ease-out",
          }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 100 + 50,
                  height: Math.random() * 100 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
                  opacity: animationPhase >= 1 ? 0.3 : 0,
                  transform: `scale(${animationPhase >= 1 ? 1 : 0})`,
                  transition: `all 1s ease-out ${i * 0.05}s`,
                }}
              />
            ))}
          </div>

          {/* Central content */}
          <div className="relative text-center z-10">
            {/* Pulsing circle */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: animationPhase >= 2 ? 300 : 0,
                height: animationPhase >= 2 ? 300 : 0,
                background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
                opacity: 0.2,
                transition: "all 0.8s ease-out",
              }}
            />

            {/* Main icon */}
            <div
              className="text-8xl mb-6"
              style={{
                opacity: animationPhase >= 1 ? 1 : 0,
                transform: `scale(${animationPhase >= 1 ? 1 : 0.5}) rotate(${animationPhase >= 1 ? 0 : -180}deg)`,
                transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              🚀
            </div>

            {/* Welcome text */}
            <h1
              className="text-4xl font-bold mb-4"
              style={{
                color: "var(--foreground)",
                opacity: animationPhase >= 2 ? 1 : 0,
                transform: `translateY(${animationPhase >= 2 ? 0 : 20}px)`,
                transition: "all 0.5s ease-out",
              }}
            >
              Ready to be productive?
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl"
              style={{
                color: "var(--muted)",
                opacity: animationPhase >= 3 ? 1 : 0,
                transform: `translateY(${animationPhase >= 3 ? 0 : 20}px)`,
                transition: "all 0.5s ease-out",
              }}
            >
              Let&apos;s make today count!
            </p>

            {/* Loading bar */}
            <div
              className="mt-8 w-64 mx-auto h-1 rounded-full overflow-hidden"
              style={{
                backgroundColor: "var(--border)",
                opacity: animationPhase >= 3 ? 1 : 0,
                transition: "opacity 0.3s ease-out",
              }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  backgroundColor: "var(--primary)",
                  width: animationPhase >= 3 ? "100%" : "0%",
                  transition: "width 1.2s ease-out",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className="space-y-8"
        style={{
          opacity: showWelcome ? 0 : 1,
          transition: "opacity 0.5s ease-out",
        }}
      >
        <Breadcrumbs items={[{ label: "Productivity", href: "/productivity" }]} />

        <div>
          <h1 className="text-2xl font-bold mb-2">Productivity Hub</h1>
          <p className="opacity-70">Track your focus, manage tasks, and boost your workflow.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Focus Time Today"
            value={`${focusTime}h`}
            change="+45min vs yesterday"
            changeType="positive"
            icon="⏱️"
          />
          <StatCard
            title="Tasks Completed"
            value={tasksCompleted}
            change="+3 today"
            changeType="positive"
            icon="✅"
          />
          <StatCard
            title="Productivity Streak"
            value={`${streakDays} days`}
            change="Personal best!"
            changeType="positive"
            icon="🔥"
          />
          <StatCard
            title="Focus Score"
            value="92%"
            change="+5% this week"
            changeType="positive"
            icon="📊"
          />
        </div>

        {/* Tasks and Focus Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks List */}
          <div
            className="lg:col-span-2 rounded-xl p-6 border"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            <h2 className="font-semibold mb-4">Today&apos;s Tasks</h2>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 rounded-lg"
                  style={{ backgroundColor: "var(--input-bg)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        task.status === "completed"
                          ? "bg-green-500"
                          : task.status === "in-progress"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                      }`}
                    />
                    <span
                      className={task.status === "completed" ? "line-through opacity-60" : ""}
                    >
                      {task.title}
                    </span>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === "high"
                        ? "bg-red-500/20 text-red-400"
                        : task.priority === "medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Focus Timer Section */}
          <div
            className="rounded-xl p-6 border"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            <h2 className="font-semibold mb-4">Daily Goals</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Focus Time</span>
                  <span>4.5h / 6h</span>
                </div>
                <ProgressBar value={75} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Tasks</span>
                  <span>12 / 15</span>
                </div>
                <ProgressBar value={80} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Meetings</span>
                  <span>2 / 3</span>
                </div>
                <ProgressBar value={67} />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
              <h3 className="font-semibold mb-3">Quick Start</h3>
              <button
                className="w-full py-3 rounded-lg font-medium transition hover:opacity-90"
                style={{ backgroundColor: "var(--primary)", color: "#fff" }}
              >
                🎯 Start Focus Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
