"use client";

import { useState, useEffect } from "react";

export function TeamIntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"intro" | "exit" | "done">("intro");

  useEffect(() => {
    // After the intro plays, start exit
    const exitTimer = setTimeout(() => setPhase("exit"), 2400);
    // After exit animation, mark done
    const doneTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(-45deg, #1a0a2e, #2d1b4e, #0f0524, #1a0a2e)",
        backgroundSize: "400% 400%",
        animation: phase === "exit"
          ? "slide-out-up 0.8s ease-in forwards"
          : "miami-gradient 4s ease infinite",
        overflow: "hidden",
      }}
    >
      {/* Animated particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            borderRadius: "50%",
            background: i % 3 === 0 ? "#ff2d95" : i % 3 === 1 ? "#00e5ff" : "#7b2ff7",
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 40}%`,
            animation: `particle-rise ${2 + Math.random() * 3}s ease-out ${Math.random() * 2}s infinite`,
            opacity: 0.8,
          }}
        />
      ))}

      {/* Pulsing rings */}
      <div style={{ position: "relative", marginBottom: "2rem" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "120px",
              height: "120px",
              marginTop: "-60px",
              marginLeft: "-60px",
              borderRadius: "50%",
              border: `2px solid ${i === 0 ? "#ff2d95" : i === 1 ? "#00e5ff" : "#7b2ff7"}`,
              animation: `pulse-ring 2s ease-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
        {/* Center icon */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ff2d95, #7b2ff7, #00e5ff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
            animation: "float 3s ease-in-out infinite, fade-in-up 0.8s ease-out both",
            boxShadow: "0 0 40px rgba(255, 45, 149, 0.5), 0 0 80px rgba(0, 229, 255, 0.3)",
          }}
        >
          👥
        </div>
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: 800,
          background: "linear-gradient(90deg, #ff2d95, #00e5ff, #7b2ff7, #ff2d95)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shimmer 3s linear infinite, fade-in-up 0.8s ease-out 0.3s both",
          letterSpacing: "-0.02em",
          textAlign: "center",
        }}
      >
        Meet the Team
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: "1.15rem",
          color: "#b794d6",
          marginTop: "0.75rem",
          animation: "fade-in-up 0.8s ease-out 0.6s both",
          textAlign: "center",
        }}
      >
        The people who make it happen ✨
      </p>

      {/* Neon line */}
      <div
        style={{
          width: "180px",
          height: "3px",
          marginTop: "1.5rem",
          background: "linear-gradient(90deg, transparent, #ff2d95, #00e5ff, transparent)",
          borderRadius: "2px",
          animation: "fade-in-up 0.8s ease-out 0.9s both",
          boxShadow: "0 0 10px rgba(255, 45, 149, 0.6)",
        }}
      />
    </div>
  );
}
