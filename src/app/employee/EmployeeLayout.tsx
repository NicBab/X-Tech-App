import EmployeeDashboardWrapper from "@/app/(components)/wrappers/EmployeeDashboardWrapper"

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return <EmployeeDashboardWrapper>{children}</EmployeeDashboardWrapper>;
}