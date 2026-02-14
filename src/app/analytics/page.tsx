import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";
import { StatCard } from "@/components/dashboard/StatCard";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Analytics" }]} />
      <h1 className="text-2xl font-bold">Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Page Views" value="12.4k" change="+12%" changeType="positive" icon="👁️" />
        <StatCard title="Avg. Session" value="4m 32s" change="-2%" changeType="negative" icon="⏱️" />
        <StatCard title="Bounce Rate" value="42%" change="Stable" icon="📉" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="rounded-xl p-6 border"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
        >
          <h2 className="font-semibold mb-4">Traffic by Day</h2>
          <ChartPlaceholder />
        </div>
        <div
          className="rounded-xl p-6 border"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
        >
          <h2 className="font-semibold mb-4">Conversion Funnel</h2>
          <div className="space-y-3">
            {["Visitors", "Sign-ups", "Trials", "Paid"].map((label, i) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{label}</span>
                  <span className="opacity-70">{100 - i * 25}%</span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--input-bg)" }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${100 - i * 25}%`,
                      backgroundColor: "var(--primary)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
