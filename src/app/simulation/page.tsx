"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  color: string;
}

const COLORS = [
  "#3b82f6", // blue
  "#ef4444", // red
  "#22c55e", // green
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#f97316", // orange
];

const GRAVITY = 0.5;
const FRICTION = 0.99;
const RESTITUTION = 0.85; // Bounciness

function getRandomColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function createBall(id: number, canvasWidth: number, canvasHeight: number): Ball {
  const radius = 15 + Math.random() * 25;
  return {
    id,
    x: radius + Math.random() * (canvasWidth - 2 * radius),
    y: radius + Math.random() * (canvasHeight / 2 - radius),
    vx: (Math.random() - 0.5) * 10,
    vy: (Math.random() - 0.5) * 5,
    radius,
    mass: radius * radius, // Mass proportional to area
    color: getRandomColor(),
  };
}

function resolveBallCollision(ball1: Ball, ball2: Ball): void {
  const dx = ball2.x - ball1.x;
  const dy = ball2.y - ball1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const minDist = ball1.radius + ball2.radius;

  if (distance < minDist && distance > 0) {
    // Normalize collision vector
    const nx = dx / distance;
    const ny = dy / distance;

    // Relative velocity
    const dvx = ball1.vx - ball2.vx;
    const dvy = ball1.vy - ball2.vy;

    // Relative velocity along collision normal
    const dvn = dvx * nx + dvy * ny;

    // Only resolve if balls are approaching
    if (dvn > 0) {
      // Collision impulse (using conservation of momentum)
      const totalMass = ball1.mass + ball2.mass;
      const impulse = (2 * dvn) / totalMass;

      // Apply impulse
      ball1.vx -= impulse * ball2.mass * nx * RESTITUTION;
      ball1.vy -= impulse * ball2.mass * ny * RESTITUTION;
      ball2.vx += impulse * ball1.mass * nx * RESTITUTION;
      ball2.vy += impulse * ball1.mass * ny * RESTITUTION;
    }

    // Separate overlapping balls
    const overlap = minDist - distance;
    const separationX = (overlap / 2) * nx;
    const separationY = (overlap / 2) * ny;
    ball1.x -= separationX;
    ball1.y -= separationY;
    ball2.x += separationX;
    ball2.y += separationY;
  }
}

function updateBall(ball: Ball, canvasWidth: number, canvasHeight: number): void {
  // Apply gravity
  ball.vy += GRAVITY;

  // Apply friction
  ball.vx *= FRICTION;
  ball.vy *= FRICTION;

  // Update position
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Wall collisions
  // Right wall
  if (ball.x + ball.radius > canvasWidth) {
    ball.x = canvasWidth - ball.radius;
    ball.vx = -ball.vx * RESTITUTION;
  }
  // Left wall
  if (ball.x - ball.radius < 0) {
    ball.x = ball.radius;
    ball.vx = -ball.vx * RESTITUTION;
  }
  // Bottom wall
  if (ball.y + ball.radius > canvasHeight) {
    ball.y = canvasHeight - ball.radius;
    ball.vy = -ball.vy * RESTITUTION;
    // Extra friction when on ground
    ball.vx *= 0.98;
  }
  // Top wall
  if (ball.y - ball.radius < 0) {
    ball.y = ball.radius;
    ball.vy = -ball.vy * RESTITUTION;
  }
}

export default function SimulationPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const animationRef = useRef<number | null>(null);
  const [ballCount, setBallCount] = useState(8);
  const [isPaused, setIsPaused] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 500 });

  // Initialize balls
  const initializeBalls = useCallback(() => {
    const balls: Ball[] = [];
    for (let i = 0; i < ballCount; i++) {
      balls.push(createBall(i, canvasSize.width, canvasSize.height));
    }
    ballsRef.current = balls;
  }, [ballCount, canvasSize]);

  // Handle canvas resize
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCanvasSize({
          width: Math.max(400, rect.width - 32),
          height: Math.max(300, Math.min(600, window.innerHeight - 400)),
        });
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  // Initialize balls when canvas size changes or ball count changes
  useEffect(() => {
    initializeBalls();
  }, [initializeBalls]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const balls = ballsRef.current;

      // Clear canvas
      ctx.fillStyle = "rgba(17, 24, 39, 1)";
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

      // Draw border
      ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, canvasSize.width - 2, canvasSize.height - 2);

      if (!isPaused) {
        // Update physics
        for (let i = 0; i < balls.length; i++) {
          updateBall(balls[i], canvasSize.width, canvasSize.height);
        }

        // Check ball-to-ball collisions
        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            resolveBallCollision(balls[i], balls[j]);
          }
        }
      }

      // Draw balls
      for (const ball of balls) {
        // Draw shadow
        ctx.beginPath();
        ctx.arc(ball.x + 3, ball.y + 3, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fill();

        // Draw ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          ball.x - ball.radius * 0.3,
          ball.y - ball.radius * 0.3,
          0,
          ball.x,
          ball.y,
          ball.radius
        );
        gradient.addColorStop(0, lightenColor(ball.color, 30));
        gradient.addColorStop(1, ball.color);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw highlight
        ctx.beginPath();
        ctx.arc(
          ball.x - ball.radius * 0.3,
          ball.y - ball.radius * 0.3,
          ball.radius * 0.2,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [canvasSize, isPaused]);

  const handleReset = () => {
    initializeBalls();
  };

  const handleAddBall = () => {
    const newBall = createBall(
      ballsRef.current.length,
      canvasSize.width,
      canvasSize.height
    );
    ballsRef.current.push(newBall);
    setBallCount((c) => c + 1);
  };

  const handleRemoveBall = () => {
    if (ballsRef.current.length > 1) {
      ballsRef.current.pop();
      setBallCount((c) => c - 1);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/" },
          { label: "Simulation", href: "/simulation" },
        ]}
      />

      <div>
        <h1 className="text-2xl font-bold mb-2">2D Bouncing Ball Simulation</h1>
        <p className="opacity-70">
          Watch balls bounce around with realistic physics including gravity and
          collision detection.
        </p>
      </div>

      {/* Controls */}
      <div
        className="rounded-xl p-4 border flex flex-wrap gap-3 items-center"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="px-4 py-2 rounded-lg font-medium transition hover:opacity-90"
          style={{
            backgroundColor: isPaused ? "var(--success)" : "var(--warning)",
            color: "#fff",
          }}
        >
          {isPaused ? "▶️ Resume" : "⏸️ Pause"}
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-lg font-medium transition hover:opacity-90"
          style={{ backgroundColor: "var(--primary)", color: "#fff" }}
        >
          🔄 Reset
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRemoveBall}
            className="px-3 py-2 rounded-lg font-medium transition hover:opacity-90"
            style={{ backgroundColor: "var(--danger)", color: "#fff" }}
            disabled={ballsRef.current.length <= 1}
          >
            −
          </button>
          <span className="px-3 py-2 rounded-lg min-w-[80px] text-center"
            style={{ backgroundColor: "var(--input-bg)" }}>
            {ballCount} balls
          </span>
          <button
            onClick={handleAddBall}
            className="px-3 py-2 rounded-lg font-medium transition hover:opacity-90"
            style={{ backgroundColor: "var(--success)", color: "#fff" }}
          >
            +
          </button>
        </div>

        <div className="flex-1" />

        <div className="text-sm opacity-60">
          Gravity: {GRAVITY} | Friction: {FRICTION} | Bounce: {RESTITUTION}
        </div>
      </div>

      {/* Canvas Container */}
      <div
        ref={containerRef}
        className="rounded-xl p-4 border"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="rounded-lg mx-auto block"
          style={{ maxWidth: "100%" }}
        />
      </div>

      {/* Info Panel */}
      <div
        className="rounded-xl p-4 border"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        <h3 className="font-semibold mb-2">How it works</h3>
        <ul className="text-sm opacity-80 space-y-1 list-disc list-inside">
          <li>Balls are affected by gravity pulling them downward</li>
          <li>Balls bounce off walls with energy loss (restitution)</li>
          <li>Ball-to-ball collisions use conservation of momentum</li>
          <li>Larger balls have more mass and transfer more momentum</li>
          <li>Friction gradually slows down the balls over time</li>
        </ul>
      </div>
    </div>
  );
}

// Helper function to lighten a color
function lightenColor(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}
