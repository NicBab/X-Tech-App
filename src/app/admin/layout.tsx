import DashboardLayout from "@/app/(components)/wrappers/DashboardWrapper";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}