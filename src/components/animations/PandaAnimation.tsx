"use client";

import { useState, useEffect } from "react";

// Pre-generated random values for bamboo stalks
const BAMBOO_DATA = [
  { height: 72, swayDuration: 2.3, delay: 0.1 },
  { height: 85, swayDuration: 2.7, delay: 0.3 },
  { height: 68, swayDuration: 2.1, delay: 0.2 },
  { height: 90, swayDuration: 2.5, delay: 0.4 },
  { height: 75, swayDuration: 2.8, delay: 0.1 },
  { height: 82, swayDuration: 2.2, delay: 0.35 },
  { height: 70, swayDuration: 2.6, delay: 0.15 },
  { height: 88, swayDuration: 2.4, delay: 0.25 },
  { height: 78, swayDuration: 2.9, delay: 0.05 },
  { height: 65, swayDuration: 2.3, delay: 0.45 },
  { height: 80, swayDuration: 2.1, delay: 0.2 },
  { height: 73, swayDuration: 2.7, delay: 0.3 },
];

// Pre-generated random values for floating leaves
const LEAF_DATA = [
  { top: 15, left: 10, duration: 3.5, delay: 0.3 },
  { top: 25, left: 30, duration: 4.2, delay: 1.1 },
  { top: 10, left: 55, duration: 3.8, delay: 0.7 },
  { top: 35, left: 75, duration: 4.5, delay: 1.5 },
  { top: 20, left: 90, duration: 3.2, delay: 0.5 },
  { top: 40, left: 20, duration: 4.0, delay: 1.8 },
  { top: 5, left: 45, duration: 3.6, delay: 0.9 },
  { top: 30, left: 65, duration: 4.3, delay: 1.3 },
];

export function PandaAnimation({ onComplete }: { onComplete: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after animation plays
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 3500);

    // Complete and remove animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "#e8f5e9" }}
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Bamboo forest background */}
        <div className="absolute inset-0 flex justify-around items-end">
          {BAMBOO_DATA.map((bamboo, i) => (
            <div
              key={i}
              className="bamboo-stalk"
              style={{
                width: "20px",
                height: `${bamboo.height}%`,
                backgroundColor: "#4a7c59",
                borderRadius: "10px",
                position: "relative",
                animation: `sway ${bamboo.swayDuration}s ease-in-out infinite`,
                animationDelay: `${bamboo.delay}s`,
              }}
            >
              {/* Bamboo nodes */}
              {[0, 1, 2, 3, 4].map((j) => (
                <div
                  key={j}
                  style={{
                    position: "absolute",
                    left: "-3px",
                    right: "-3px",
                    height: "6px",
                    backgroundColor: "#3d6b4a",
                    borderRadius: "3px",
                    top: `${20 + j * 18}%`,
                  }}
                />
              ))}
              {/* Bamboo leaves */}
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "-15px",
                  width: "50px",
                  height: "25px",
                }}
              >
                {[0, 1, 2].map((k) => (
                  <div
                    key={k}
                    style={{
                      position: "absolute",
                      width: "30px",
                      height: "8px",
                      backgroundColor: "#6b9b5e",
                      borderRadius: "50%",
                      transform: `rotate(${-30 + k * 30}deg)`,
                      transformOrigin: "left center",
                      left: "10px",
                      top: `${k * 5}px`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Panda container */}
        <div
          className="absolute bottom-[15%] left-1/2 -translate-x-1/2"
          style={{ animation: "pandaBounce 1s ease-in-out infinite" }}
        >
          {/* Panda body */}
          <div className="relative">
            {/* Body */}
            <div
              style={{
                width: "120px",
                height: "100px",
                backgroundColor: "#ffffff",
                borderRadius: "60px 60px 50px 50px",
                position: "relative",
                boxShadow: "inset -10px -10px 20px rgba(0,0,0,0.1)",
              }}
            />

            {/* Head */}
            <div
              style={{
                position: "absolute",
                top: "-60px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100px",
                height: "90px",
                backgroundColor: "#ffffff",
                borderRadius: "50%",
                boxShadow: "inset -5px -5px 15px rgba(0,0,0,0.1)",
              }}
            >
              {/* Left ear */}
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "5px",
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#1a1a1a",
                  borderRadius: "50%",
                }}
              />
              {/* Right ear */}
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "5px",
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#1a1a1a",
                  borderRadius: "50%",
                }}
              />

              {/* Left eye patch */}
              <div
                style={{
                  position: "absolute",
                  top: "25px",
                  left: "15px",
                  width: "28px",
                  height: "22px",
                  backgroundColor: "#1a1a1a",
                  borderRadius: "50%",
                  transform: "rotate(-10deg)",
                }}
              >
                {/* Eye */}
                <div
                  style={{
                    position: "absolute",
                    top: "6px",
                    left: "8px",
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#ffffff",
                    borderRadius: "50%",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: "3px",
                      width: "6px",
                      height: "6px",
                      backgroundColor: "#1a1a1a",
                      borderRadius: "50%",
                      animation: "blink 3s infinite",
                    }}
                  />
                </div>
              </div>

              {/* Right eye patch */}
              <div
                style={{
                  position: "absolute",
                  top: "25px",
                  right: "15px",
                  width: "28px",
                  height: "22px",
                  backgroundColor: "#1a1a1a",
                  borderRadius: "50%",
                  transform: "rotate(10deg)",
                }}
              >
                {/* Eye */}
                <div
                  style={{
                    position: "absolute",
                    top: "6px",
                    right: "8px",
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#ffffff",
                    borderRadius: "50%",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: "3px",
                      width: "6px",
                      height: "6px",
                      backgroundColor: "#1a1a1a",
                      borderRadius: "50%",
                      animation: "blink 3s infinite",
                    }}
                  />
                </div>
              </div>

              {/* Nose */}
              <div
                style={{
                  position: "absolute",
                  top: "50px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "16px",
                  height: "10px",
                  backgroundColor: "#1a1a1a",
                  borderRadius: "50%",
                }}
              />

              {/* Mouth */}
              <div
                style={{
                  position: "absolute",
                  top: "58px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "20px",
                  height: "10px",
                  borderBottom: "3px solid #1a1a1a",
                  borderRadius: "0 0 50% 50%",
                }}
              />

              {/* Blush left */}
              <div
                style={{
                  position: "absolute",
                  top: "45px",
                  left: "5px",
                  width: "15px",
                  height: "8px",
                  backgroundColor: "#ffb6c1",
                  borderRadius: "50%",
                  opacity: 0.6,
                }}
              />

              {/* Blush right */}
              <div
                style={{
                  position: "absolute",
                  top: "45px",
                  right: "5px",
                  width: "15px",
                  height: "8px",
                  backgroundColor: "#ffb6c1",
                  borderRadius: "50%",
                  opacity: 0.6,
                }}
              />
            </div>

            {/* Left arm */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "-25px",
                width: "35px",
                height: "50px",
                backgroundColor: "#1a1a1a",
                borderRadius: "20px",
                transform: "rotate(20deg)",
                animation: "waveArm 0.5s ease-in-out infinite alternate",
              }}
            />

            {/* Right arm holding bamboo */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "-25px",
                width: "35px",
                height: "50px",
                backgroundColor: "#1a1a1a",
                borderRadius: "20px",
                transform: "rotate(-20deg)",
              }}
            >
              {/* Bamboo being held */}
              <div
                style={{
                  position: "absolute",
                  top: "-30px",
                  left: "50%",
                  transform: "translateX(-50%) rotate(-15deg)",
                  width: "8px",
                  height: "80px",
                  backgroundColor: "#5d8a4a",
                  borderRadius: "4px",
                }}
              >
                {/* Leaves on held bamboo */}
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "-8px",
                    width: "20px",
                    height: "6px",
                    backgroundColor: "#6b9b5e",
                    borderRadius: "50%",
                    transform: "rotate(-30deg)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "-8px",
                    width: "20px",
                    height: "6px",
                    backgroundColor: "#6b9b5e",
                    borderRadius: "50%",
                    transform: "rotate(30deg)",
                  }}
                />
              </div>
            </div>

            {/* Left leg */}
            <div
              style={{
                position: "absolute",
                bottom: "-20px",
                left: "15px",
                width: "30px",
                height: "25px",
                backgroundColor: "#1a1a1a",
                borderRadius: "15px",
              }}
            />

            {/* Right leg */}
            <div
              style={{
                position: "absolute",
                bottom: "-20px",
                right: "15px",
                width: "30px",
                height: "25px",
                backgroundColor: "#1a1a1a",
                borderRadius: "15px",
              }}
            />
          </div>
        </div>

        {/* Welcome text */}
        <div
          className="absolute top-[15%] left-1/2 -translate-x-1/2 text-center"
          style={{ animation: "fadeInUp 0.8s ease-out" }}
        >
          <h1
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ color: "#2d5a3d" }}
          >
            Welcome! 🐼
          </h1>
          <p className="text-lg md:text-xl" style={{ color: "#4a7c59" }}>
            Loading your dashboard...
          </p>
        </div>

        {/* Floating bamboo leaves */}
        {LEAF_DATA.map((leaf, i) => (
          <div
            key={`leaf-${i}`}
            style={{
              position: "absolute",
              top: `${leaf.top}%`,
              left: `${leaf.left}%`,
              width: "25px",
              height: "8px",
              backgroundColor: "#6b9b5e",
              borderRadius: "50%",
              opacity: 0.7,
              animation: `floatLeaf ${leaf.duration}s ease-in-out infinite`,
              animationDelay: `${leaf.delay}s`,
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes sway {
          0%,
          100% {
            transform: rotate(-2deg);
          }
          50% {
            transform: rotate(2deg);
          }
        }

        @keyframes pandaBounce {
          0%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-15px);
          }
        }

        @keyframes waveArm {
          0% {
            transform: rotate(15deg);
          }
          100% {
            transform: rotate(25deg);
          }
        }

        @keyframes blink {
          0%,
          90%,
          100% {
            transform: scaleY(1);
          }
          95% {
            transform: scaleY(0.1);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes floatLeaf {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
}
