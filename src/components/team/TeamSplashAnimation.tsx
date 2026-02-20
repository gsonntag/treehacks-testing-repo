"use client";

import { useEffect, useState } from "react";

export function TeamSplashAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "show" | "exit">("enter");

  useEffect(() => {
    const showTimer = setTimeout(() => setPhase("show"), 100);
    const exitTimer = setTimeout(() => setPhase("exit"), 2200);
    const doneTimer = setTimeout(() => onComplete(), 3000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

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
        background: "linear-gradient(135deg, #0a0a2e 0%, #1a0533 25%, #2d1b69 50%, #0a0a2e 100%)",
        backgroundSize: "400% 400%",
        animation: "miami-gradient-shift 4s ease infinite",
        opacity: phase === "exit" ? 0 : 1,
        transition: "opacity 0.8s ease-out",
        overflow: "hidden",
      }}
    >
      {/* Animated pulse rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            border: `2px solid ${i === 0 ? "#ff2d95" : i === 1 ? "#00e5ff" : "#ffb347"}`,
            animation: `pulse-ring 2.5s ease-out ${i * 0.5}s infinite`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Main icon */}
      <div
        style={{
          fontSize: "80px",
          animation: "float-icon 2s ease-in-out infinite",
          opacity: phase === "enter" ? 0 : 1,
          transform: phase === "enter" ? "scale(0.5)" : "scale(1)",
          transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        👥
      </div>

      {/* Title */}
      <h1
        style={{
          marginTop: "24px",
          fontSize: "48px",
          fontWeight: 800,
          background: "linear-gradient(90deg, #ff2d95, #00e5ff, #ffb347)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: phase === "enter" ? 0 : 1,
          transform: phase === "enter" ? "translateY(30px)" : "translateY(0)",
          transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
        }}
      >
        Meet the Team
      </h1>

      {/* Subtitle */}
      <p
        style={{
          marginTop: "12px",
          fontSize: "18px",
          color: "#8888cc",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          opacity: phase === "enter" ? 0 : 1,
          transform: phase === "enter" ? "translateY(20px)" : "translateY(0)",
          transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
        }}
      >
        The people behind CommandHub
      </p>

      {/* Decorative neon line */}
      <div
        style={{
          marginTop: "32px",
          width: phase === "enter" ? "0px" : "200px",
          height: "3px",
          background: "linear-gradient(90deg, #ff2d95, #00e5ff)",
          borderRadius: "2px",
          transition: "width 0.8s ease 0.5s",
          boxShadow: "0 0 20px rgba(255, 45, 149, 0.5), 0 0 40px rgba(0, 229, 255, 0.3)",
        }}
      />
    </div>
  );
}
