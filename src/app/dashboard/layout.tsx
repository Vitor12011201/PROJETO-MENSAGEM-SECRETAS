import { DashboardLayoutClient } from "@/features/dashboard/DashboardLayoutClient";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}

