import { DashboardLayout } from "@/components/dashboard-layout"

export default function PublishedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
