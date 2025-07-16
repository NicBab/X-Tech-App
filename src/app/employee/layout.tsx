import DashboardLayout from "@/app/(components)/wrappers/DashboardWrapper";

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}