import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function DocsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Documentation" }]} />
      <h1 className="text-2xl font-bold">Documentation</h1>
      <p className="opacity-80">
        API docs and usage guides. Placeholder for UI testing.
      </p>
    </div>
  );
}
