import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function PrivacyPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <Breadcrumbs items={[{ label: "Dashboard", href: "/" }, { label: "Privacy" }]} />
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <p className="opacity-80">
        This is a test application. No data is collected or stored. This page exists for UI testing purposes.
      </p>
    </div>
  );
}
