import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function TermsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Terms" }]} />
      <h1 className="text-2xl font-bold">Terms of Service</h1>
      <p className="opacity-80">
        This is a test application. Terms of service placeholder for UI testing.
      </p>
    </div>
  );
}
