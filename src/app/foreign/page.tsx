"use client";

import { useState, useEffect } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

const foreignCars = [
  { name: "Lamborghini Aventador", emoji: "🏎️", speed: "217 mph", origin: "Italy", color: "#f97316" },
  { name: "Ferrari 488", emoji: "🚗", speed: "205 mph", origin: "Italy", color: "#ef4444" },
  { name: "McLaren 720S", emoji: "🏎️", speed: "212 mph", origin: "UK", color: "#f59e0b" },
  { name: "Bugatti Chiron", emoji: "🚙", speed: "261 mph", origin: "France", color: "#3b82f6" },
  { name: "Porsche 911 GT3", emoji: "🏎️", speed: "198 mph", origin: "Germany", color: "#8b5cf6" },
  { name: "Aston Martin DB11", emoji: "🚗", speed: "200 mph", origin: "UK", color: "#22c55e" },
];

const vibeQuotes = [
  "Let her ride in a foreign with me 🔥",
  "Cruising through the city at night 🌃",
  "Living life in the fast lane 💨",
  "Foreign whip, no GPS needed 🗺️",
  "Speed is just a number... a big one 💯",
];

export default function ForeignPage() {
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [rideCount, setRideCount] = useState(0);
  const [isRiding, setIsRiding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % vibeQuotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const startRide = () => {
    if (selectedCar !== null) {
      setIsRiding(true);
      setRideCount((prev) => prev + 1);
      setTimeout(() => setIsRiding(false), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Foreign Rides", href: "/foreign" }]} />

      <div>
        <h1 className="text-3xl font-bold mb-2 animate-pulse" style={{ color: "var(--primary)" }}>
          🚗 Foreign Rides 🔥
        </h1>
        <p className="text-lg opacity-80 italic">{vibeQuotes[currentQuote]}</p>
      </div>

      {/* Animated Car Display */}
      <div
        className="relative overflow-hidden rounded-2xl p-8 border-2"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: selectedCar !== null ? foreignCars[selectedCar].color : "var(--card-border)",
          boxShadow: selectedCar !== null ? `0 0 30px ${foreignCars[selectedCar].color}40` : "none",
          transition: "all 0.5s ease",
        }}
      >
        {/* Road Animation */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <div
            className="absolute bottom-4 left-0 right-0 h-2 bg-gray-600"
            style={{ animation: isRiding ? "none" : "none" }}
          />
          <div
            className="flex gap-8"
            style={{
              animation: isRiding ? "roadMove 0.5s linear infinite" : "none",
            }}
          >
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-12 h-1 bg-yellow-400"
                style={{ marginLeft: i === 0 ? "0" : "0" }}
              />
            ))}
          </div>
        </div>

        {/* Car Display */}
        <div className="text-center mb-8">
          <div
            className="text-8xl mb-4 inline-block"
            style={{
              animation: isRiding ? "carBounce 0.2s ease-in-out infinite" : "carIdle 2s ease-in-out infinite",
              filter: selectedCar !== null ? `drop-shadow(0 0 20px ${foreignCars[selectedCar].color})` : "none",
            }}
          >
            {selectedCar !== null ? foreignCars[selectedCar].emoji : "🚘"}
          </div>
          {selectedCar !== null && (
            <div className="space-y-2">
              <h2 className="text-2xl font-bold" style={{ color: foreignCars[selectedCar].color }}>
                {foreignCars[selectedCar].name}
              </h2>
              <p className="opacity-70">
                Top Speed: <span className="font-mono font-bold">{foreignCars[selectedCar].speed}</span> | Origin:{" "}
                <span className="font-bold">{foreignCars[selectedCar].origin}</span>
              </p>
            </div>
          )}
          {selectedCar === null && (
            <p className="text-xl opacity-60">Select a foreign whip below 👇</p>
          )}
        </div>

        {/* Ride Button */}
        <div className="text-center">
          <button
            onClick={startRide}
            disabled={selectedCar === null || isRiding}
            className="px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: selectedCar !== null ? foreignCars[selectedCar].color : "var(--primary)",
              color: "#fff",
              boxShadow: selectedCar !== null && !isRiding ? `0 0 20px ${foreignCars[selectedCar].color}` : "none",
            }}
          >
            {isRiding ? "🔥 RIDING... 🔥" : "🚀 LET'S RIDE"}
          </button>
        </div>
      </div>

      {/* Car Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {foreignCars.map((car, index) => (
          <button
            key={car.name}
            onClick={() => setSelectedCar(index)}
            className="p-6 rounded-xl border-2 transition-all transform hover:scale-105 text-left"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: selectedCar === index ? car.color : "var(--card-border)",
              boxShadow: selectedCar === index ? `0 0 20px ${car.color}40` : "none",
            }}
          >
            <div className="flex items-center gap-4">
              <span
                className="text-4xl"
                style={{
                  filter: selectedCar === index ? `drop-shadow(0 0 10px ${car.color})` : "none",
                }}
              >
                {car.emoji}
              </span>
              <div>
                <h3 className="font-bold" style={{ color: selectedCar === index ? car.color : "var(--foreground)" }}>
                  {car.name}
                </h3>
                <p className="text-sm opacity-60">{car.origin} • {car.speed}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div
        className="rounded-xl p-6 border"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <h2 className="font-semibold mb-4">🏆 Your Stats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "var(--input-bg)" }}>
            <div className="text-3xl font-bold" style={{ color: "var(--primary)" }}>{rideCount}</div>
            <div className="text-sm opacity-60">Total Rides</div>
          </div>
          <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "var(--input-bg)" }}>
            <div className="text-3xl font-bold" style={{ color: "var(--accent)" }}>{foreignCars.length}</div>
            <div className="text-sm opacity-60">Cars Available</div>
          </div>
          <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "var(--input-bg)" }}>
            <div className="text-3xl font-bold" style={{ color: "var(--secondary)" }}>261</div>
            <div className="text-sm opacity-60">Max Speed (mph)</div>
          </div>
          <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "var(--input-bg)" }}>
            <div className="text-3xl font-bold" style={{ color: "var(--danger)" }}>∞</div>
            <div className="text-sm opacity-60">Vibe Level</div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes carIdle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes carBounce {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-3px) rotate(2deg); }
        }
        @keyframes roadMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-80px); }
        }
      `}</style>
    </div>
  );
}
