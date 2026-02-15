"use client";

import { useRef, useEffect, useState, useCallback } from "react";
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
const DAMPING = 0.99;
const BOUNCE_DAMPING = 0.8;

function getRandomColor(): string {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E9",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createBall(id: number, canvasWidth: number, canvasHeight: number): Ball {
  const radius = 15 + Math.random() * 25;
  return {
    id,
    x: radius + Math.random() * (canvasWidth - 2 * radius),
    y: radius + Math.random() * (canvasHeight / 2 - radius),
    vx: (Math.random() - 0.5) * 8,
    vy: (Math.random() - 0.5) * 4,
    radius,
    mass: radius * radius,
    color: getRandomColor(),
  };
}

function checkCollision(ball1: Ball, ball2: Ball): boolean {
  const dx = ball2.x - ball1.x;
  const dy = ball2.y - ball1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < ball1.radius + ball2.radius;
}

function resolveCollision(ball1: Ball, ball2: Ball): void {
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

  // Relative velocity along the normal
  const dvn = dvx * nx + dvy * ny;

  // Don't resolve if velocities are separating
  if (dvn > 0) return;

  // Coefficient of restitution
  const restitution = BOUNCE_DAMPING;

  // Impulse scalar
  const impulse = (-(1 + restitution) * dvn) / (1 / ball1.mass + 1 / ball2.mass);

  // Apply impulse to velocities
  ball1.vx += (impulse * nx) / ball1.mass;
  ball1.vy += (impulse * ny) / ball1.mass;
  ball2.vx -= (impulse * nx) / ball2.mass;
  ball2.vy -= (impulse * ny) / ball2.mass;

  // Separate balls to prevent overlap
  const overlap = ball1.radius + ball2.radius - distance;
  const separationX = (overlap * nx) / 2;
  const separationY = (overlap * ny) / 2;

  ball1.x -= separationX;
  ball1.y -= separationY;
  ball2.x += separationX;
  ball2.y += separationY;
}

export default function SimulationPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const animationIdRef = useRef<number>(0);
  const [ballCount, setBallCount] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const [gravity, setGravity] = useState(GRAVITY);

  const initializeBalls = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ballsRef.current = [];
    for (let i = 0; i < ballCount; i++) {
      ballsRef.current.push(createBall(i, canvas.width, canvas.height));
    }
  }, [ballCount]);

  const updateBalls = useCallback(
    (canvasWidth: number, canvasHeight: number) => {
      const balls = ballsRef.current;

      balls.forEach((ball) => {
        // Apply gravity
        ball.vy += gravity;

        // Apply damping (air resistance)
        ball.vx *= DAMPING;
        ball.vy *= DAMPING;

        // Update position
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Wall collision - left
        if (ball.x - ball.radius < 0) {
          ball.x = ball.radius;
          ball.vx *= -BOUNCE_DAMPING;
        }

        // Wall collision - right
        if (ball.x + ball.radius > canvasWidth) {
          ball.x = canvasWidth - ball.radius;
          ball.vx *= -BOUNCE_DAMPING;
        }

        // Wall collision - top
        if (ball.y - ball.radius < 0) {
          ball.y = ball.radius;
          ball.vy *= -BOUNCE_DAMPING;
        }

        // Wall collision - bottom
        if (ball.y + ball.radius > canvasHeight) {
          ball.y = canvasHeight - ball.radius;
          ball.vy *= -BOUNCE_DAMPING;
        }
      });

      // Ball-to-ball collisions
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          if (checkCollision(balls[i], balls[j])) {
            resolveCollision(balls[i], balls[j]);
          }
        }
      }
    },
    [gravity]
  );

  const drawBalls = useCallback((ctx: CanvasRenderingContext2D) => {
    const balls = ballsRef.current;

    balls.forEach((ball) => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.closePath();

      // Draw highlight for 3D effect
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
      ctx.closePath();

      // Draw shadow
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
    });
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.fillStyle = "var(--card-bg)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(1, "#16213e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw balls
    updateBalls(canvas.width, canvas.height);
    drawBalls(ctx);

    animationIdRef.current = requestAnimationFrame(animate);
  }, [updateBalls, drawBalls]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = Math.min(500, window.innerHeight - 300);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    initializeBalls();
  }, [initializeBalls]);

  useEffect(() => {
    if (!isPaused) {
      animate();
    }

    return () => {
      cancelAnimationFrame(animationIdRef.current);
    };
  }, [animate, isPaused]);

  const handleAddBall = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newBall = createBall(
      ballsRef.current.length,
      canvas.width,
      canvas.height
    );
    ballsRef.current.push(newBall);
    setBallCount((prev) => prev + 1);
  };

  const handleReset = () => {
    setBallCount(5);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newBall: Ball = {
      id: ballsRef.current.length,
      x,
      y,
      vx: (Math.random() - 0.5) * 10,
      vy: -5,
      radius: 15 + Math.random() * 25,
      mass: 0,
      color: getRandomColor(),
    };
    newBall.mass = newBall.radius * newBall.radius;
    ballsRef.current.push(newBall);
    setBallCount((prev) => prev + 1);
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
        <h1 className="text-2xl font-bold mb-2">Bouncing Ball Simulation</h1>
        <p className="opacity-70">
          Interactive 2D physics simulation with gravity and collisions. Click
          on the canvas to add new balls!
        </p>
      </div>

      <div
        className="rounded-xl p-6 border"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-4 py-2 rounded-lg font-medium transition hover:opacity-90"
            style={{ backgroundColor: "var(--primary)", color: "#fff" }}
          >
            {isPaused ? "▶ Resume" : "⏸ Pause"}
          </button>

          <button
            onClick={handleAddBall}
            className="px-4 py-2 rounded-lg font-medium transition hover:opacity-90"
            style={{ backgroundColor: "var(--input-bg)" }}
          >
            ➕ Add Ball
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg font-medium transition hover:opacity-90"
            style={{ backgroundColor: "var(--input-bg)" }}
          >
            🔄 Reset
          </button>

          <div className="flex items-center gap-2">
            <label className="text-sm opacity-70">Gravity:</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={gravity}
              onChange={(e) => setGravity(parseFloat(e.target.value))}
              className="w-24"
            />
            <span className="text-sm w-8">{gravity.toFixed(1)}</span>
          </div>

          <div className="text-sm opacity-70">Balls: {ballCount}</div>
        </div>

        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-full rounded-lg cursor-crosshair"
          style={{ border: "1px solid var(--border)" }}
        />

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: "var(--input-bg)" }}
          >
            <span className="font-medium">🎯 Click to Add</span>
            <p className="opacity-70 mt-1">
              Click anywhere on the canvas to spawn a new ball at that position.
            </p>
          </div>
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: "var(--input-bg)" }}
          >
            <span className="font-medium">⚖️ Physics</span>
            <p className="opacity-70 mt-1">
              Balls have mass based on size. Larger balls have more momentum.
            </p>
          </div>
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: "var(--input-bg)" }}
          >
            <span className="font-medium">🔄 Collisions</span>
            <p className="opacity-70 mt-1">
              Elastic collisions with energy conservation between balls.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
