import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Settings" }]} />
      <h1 className="text-2xl font-bold">Settings</h1>

      <div
        className="rounded-xl p-6 border max-w-xl"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <h2 className="font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span>Email notifications</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span>Push notifications</span>
            <input type="checkbox" className="rounded" />
          </label>
        </div>
      </div>
    </div>
  );
}
