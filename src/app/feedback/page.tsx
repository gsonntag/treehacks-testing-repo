"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Feedback" }]} />
      <h1 className="text-2xl font-bold">Feedback</h1>

      <div
        className="rounded-xl p-6 border max-w-xl"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <h2 className="font-semibold mb-4">How are we doing?</h2>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setRating(n)}
              className="w-10 h-10 rounded-lg text-lg transition"
              style={{
                backgroundColor: rating >= n ? "var(--primary)" : "var(--input-bg)",
                border: "1px solid var(--border)",
              }}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Tell us more..."
          rows={4}
          className="w-full px-4 py-2 rounded-lg border resize-none mb-4"
          style={{ backgroundColor: "var(--input-bg)", borderColor: "var(--border)" }}
        />
        <button
          className="px-4 py-2 rounded-lg font-medium text-white"
          style={{ backgroundColor: "var(--primary)" }}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}
