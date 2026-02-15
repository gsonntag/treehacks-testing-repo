"use client";

import { useState, useEffect } from "react";

const carEmojis = ["🏎️", "🚗", "🚘", "🏁", "💨"];
const neonColors = ["#ff00ff", "#00ffff", "#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24"];

export function ForeignRide() {
  const [position, setPosition] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [isRiding, setIsRiding] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; left: number; top: number }[]>([]);

  useEffect(() => {
    if (!isRiding) return;

    const moveInterval = setInterval(() => {
      setPosition((prev) => (prev >= 100 ? -20 : prev + 2));
    }, 50);

    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % neonColors.length);
    }, 300);

    const sparkleInterval = setInterval(() => {
      setSparkles((prev) => {
        const newSparkle = {
          id: Date.now(),
          left: Math.random() * 100,
          top: Math.random() * 100,
        };
        return [...prev.slice(-10), newSparkle];
      });
    }, 200);

    return () => {
      clearInterval(moveInterval);
      clearInterval(colorInterval);
      clearInterval(sparkleInterval);
    };
  }, [isRiding]);

  return (
    <div
      className="rounded-xl p-6 border relative overflow-hidden"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: isRiding ? neonColors[colorIndex] : "var(--card-border)",
        boxShadow: isRiding ? `0 0 30px ${neonColors[colorIndex]}40` : "none",
        transition: "all 0.3s ease",
        minHeight: "200px",
      }}
    >
      {/* Sparkles */}
      {isRiding &&
        sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className="absolute text-2xl animate-pulse"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animation: "fadeOut 1s forwards",
            }}
          >
            ✨
          </span>
        ))}

      <div className="flex items-center justify-between mb-4">
        <h2
          className="font-bold text-xl"
          style={{
            color: isRiding ? neonColors[colorIndex] : "var(--foreground)",
            textShadow: isRiding ? `0 0 10px ${neonColors[colorIndex]}` : "none",
          }}
        >
          🔥 Foreign Whip Mode 🔥
        </h2>
        <button
          onClick={() => setIsRiding(!isRiding)}
          className="px-4 py-2 rounded-lg font-semibold transition-all"
          style={{
            backgroundColor: isRiding ? "var(--danger)" : "var(--primary)",
            color: "#fff",
            boxShadow: isRiding ? `0 0 20px var(--danger)` : `0 0 20px var(--primary)`,
          }}
        >
          {isRiding ? "🛑 Pull Over" : "🚀 Let Her Ride"}
        </button>
      </div>

      {/* The Road */}
      <div
        className="relative h-24 rounded-lg overflow-hidden"
        style={{
          background: isRiding
            ? `linear-gradient(90deg, ${neonColors[colorIndex]}20, ${neonColors[(colorIndex + 2) % neonColors.length]}20)`
            : "var(--input-bg)",
        }}
      >
        {/* Road lines */}
        <div
          className="absolute inset-y-0 left-0 right-0 flex items-center justify-around"
          style={{ opacity: 0.3 }}
        >
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-1 rounded"
              style={{
                backgroundColor: isRiding ? neonColors[colorIndex] : "var(--muted)",
                animation: isRiding ? `slide ${0.3 + i * 0.05}s linear infinite` : "none",
              }}
            />
          ))}
        </div>

        {/* The Car */}
        <div
          className="absolute top-1/2 -translate-y-1/2 text-5xl transition-all"
          style={{
            left: `${position}%`,
            filter: isRiding ? `drop-shadow(0 0 10px ${neonColors[colorIndex]})` : "none",
            transform: `translateY(-50%) ${isRiding ? "scale(1.2)" : "scale(1)"}`,
          }}
        >
          {carEmojis[colorIndex % carEmojis.length]}
          {isRiding && (
            <span
              className="absolute -left-8 text-3xl"
              style={{ animation: "pulse 0.3s infinite" }}
            >
              💨
            </span>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center gap-4 text-sm">
        <span style={{ color: "var(--muted)" }}>Status:</span>
        <span
          className="font-semibold"
          style={{
            color: isRiding ? neonColors[colorIndex] : "var(--muted)",
            animation: isRiding ? "pulse 0.5s infinite" : "none",
          }}
        >
          {isRiding ? "🔥 RIDING IN THE FOREIGN 🔥" : "Parked"}
        </span>
      </div>

      {/* Speed indicator */}
      {isRiding && (
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Speed</span>
            <span style={{ color: neonColors[colorIndex] }}>MAX 🚀</span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--input-bg)" }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: "100%",
                background: `linear-gradient(90deg, ${neonColors.join(", ")})`,
                animation: "shimmer 1s infinite",
              }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0);
          }
        }
        @keyframes slide {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}
