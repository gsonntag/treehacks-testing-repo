import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="mt-auto border-t py-6 px-6"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--card-bg)" }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-6 text-sm">
          <Link href="/privacy" className="opacity-70 hover:opacity-100">
            Privacy
          </Link>
          <Link href="/terms" className="opacity-70 hover:opacity-100">
            Terms
          </Link>
          <Link href="/docs" className="opacity-70 hover:opacity-100">
            Documentation
          </Link>
        </div>
        <p className="text-sm opacity-60">© 2025 CommandHub. Built for testing.</p>
      </div>
    </footer>
  );
}
