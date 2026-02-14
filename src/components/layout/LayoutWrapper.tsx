"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import { PandaAnimation } from "@/components/animations/PandaAnimation";

// Check if user has seen animation (only runs on client)
function getHasSeenAnimation() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("hasSeenPandaAnimation") === "true";
}

// Subscribe function for useSyncExternalStore (no-op since we only read once)
function subscribe() {
  return () => {};
}

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  // Use useSyncExternalStore to safely read from sessionStorage
  const hasSeenBefore = useSyncExternalStore(
    subscribe,
    getHasSeenAnimation,
    () => false // Server snapshot - always show animation on server
  );

  const [animationDismissed, setAnimationDismissed] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setAnimationDismissed(true);
    sessionStorage.setItem("hasSeenPandaAnimation", "true");
  }, []);

  const showAnimation = !hasSeenBefore && !animationDismissed;

  return (
    <>
      {showAnimation && <PandaAnimation onComplete={handleAnimationComplete} />}
      {children}
    </>
  );
}
