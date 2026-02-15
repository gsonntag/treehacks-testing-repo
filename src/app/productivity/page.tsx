"use client";

import { useEffect, useState, useCallback } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
}

const confettiColors = [
  "#ff6b9d",
  "#00d9ff",
  "#c084fc",
  "#fbbf24",
  "#3fb950",
  "#ff4d6d",
  "#58a6ff",
];

function ConfettiOverlay({ onComplete }: { onComplete: () => void }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const createConfetti = useCallback(() => {
    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < 150; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        rotation: Math.random() * 360,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        size: 8 + Math.random() * 12,
        velocityX: (Math.random() - 0.5) * 4,
        velocityY: 2 + Math.random() * 4,
      });
    }
    return newPieces;
  }, []);

  useEffect(() => {
    setPieces(createConfetti());

    const interval = setInterval(() => {
      setPieces((prev) =>
        prev
          .map((piece) => ({
            ...piece,
            x: piece.x + piece.velocityX,
            y: piece.y + piece.velocityY,
            rotation: piece.rotation + 5,
            velocityY: piece.velocityY + 0.1,
          }))
          .filter((piece) => piece.y < 120)
      );
    }, 30);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      onComplete();
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [createConfetti, onComplete]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}

export default function ProductivityPage() {
  const [showConfetti, setShowConfetti] = useState(true);

  return (
    <div className="space-y-8">
      {showConfetti && <ConfettiOverlay onComplete={() => setShowConfetti(false)} />}

      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Productivity" }]} />

      <div>
        <h1 className="text-2xl font-bold mb-2">🚀 Productivity Hub</h1>
        <p className="opacity-70">Track your focus and accomplish more every day!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Tasks Completed"
          value={47}
          change="+12 today"
          changeType="positive"
          icon="✅"
        />
        <StatCard
          title="Focus Time"
          value="6h 32m"
          change="+45min vs yesterday"
          changeType="positive"
          icon="🎯"
        />
        <StatCard
          title="Streak"
          value="14 days"
          change="Keep it up!"
          changeType="positive"
          icon="🔥"
        />
        <StatCard
          title="Goals Met"
          value="89%"
          change="+5% this week"
          changeType="positive"
          icon="🏆"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="rounded-xl p-6 border"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
        >
          <h2 className="font-semibold mb-4">Daily Progress</h2>
          <div className="space-y-4">
            <ProgressBar value={85} label="Deep Work" />
            <ProgressBar value={60} label="Meetings" />
            <ProgressBar value={95} label="Code Reviews" />
            <ProgressBar value={40} label="Documentation" />
          </div>
        </div>

        <div
          className="rounded-xl p-6 border"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
        >
          <h2 className="font-semibold mb-4">Focus Sessions</h2>
          <div className="space-y-3">
            {[
              { time: "9:00 AM", duration: "2h", task: "Feature Development", completed: true },
              { time: "11:30 AM", duration: "1h", task: "Code Review", completed: true },
              { time: "2:00 PM", duration: "1.5h", task: "Bug Fixes", completed: true },
              { time: "4:00 PM", duration: "2h", task: "Documentation", completed: false },
            ].map((session, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ backgroundColor: "var(--input-bg)" }}
              >
                <div className="flex items-center gap-3">
                  <span className={session.completed ? "text-green-500" : "opacity-50"}>
                    {session.completed ? "✅" : "⏳"}
                  </span>
                  <div>
                    <p className="font-medium">{session.task}</p>
                    <p className="text-sm opacity-60">{session.time} • {session.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="rounded-xl p-6 border"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <h2 className="font-semibold mb-4">Weekly Overview</h2>
        <div className="grid grid-cols-7 gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
            const productivity = [85, 92, 78, 95, 88, 45, 30][i];
            return (
              <div key={day} className="text-center">
                <p className="text-xs opacity-60 mb-2">{day}</p>
                <div
                  className="mx-auto w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium"
                  style={{
                    backgroundColor:
                      productivity >= 80
                        ? "var(--accent)"
                        : productivity >= 50
                        ? "var(--warning)"
                        : "var(--border)",
                    color: productivity >= 50 ? "#fff" : "var(--foreground)",
                  }}
                >
                  {productivity}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
