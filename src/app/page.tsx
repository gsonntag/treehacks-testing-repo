"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartPlaceholder } from "@/components/dashboard/ChartPlaceholder";
import { DataTable } from "@/components/dashboard/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { Modal } from "@/components/ui/Modal";
import { Accordion } from "@/components/ui/Accordion";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { FormDemo } from "@/components/forms/FormDemo";

const tableData = [
  { id: 1, project: "Alpha", status: "Active", progress: 85, owner: "Jane" },
  { id: 2, project: "Beta", status: "Pending", progress: 40, owner: "John" },
  { id: 3, project: "Gamma", status: "Completed", progress: 100, owner: "Jane" },
  { id: 4, project: "Delta", status: "Active", progress: 60, owner: "Alex" },
  { id: 5, project: "Epsilon", status: "Blocked", progress: 20, owner: "Sam" },
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }]} />

      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="opacity-70">Welcome back! Here&apos;s your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Projects"
          value={24}
          change="+3 from last week"
          changeType="positive"
          icon="📁"
        />
        <StatCard
          title="Team Members"
          value={12}
          change="+1 new"
          changeType="positive"
          icon="👥"
        />
        <StatCard
          title="Deployments"
          value={156}
          change="-5% from last month"
          changeType="negative"
          icon="🚀"
        />
        <StatCard
          title="Uptime"
          value="99.9%"
          change="Stable"
          changeType="neutral"
          icon="✅"
        />
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className="lg:col-span-2 rounded-xl p-6 border"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
        >
          <h2 className="font-semibold mb-4">Activity Overview</h2>
          <ChartPlaceholder />
          <div className="flex justify-between mt-2 text-xs opacity-60">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
        <div
          className="rounded-xl p-6 border"
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
        >
          <h2 className="font-semibold mb-4">Storage Usage</h2>
          <div className="space-y-3 mb-6">
            <ProgressBar value={72} label="Used" />
            <ProgressBar value={28} label="Available" />
          </div>
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full text-left px-4 py-3 rounded-lg hover:opacity-90 transition"
              style={{ backgroundColor: "var(--input-bg)" }}
            >
              ➕ New Project
            </button>
            <button
              className="w-full text-left px-4 py-3 rounded-lg hover:opacity-90 transition"
              style={{ backgroundColor: "var(--input-bg)" }}
            >
              📤 Export Report
            </button>
            <button
              className="w-full text-left px-4 py-3 rounded-lg hover:opacity-90 transition"
              style={{ backgroundColor: "var(--input-bg)" }}
            >
              ⚙️ Settings
            </button>
          </div>
        </div>
      </div>

      {/* Tabs with Table and Accordion */}
      <div
        className="rounded-xl p-6 border"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <Tabs
          tabs={[
            {
              id: "projects",
              label: "Projects",
              content: (
                <DataTable
                  columns={[
                    { key: "project", header: "Project" },
                    {
                      key: "status",
                      header: "Status",
                      render: (row) => (
                        <Badge
                          variant={
                            row.status === "Active"
                              ? "success"
                              : row.status === "Blocked"
                                ? "danger"
                                : row.status === "Completed"
                                  ? "info"
                                  : "warning"
                          }
                        >
                          {String(row.status)}
                        </Badge>
                      ),
                    },
                    {
                      key: "progress",
                      header: "Progress",
                      render: (row) => `${row.progress}%`,
                    },
                    { key: "owner", header: "Owner" },
                  ]}
                  data={tableData}
                  pageSize={3}
                />
              ),
            },
            {
              id: "faq",
              label: "FAQ",
              content: (
                <Accordion
                  items={[
                    {
                      id: "1",
                      title: "How do I create a new project?",
                      content: (
                        <p className="text-sm opacity-80">
                          Click the &quot;New Project&quot; button in Quick Actions or use the sidebar to navigate to Projects.
                        </p>
                      ),
                    },
                    {
                      id: "2",
                      title: "What are the deployment limits?",
                      content: (
                        <p className="text-sm opacity-80">
                          Free tier allows 100 deployments per month. Pro tier has unlimited deployments.
                        </p>
                      ),
                    },
                    {
                      id: "3",
                      title: "How do I invite team members?",
                      content: (
                        <p className="text-sm opacity-80">
                          Go to Team settings and use the invite link. You can also add members by email.
                        </p>
                      ),
                    },
                  ]}
                />
              ),
            },
            {
              id: "form",
              label: "Edit Profile",
              content: <FormDemo />,
            },
          ]}
        />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create New Project">
        <FormDemo />
      </Modal>
    </div>
  );
}
