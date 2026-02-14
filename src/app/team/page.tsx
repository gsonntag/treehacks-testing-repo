import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

const members = [
  { name: "Jane Doe", role: "Admin", avatar: "JD", status: "Online" },
  { name: "John Smith", role: "Developer", avatar: "JS", status: "Away" },
  { name: "Alex Chen", role: "Designer", avatar: "AC", status: "Online" },
  { name: "Sam Wilson", role: "PM", avatar: "SW", status: "Offline" },
];

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Team" }]} />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team</h1>
        <button
          className="px-4 py-2 rounded-lg font-medium text-white"
          style={{ backgroundColor: "var(--primary)" }}
        >
          Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((m) => (
          <div
            key={m.name}
            className="rounded-xl p-4 border flex items-center gap-4"
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
              style={{ backgroundColor: "var(--primary)" }}
            >
              {m.avatar}
            </div>
            <div className="flex-1">
              <p className="font-medium">{m.name}</p>
              <p className="text-sm opacity-70">{m.role}</p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                m.status === "Online"
                  ? "bg-green-500/20 text-green-400"
                  : m.status === "Away"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-gray-500/20 opacity-70"
              }`}
            >
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
