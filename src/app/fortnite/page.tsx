"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Tabs } from "@/components/ui/Tabs";
import { DataTable } from "@/components/dashboard/DataTable";

const weapons = [
  { id: 1, name: "Assault Rifle", rarity: "Rare", damage: 33, dps: 181, type: "AR" },
  { id: 2, name: "Pump Shotgun", rarity: "Epic", damage: 100, dps: 70, type: "Shotgun" },
  { id: 3, name: "Bolt-Action Sniper", rarity: "Legendary", damage: 132, dps: 34, type: "Sniper" },
  { id: 4, name: "SMG", rarity: "Common", damage: 17, dps: 204, type: "SMG" },
  { id: 5, name: "Rocket Launcher", rarity: "Legendary", damage: 121, dps: 45, type: "Explosive" },
];

const battlePassItems = [
  { tier: 1, reward: "Loading Screen", type: "Cosmetic" },
  { tier: 10, reward: "Pickaxe", type: "Harvesting Tool" },
  { tier: 25, reward: "Glider", type: "Glider" },
  { tier: 50, reward: "Emote", type: "Dance" },
  { tier: 100, reward: "Secret Skin", type: "Outfit" },
];

export default function FortnitePage() {
  const [selectedMode, setSelectedMode] = useState("Battle Royale");

  const modes = ["Battle Royale", "Zero Build", "Creative", "Save the World"];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Fortnite" }]} />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">🎮 Fortnite Hub</h1>
          <p className="opacity-70">Where we droppin&apos;?</p>
        </div>
        <button
          className="px-4 py-2 rounded-lg font-medium text-white animate-pulse"
          style={{ backgroundColor: "#9d4edd" }}
        >
          🚌 Drop In!
        </button>
      </div>

      {/* Game Modes */}
      <div className="flex gap-2 flex-wrap">
        {modes.map((mode) => (
          <button
            key={mode}
            onClick={() => setSelectedMode(mode)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedMode === mode ? "text-white scale-105" : "opacity-70 hover:opacity-100"
            }`}
            style={{
              backgroundColor: selectedMode === mode ? "#9d4edd" : "var(--input-bg)",
            }}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Victory Royales"
          value={42}
          change="+5 this week"
          changeType="positive"
          icon="🏆"
        />
        <StatCard
          title="Total Eliminations"
          value={1337}
          change="K/D: 2.4"
          changeType="positive"
          icon="💀"
        />
        <StatCard
          title="Battle Pass Level"
          value={87}
          change="13 tiers to go!"
          changeType="neutral"
          icon="⭐"
        />
        <StatCard
          title="V-Bucks"
          value={2800}
          change="Enough for next pass"
          changeType="positive"
          icon="💰"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Battle Pass Progress */}
        <div
          className="lg:col-span-2 rounded-xl p-6 border"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
        >
          <h2 className="font-semibold mb-4">⭐ Battle Pass Progress</h2>
          <ProgressBar value={87} label="Season Progress" />
          <div className="mt-4 space-y-3">
            {battlePassItems.map((item) => (
              <div
                key={item.tier}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ backgroundColor: "var(--input-bg)" }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg" style={{ color: "#9d4edd" }}>
                    Tier {item.tier}
                  </span>
                  <span>{item.reward}</span>
                </div>
                <Badge variant={item.tier <= 87 ? "success" : "warning"}>
                  {item.tier <= 87 ? "Unlocked" : "Locked"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Quick Stats */}
        <div
          className="rounded-xl p-6 border"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
        >
          <h2 className="font-semibold mb-4">🎯 Current {selectedMode} Stats</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm opacity-70">Win Rate</p>
              <ProgressBar value={15} label="" />
              <p className="text-right text-sm mt-1">15%</p>
            </div>
            <div>
              <p className="text-sm opacity-70">Top 10 Rate</p>
              <ProgressBar value={45} label="" />
              <p className="text-right text-sm mt-1">45%</p>
            </div>
            <div>
              <p className="text-sm opacity-70">Accuracy</p>
              <ProgressBar value={28} label="" />
              <p className="text-right text-sm mt-1">28%</p>
            </div>
          </div>

          <h2 className="font-semibold mb-4 mt-6">🗺️ Hot Drop Locations</h2>
          <div className="space-y-2">
            {["Tilted Towers", "Pleasant Park", "Retail Row", "Lazy Lake"].map((location) => (
              <div
                key={location}
                className="px-4 py-3 rounded-lg hover:opacity-90 transition cursor-pointer"
                style={{ backgroundColor: "var(--input-bg)" }}
              >
                📍 {location}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weapons Table */}
      <div
        className="rounded-xl p-6 border"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <Tabs
          tabs={[
            {
              id: "weapons",
              label: "🔫 Weapons",
              content: (
                <DataTable
                  columns={[
                    { key: "name", header: "Weapon" },
                    {
                      key: "rarity",
                      header: "Rarity",
                      render: (row) => (
                        <Badge
                          variant={
                            row.rarity === "Legendary"
                              ? "warning"
                              : row.rarity === "Epic"
                                ? "info"
                                : row.rarity === "Rare"
                                  ? "success"
                                  : "default"
                          }
                        >
                          {String(row.rarity)}
                        </Badge>
                      ),
                    },
                    { key: "damage", header: "Damage" },
                    { key: "dps", header: "DPS" },
                    { key: "type", header: "Type" },
                  ]}
                  data={weapons}
                  pageSize={5}
                />
              ),
            },
            {
              id: "loadout",
              label: "🎒 My Loadout",
              content: (
                <div className="grid grid-cols-5 gap-4 py-4">
                  {["AR", "Shotgun", "SMG", "Meds", "Shields"].map((slot, i) => (
                    <div
                      key={slot}
                      className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center"
                      style={{ borderColor: "var(--card-border)" }}
                    >
                      <span className="text-2xl mb-1">
                        {["🔫", "💥", "⚡", "💊", "🛡️"][i]}
                      </span>
                      <span className="text-xs opacity-70">{slot}</span>
                    </div>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* Fun Footer */}
      <div
        className="rounded-xl p-6 border text-center"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <p className="text-xl mb-2">🕺 Remember: It&apos;s not about winning...</p>
        <p className="opacity-70">...it&apos;s about looking cool while doing it! 💃</p>
      </div>
    </div>
  );
}
