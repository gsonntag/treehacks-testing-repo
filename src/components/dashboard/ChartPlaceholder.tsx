"use client";

export function ChartPlaceholder() {
  const data = [40, 65, 45, 80, 55, 70, 60, 85, 75, 90];
  const max = Math.max(...data);

  return (
    <div className="h-48 flex items-end gap-1">
      {data.map((value, i) => (
        <div
          key={i}
          className="flex-1 rounded-t transition-all hover:opacity-80"
          style={{
            height: `${(value / max) * 100}%`,
            backgroundColor: "var(--primary)",
            minHeight: "8px",
          }}
        />
      ))}
    </div>
  );
}
