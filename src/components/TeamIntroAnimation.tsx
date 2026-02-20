"use client";

import { useEffect, useState } from "react";

export function TeamIntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "show" | "exit" | "done">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("show"), 100);
    const t2 = setTimeout(() => setPhase("exit"), 2200);
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
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
        background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 30%, #0a1a2e 60%, #0a0a1a 100%)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        opacity: phase === "exit" ? 0 : 1,
        transform: phase === "enter" ? "scale(1.1)" : phase === "exit" ? "scale(0.95)" : "scale(1)",
        overflow: "hidden",
      }}
    >
      {/* Animated neon grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,45,149,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: "fade-in-up 1s ease-out",
        }}
      />

      {/* Horizontal neon bar */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, #ff2d95, #00e5ff, transparent)",
          animation: "neon-bar 2s ease-in-out",
          opacity: phase === "exit" ? 0 : 0.8,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Glowing circles */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,45,149,0.15) 0%, transparent 70%)",
          animation: "miami-text-glow 3s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)",
          top: "30%",
          left: "20%",
          animation: "miami-text-glow 3s ease-in-out 0.5s infinite",
          pointerEvents: "none",
        }}
      />

      {/* Main text */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          animation: "fade-in-up 0.8s ease-out 0.3s both",
        }}
      >
        <div
          style={{
            fontSize: "5rem",
            marginBottom: "0.5rem",
            filter: "drop-shadow(0 0 20px rgba(255,45,149,0.5))",
            animation: "miami-text-glow 2s ease-in-out infinite",
          }}
        >
          👥
        </div>
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: 800,
            background: "linear-gradient(135deg, #ff2d95, #00e5ff, #b042ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          Meet the Team
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: "#7b8da6",
            animation: "fade-in-up 0.8s ease-out 0.6s both",
          }}
        >
          The people behind the magic ✨
        </p>
      </div>

      {/* Bottom neon bar */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "200px",
          height: "3px",
          borderRadius: "2px",
          background: "linear-gradient(90deg, #ff2d95, #b042ff, #00e5ff)",
          opacity: phase === "show" ? 1 : 0,
          transition: "opacity 0.5s ease",
          boxShadow: "0 0 20px rgba(255,45,149,0.5), 0 0 40px rgba(0,229,255,0.3)",
        }}
      />
    </div>
  );
}
