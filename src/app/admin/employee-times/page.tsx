"use client";

import { useRouter } from "next/navigation";
import SubmittedTimesTable from "@/app/(components)/Tables/SubmittedTimesTable";
import { useGetTimeEntriesQuery } from "@/redux/api/api";

export default function EmployeeTimes() {
  // Admin fetch: role=admin, status=SUBMITTED; userId can be blank
  const { data = [], isLoading, isError } = useGetTimeEntriesQuery({
    userId: "",
    role: "admin",
    status: "SUBMITTED",
  });

  const router = useRouter();

  return (
    <div className="p-6">
      <SubmittedTimesTable
        rows={data}
        loading={isLoading}
        error={isError}
        title="Employees Submitted Times"
        onRowClick={(id) => router.push(`/admin/employee-times/${id}`)}
      />
    </div>
  );
}
