import AdminDashboardWrapper from "@/app/(components)/wrappers/AdminDashboardWrapper";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminDashboardWrapper>{children}</AdminDashboardWrapper>;
}