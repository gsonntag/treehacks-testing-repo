import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { CommandPalette } from "@/components/effects/CommandPalette";
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
    <html lang="en">
      <body className="antialiased" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
        <ThemeProvider>
          <ParticleBackground />
          <CommandPalette />
          <div className="flex min-h-screen relative z-10">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Navbar />
              <main className="flex-1 p-6">{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
