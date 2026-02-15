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
  color: string;
  mass: number;
}

const GRAVITY = 0.5;
const FRICTION = 0.99;
const RESTITUTION = 0.8; // Bounciness factor

const COLORS = [
  "#3B82F6", // Blue
  "#EF4444", // Red
  "#10B981", // Green
  "#F59E0B", // Amber
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#F97316", // Orange
];

function getRandomColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function createBall(id: number, canvasWidth: number, canvasHeight: number): Ball {
  const radius = 15 + Math.random() * 25;
  return {
    id,
    x: radius + Math.random() * (canvasWidth - 2 * radius),
    y: radius + Math.random() * (canvasHeight / 2),
    vx: (Math.random() - 0.5) * 10,
    vy: (Math.random() - 0.5) * 5,
    radius,
    color: getRandomColor(),
    mass: radius * radius, // Mass proportional to area
  };
}

function checkBallCollision(ball1: Ball, ball2: Ball): boolean {
  const dx = ball2.x - ball1.x;
  const dy = ball2.y - ball1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < ball1.radius + ball2.radius;
}

function resolveBallCollision(ball1: Ball, ball2: Ball): void {
  const dx = ball2.x - ball1.x;
  const dy = ball2.y - ball1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance === 0) return;

  // Normal vector
  const nx = dx / distance;
  const ny = dy / distance;

  // Relative velocity
  const dvx = ball1.vx - ball2.vx;
  const dvy = ball1.vy - ball2.vy;

  // Relative velocity along normal
  const dvn = dvx * nx + dvy * ny;

  // Don't resolve if velocities are separating
  if (dvn > 0) return;

  // Calculate impulse
  const impulse = (-(1 + RESTITUTION) * dvn) / (1 / ball1.mass + 1 / ball2.mass);

  // Apply impulse
  ball1.vx += (impulse * nx) / ball1.mass;
  ball1.vy += (impulse * ny) / ball1.mass;
  ball2.vx -= (impulse * nx) / ball2.mass;
  ball2.vy -= (impulse * ny) / ball2.mass;

  // Separate overlapping balls
  const overlap = (ball1.radius + ball2.radius - distance) / 2;
  ball1.x -= overlap * nx;
  ball1.y -= overlap * ny;
  ball2.x += overlap * nx;
  ball2.y += overlap * ny;
}

export default function SimulationPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const animationRef = useRef<number>(0);
  const [ballCount, setBallCount] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const [gravityEnabled, setGravityEnabled] = useState(true);

  const initializeBalls = useCallback((count: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ballsRef.current = [];
    for (let i = 0; i < count; i++) {
      ballsRef.current.push(createBall(i, canvas.width, canvas.height));
    }
  }, []);

  const updateBalls = useCallback((canvas: HTMLCanvasElement) => {
    const balls = ballsRef.current;

    for (const ball of balls) {
      // Apply gravity
      if (gravityEnabled) {
        ball.vy += GRAVITY;
      }

      // Apply friction
      ball.vx *= FRICTION;
      ball.vy *= FRICTION;

      // Update position
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Bounce off walls
      if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
        ball.vx *= -RESTITUTION;
      } else if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius;
        ball.vx *= -RESTITUTION;
      }

      if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
        ball.vy *= -RESTITUTION;
      } else if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.vy *= -RESTITUTION;
      }
    }

    // Check ball-to-ball collisions
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        if (checkBallCollision(balls[i], balls[j])) {
          resolveBallCollision(balls[i], balls[j]);
        }
      }
    }
  }, [gravityEnabled]);

  const drawBalls = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Clear canvas
    ctx.fillStyle = "var(--card-bg)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "rgba(59, 130, 246, 0.1)");
    gradient.addColorStop(1, "rgba(139, 92, 246, 0.1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw balls
    for (const ball of ballsRef.current) {
      // Ball shadow
      ctx.beginPath();
      ctx.arc(ball.x + 3, ball.y + 3, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fill();

      // Ball body
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      
      // Gradient fill for 3D effect
      const ballGradient = ctx.createRadialGradient(
        ball.x - ball.radius * 0.3,
        ball.y - ball.radius * 0.3,
        ball.radius * 0.1,
        ball.x,
        ball.y,
        ball.radius
      );
      ballGradient.addColorStop(0, lightenColor(ball.color, 40));
      ballGradient.addColorStop(0.5, ball.color);
      ballGradient.addColorStop(1, darkenColor(ball.color, 30));
      
      ctx.fillStyle = ballGradient;
      ctx.fill();

      // Highlight
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
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!isPaused) {
      updateBalls(canvas);
    }
    drawBalls(ctx, canvas);

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, updateBalls, drawBalls]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = Math.min(500, window.innerHeight - 300);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    initializeBalls(ballCount);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [ballCount, animate, initializeBalls]);

  const handleReset = () => {
    initializeBalls(ballCount);
  };

  const handleAddBall = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const newBall = createBall(ballsRef.current.length, canvas.width, canvas.height);
    ballsRef.current.push(newBall);
    setBallCount(ballsRef.current.length);
  };

  const handleBallCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10);
    if (count >= 1 && count <= 50) {
      setBallCount(count);
      initializeBalls(count);
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
        <h1 className="text-2xl font-bold mb-2">2D Ball Simulation</h1>
        <p className="opacity-70">
          Watch balls bounce off each other and walls with realistic physics including gravity and collision detection.
        </p>
      </div>

      {/* Controls */}
      <div
        className="rounded-xl p-4 border flex flex-wrap gap-4 items-center"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Balls:</label>
          <input
            type="number"
            min="1"
            max="50"
            value={ballCount}
            onChange={handleBallCountChange}
            className="w-16 px-2 py-1 rounded border text-center"
            style={{
              backgroundColor: "var(--input-bg)",
              borderColor: "var(--border)",
            }}
          />
        </div>

        <button
          onClick={handleAddBall}
          className="px-4 py-2 rounded-lg font-medium transition hover:opacity-90"
          style={{ backgroundColor: "var(--primary)", color: "#fff" }}
        >
          + Add Ball
        </button>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="px-4 py-2 rounded-lg font-medium transition hover:opacity-90"
          style={{
            backgroundColor: isPaused ? "var(--success)" : "var(--warning)",
            color: "#fff",
          }}
        >
          {isPaused ? "▶ Play" : "⏸ Pause"}
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-lg font-medium transition hover:opacity-90"
          style={{ backgroundColor: "var(--danger)", color: "#fff" }}
        >
          🔄 Reset
        </button>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={gravityEnabled}
            onChange={(e) => setGravityEnabled(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">Gravity</span>
        </label>
      </div>

      {/* Canvas */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: "var(--card-border)" }}
      >
        <canvas
          ref={canvasRef}
          className="w-full cursor-pointer"
          style={{ display: "block", backgroundColor: "#1a1a2e" }}
        />
      </div>

      {/* Info */}
      <div
        className="rounded-xl p-4 border"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <h2 className="font-semibold mb-2">Physics Features</h2>
        <ul className="text-sm opacity-80 space-y-1">
          <li>• <strong>Gravity:</strong> Balls are pulled downward continuously</li>
          <li>• <strong>Ball Collisions:</strong> Elastic collisions with momentum conservation</li>
          <li>• <strong>Wall Bouncing:</strong> Balls bounce off all four walls</li>
          <li>• <strong>Mass-based Physics:</strong> Larger balls have more momentum</li>
          <li>• <strong>Energy Loss:</strong> Each bounce loses some energy (restitution)</li>
        </ul>
      </div>
    </div>
  );
}

// Helper functions to lighten/darken colors
function lightenColor(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}

function darkenColor(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, (num >> 16) - amt);
  const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
  const B = Math.max(0, (num & 0x0000ff) - amt);
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}
