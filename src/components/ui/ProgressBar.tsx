interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
}

export function ProgressBar({ value, max = 100, label }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div>
      {label && (
        <div className="flex justify-between text-sm mb-1">
          <span>{label}</span>
          <span className="opacity-70">{Math.round(pct)}%</span>
        </div>
      )}
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--input-bg)" }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            backgroundColor: "var(--primary)",
          }}
        />
      </div>
    </div>
  );
}
