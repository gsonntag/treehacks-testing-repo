"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DataTable } from "@/components/dashboard/DataTable";
import { Badge } from "@/components/ui/Badge";

const projects = [
  { name: "Web App Redesign", status: "In Progress", deadline: "2025-03-01", budget: "$12k" },
  { name: "Mobile SDK", status: "Review", deadline: "2025-02-28", budget: "$8k" },
  { name: "API Gateway", status: "Completed", deadline: "2025-02-15", budget: "$15k" },
  { name: "Auth System", status: "In Progress", deadline: "2025-03-15", budget: "$6k" },
  { name: "Dashboard v2", status: "Planning", deadline: "2025-04-01", budget: "$20k" },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Projects" }]} />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          className="px-4 py-2 rounded-lg font-medium text-white"
          style={{ backgroundColor: "var(--primary)" }}
        >
          + New Project
        </button>
      </div>

      <div
        className="rounded-xl p-6 border"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <DataTable
          columns={[
            { key: "name", header: "Project" },
            {
              key: "status",
              header: "Status",
              render: (row) => (
                <Badge
                  variant={
                    row.status === "Completed"
                      ? "success"
                      : row.status === "In Progress"
                        ? "info"
                        : "warning"
                  }
                >
                  {String(row.status)}
                </Badge>
              ),
            },
            { key: "deadline", header: "Deadline" },
            { key: "budget", header: "Budget" },
          ]}
          data={projects}
        />
      </div>
    </div>
  );
}
