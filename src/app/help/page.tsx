import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";

export default function HelpPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Help" }]} />
      <h1 className="text-2xl font-bold">Help Center</h1>

      <div
        className="rounded-xl p-6 border max-w-2xl"
        style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
      >
        <Accordion
          items={[
            {
              id: "1",
              title: "Getting Started",
              content: (
                <p className="text-sm opacity-80">
                  Welcome to CommandHub! Start by creating a project from the Dashboard. You can invite team members from the Team page.
                </p>
              ),
            },
            {
              id: "2",
              title: "Managing Projects",
              content: (
                <p className="text-sm opacity-80">
                  Projects can be created, archived, or deleted from the Projects page. Each project has its own settings and team access.
                </p>
              ),
            },
            {
              id: "3",
              title: "Understanding Analytics",
              content: (
                <p className="text-sm opacity-80">
                  The Analytics page shows traffic, conversions, and user behavior. Data is updated in real-time.
                </p>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
