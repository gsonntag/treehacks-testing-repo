import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Reports" }]} />
      <h1 className="text-2xl font-bold">Reports</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="rounded-xl p-6 border"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
        >
          <h2 className="font-semibold mb-4">Weekly Summary</h2>
          <ChartPlaceholder />
        </div>
        <div
          className="rounded-xl p-6 border"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
        >
          <h2 className="font-semibold mb-4">Monthly Trends</h2>
          <ChartPlaceholder />
        </div>
      </div>

      <div
        className="rounded-xl p-6 border"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <h2 className="font-semibold mb-4">Export Options</h2>
        <div className="flex flex-wrap gap-3">
          <button
            className="px-4 py-2 rounded-lg border"
            style={{ borderColor: "var(--border)" }}
          >
            Export as PDF
          </button>
          <button
            className="px-4 py-2 rounded-lg border"
            style={{ borderColor: "var(--border)" }}
          >
            Export as CSV
          </button>
          <button
            className="px-4 py-2 rounded-lg border"
            style={{ borderColor: "var(--border)" }}
          >
            Schedule Report
          </button>
        </div>
      </div>
    </div>
  );
}
