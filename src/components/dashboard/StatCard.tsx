interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: string;
}

export function StatCard({ title, value, change, changeType = "neutral", icon }: StatCardProps) {
  const changeColor =
    changeType === "positive"
      ? "var(--accent)"
      : changeType === "negative"
        ? "var(--danger)"
        : "var(--muted)";

  return (
    <div
      className="rounded-xl p-5 border transition hover:shadow-lg"
      style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm opacity-70 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {change && (
            <p className="text-sm mt-2" style={{ color: changeColor }}>
              {change}
            </p>
          )}
        </div>
        <span className="text-3xl opacity-80">{icon}</span>
      </div>
    </div>
  );
}
