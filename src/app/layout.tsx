import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "CommandHub - Dashboard",
  description: "A complex frontend for testing AI dev tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="antialiased" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
        <ThemeProvider>
          <LayoutWrapper>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col min-w-0">
                <Navbar />
                <main className="flex-1 p-6">{children}</main>
                <Footer />
              </div>
            </div>
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
