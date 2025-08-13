"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetTimeEntriesQuery } from "@/redux/api/api";
import SubmittedTimesTable from "@/app/(components)/Tables/SubmittedTimesTable";

export default function SubmittedTimesPage() {
  const router = useRouter();
  const { userId, role } = useSelector((s: RootState) => s.user);

  const { data = [], isLoading, isError } = useGetTimeEntriesQuery({
    userId: userId ?? "",
    role: (role as "admin" | "user") ?? "user",
    status: "SUBMITTED",
  });

  return (
    <div className="p-6">
      <SubmittedTimesTable
        rows={(data || []).filter((e) => e.userId === userId)}
        loading={isLoading}
        error={isError}
        title="My Submitted Time Entries"
        onRowClick={(id) => router.push(`/employee/submitted-times/${id}`)}
        showCreateButton
        onCreate={() => router.push("/employee/new-time-entry")}
      />
    </div>
  );
}
