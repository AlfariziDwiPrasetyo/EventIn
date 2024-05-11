import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";
import Sidebar from "@/components/dashboard/Sidebar";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Next Shadcn Dashboard Starter",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={cn(
          "bg-background font-sans antialiased",
          montserrat.variable
        )}
      >
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="w-full pt-16">{children}</main>
        </div>
      </body>
    </html>
  );
}
