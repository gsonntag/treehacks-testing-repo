"use client";

import { useState, useEffect } from "react";

export function TeamSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Phase 1: Sun rises (0 -> 1)
    const t1 = setTimeout(() => setPhase(1), 300);
    // Phase 2: Title appears (1 -> 2)
    const t2 = setTimeout(() => setPhase(2), 900);
    // Phase 3: Subtitle (2 -> 3)
    const t3 = setTimeout(() => setPhase(3), 1500);
    // Phase 4: Fade out (3 -> 4)
    const t4 = setTimeout(() => setPhase(4), 2800);
    // Phase 5: Complete
    const t5 = setTimeout(() => onComplete(), 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a1a 0%, #1a0533 30%, #2d0a4e 50%, #ff2d95 85%, #ff6b35 100%)",
        animation: phase >= 4 ? "fade-out 0.8s ease-in-out forwards" : undefined,
        pointerEvents: phase >= 4 ? "none" : "auto",
      }}
    >
      {/* Retro grid floor */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "40%",
          backgroundImage:
            "linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)",
          backgroundSize: "60px 40px",
          animation: "grid-scroll 2s linear infinite",
          maskImage: "linear-gradient(to bottom, transparent, black 20%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%)",
        }}
      />

      {/* Sun */}
      <div
        className="absolute"
        style={{
          bottom: "35%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "linear-gradient(180deg, #ff6b35 0%, #ff2d95 50%, #ff2d95 100%)",
          boxShadow: "0 0 80px rgba(255, 45, 149, 0.6), 0 0 160px rgba(255, 107, 53, 0.3)",
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "translateY(0) scale(1)" : "translateY(100px) scale(0.5)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Sun horizontal lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute left-0 right-0"
            style={{
              bottom: `${10 + i * 15}%`,
              height: `${3 + i * 2}px`,
              backgroundColor: "rgba(10, 10, 26, 0.6)",
            }}
          />
        ))}
      </div>

      {/* Palm trees */}
      <div
        className="absolute text-7xl"
        style={{
          bottom: "25%",
          left: "10%",
          opacity: phase >= 1 ? 0.8 : 0,
          animation: phase >= 1 ? "float-palm 3s ease-in-out infinite" : undefined,
          transition: "opacity 0.5s ease",
          filter: "drop-shadow(0 0 20px rgba(255, 45, 149, 0.5))",
        }}
      >
        🌴
      </div>
      <div
        className="absolute text-6xl"
        style={{
          bottom: "28%",
          right: "12%",
          opacity: phase >= 1 ? 0.7 : 0,
          animation: phase >= 1 ? "float-palm 3s ease-in-out infinite 0.5s" : undefined,
          transition: "opacity 0.5s ease",
          filter: "drop-shadow(0 0 20px rgba(0, 229, 255, 0.5))",
        }}
      >
        🌴
      </div>

      {/* Stars */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 40}%`,
            left: `${Math.random() * 100}%`,
            backgroundColor: "#fff",
            opacity: Math.random() * 0.8 + 0.2,
            animation: `neon-flicker ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Title text */}
      <div className="relative z-10 text-center">
        <h1
          className="text-6xl md:text-8xl font-extrabold tracking-wider"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            background: "linear-gradient(90deg, #ff2d95, #00e5ff, #ff2d95)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: phase >= 2 ? "miami-gradient 3s linear infinite" : undefined,
            filter: "drop-shadow(0 0 30px rgba(255, 45, 149, 0.5))",
            fontFamily: "'Arial Black', 'Impact', sans-serif",
          }}
        >
          TEAM
        </h1>
        <p
          className="text-xl md:text-2xl mt-4 font-light tracking-[0.3em] uppercase"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            color: "#00e5ff",
            textShadow: "0 0 20px rgba(0, 229, 255, 0.5)",
            animation: phase >= 3 ? "neon-flicker 4s ease-in-out infinite" : undefined,
          }}
        >
          Welcome to the crew
        </p>
      </div>

      {/* Click to skip */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 text-sm tracking-widest uppercase"
        style={{
          color: "rgba(255, 255, 255, 0.4)",
          opacity: phase >= 2 ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        Click to skip
      </button>
    </div>
  );
}
