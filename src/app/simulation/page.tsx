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

const GRAVITY = 0.5;
const FRICTION = 0.99;
const BOUNCE_DAMPING = 0.8;
const COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4",
  "#3b82f6", "#8b5cf6", "#ec4899", "#f43f5e", "#14b8a6"
];

export default function SimulationPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const animationRef = useRef<number>(0);
  const [ballCount, setBallCount] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);

  const createBall = useCallback((id: number, canvasWidth: number, canvasHeight: number): Ball => {
    const radius = Math.random() * 20 + 15;
    return {
      id,
      x: Math.random() * (canvasWidth - radius * 2) + radius,
      y: Math.random() * (canvasHeight / 2) + radius,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 5,
      radius,
      mass: radius * radius,
      color: COLORS[id % COLORS.length],
    };
  }, []);

  const initializeBalls = useCallback((count: number, canvasWidth: number, canvasHeight: number) => {
    ballsRef.current = [];
    for (let i = 0; i < count; i++) {
      ballsRef.current.push(createBall(i, canvasWidth, canvasHeight));
    }
  }, [createBall]);

  const checkBallCollision = (ball1: Ball, ball2: Ball): boolean => {
    const dx = ball2.x - ball1.x;
    const dy = ball2.y - ball1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < ball1.radius + ball2.radius;
  };

  const resolveBallCollision = (ball1: Ball, ball2: Ball) => {
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

    // Relative velocity in collision normal direction
    const dvn = dvx * nx + dvy * ny;

    // Do not resolve if velocities are separating
    if (dvn > 0) return;

    // Calculate impulse scalar
    const restitution = BOUNCE_DAMPING;
    const impulse = (-(1 + restitution) * dvn) / (1 / ball1.mass + 1 / ball2.mass);

    // Apply impulse to velocities
    ball1.vx += (impulse / ball1.mass) * nx;
    ball1.vy += (impulse / ball1.mass) * ny;
    ball2.vx -= (impulse / ball2.mass) * nx;
    ball2.vy -= (impulse / ball2.mass) * ny;

    // Separate overlapping balls
    const overlap = ball1.radius + ball2.radius - distance;
    if (overlap > 0) {
      const separationX = (overlap / 2) * nx;
      const separationY = (overlap / 2) * ny;
      ball1.x -= separationX;
      ball1.y -= separationY;
      ball2.x += separationX;
      ball2.y += separationY;
    }
  };

  const updateBall = (ball: Ball, canvasWidth: number, canvasHeight: number) => {
    // Apply gravity
    ball.vy += GRAVITY;

    // Apply friction
    ball.vx *= FRICTION;
    ball.vy *= FRICTION;

    // Update position
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Wall collisions
    // Left wall
    if (ball.x - ball.radius < 0) {
      ball.x = ball.radius;
      ball.vx = -ball.vx * BOUNCE_DAMPING;
    }
    // Right wall
    if (ball.x + ball.radius > canvasWidth) {
      ball.x = canvasWidth - ball.radius;
      ball.vx = -ball.vx * BOUNCE_DAMPING;
    }
    // Top wall
    if (ball.y - ball.radius < 0) {
      ball.y = ball.radius;
      ball.vy = -ball.vy * BOUNCE_DAMPING;
    }
    // Bottom wall (floor)
    if (ball.y + ball.radius > canvasHeight) {
      ball.y = canvasHeight - ball.radius;
      ball.vy = -ball.vy * BOUNCE_DAMPING;
    }
  };

  const drawBall = (ctx: CanvasRenderingContext2D, ball: Ball) => {
    // Draw shadow
    ctx.beginPath();
    ctx.arc(ball.x + 3, ball.y + 3, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fill();

    // Draw ball with gradient
    const gradient = ctx.createRadialGradient(
      ball.x - ball.radius / 3,
      ball.y - ball.radius / 3,
      ball.radius / 10,
      ball.x,
      ball.y,
      ball.radius
    );
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(0.3, ball.color);
    gradient.addColorStop(1, ball.color);

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw outline
    ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    initializeBalls(ballCount, canvas.width, canvas.height);

    const animate = () => {
      if (!canvas || !ctx) return;

      // Clear canvas
      ctx.fillStyle = "var(--card-bg, #1a1a2e)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid pattern
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (!isPausedRef.current) {
        // Update physics
        const balls = ballsRef.current;

        // Update each ball
        for (const ball of balls) {
          updateBall(ball, canvas.width, canvas.height);
        }

        // Check ball-to-ball collisions
        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            if (checkBallCollision(balls[i], balls[j])) {
              resolveBallCollision(balls[i], balls[j]);
            }
          }
        }
      }

      // Draw all balls
      for (const ball of ballsRef.current) {
        drawBall(ctx, ball);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [ballCount, initializeBalls]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const handleReset = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      initializeBalls(ballCount, canvas.width, canvas.height);
    }
  };

  const handleBallCountChange = (newCount: number) => {
    setBallCount(newCount);
    const canvas = canvasRef.current;
    if (canvas) {
      initializeBalls(newCount, canvas.width, canvas.height);
    }
  };

  const handleAddBall = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const newBall = createBall(ballsRef.current.length, canvas.width, canvas.height);
      ballsRef.current.push(newBall);
      setBallCount(ballsRef.current.length);
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Ball Simulation" }]} />

      <div>
        <h1 className="text-2xl font-bold mb-2">2D Bouncing Ball Simulation</h1>
        <p className="opacity-70">
          Watch balls bounce off each other and the walls, affected by gravity and physics.
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
            type="range"
            min="1"
            max="20"
            value={ballCount}
            onChange={(e) => handleBallCountChange(parseInt(e.target.value))}
            className="w-24"
          />
          <span className="text-sm w-6">{ballCount}</span>
        </div>

        <button
          onClick={handleAddBall}
          className="px-4 py-2 rounded-lg font-medium transition hover:opacity-90"
          style={{ backgroundColor: "var(--primary)", color: "#fff" }}
        >
          ➕ Add Ball
        </button>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="px-4 py-2 rounded-lg font-medium transition hover:opacity-90"
          style={{ backgroundColor: isPaused ? "var(--success)" : "var(--warning)", color: "#fff" }}
        >
          {isPaused ? "▶️ Resume" : "⏸️ Pause"}
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-lg font-medium transition hover:opacity-90"
          style={{ backgroundColor: "var(--danger)", color: "#fff" }}
        >
          🔄 Reset
        </button>
      </div>

      {/* Simulation Canvas */}
      <div
        className="flex-1 rounded-xl border overflow-hidden min-h-[400px]"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Info Panel */}
      <div
        className="rounded-xl p-4 border"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <h3 className="font-semibold mb-2">Physics Info</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="opacity-60">Gravity:</span> {GRAVITY}
          </div>
          <div>
            <span className="opacity-60">Friction:</span> {FRICTION}
          </div>
          <div>
            <span className="opacity-60">Bounce Damping:</span> {BOUNCE_DAMPING}
          </div>
          <div>
            <span className="opacity-60">Active Balls:</span> {ballCount}
          </div>
        </div>
      </div>
    </div>
  );
}
