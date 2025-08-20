"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetTimeEntryByIdQuery } from "@/redux/api/api";
import { TimeEntryGroup } from "@/redux/slices/time/TimeTypes";
import TimeEntryForm from "@/app/(components)/Forms/TimeEntryForm";

export default function AdminEmployeeTimeEntryPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  // Admin guard
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!user.isAuthenticated || user.role !== "admin") {
      router.push("/login");
    }
  }, [user.isAuthenticated, user.role, router]);

  const { data, isLoading, isError } = useGetTimeEntryByIdQuery(id);

  if (!user.isAuthenticated || user.role !== "admin") {
    return <p className="text-white text-center mt-20">Redirecting...</p>;
  }

  if (isLoading) return <div className="p-6">Loading…</div>;
  if (isError || !data) return <div className="p-6 text-red-600">Failed to load time entry.</div>;

  return (
    <div className="p-4">
      {/* If your TimeEntryForm supports readOnly or mode props, pass them here */}
      <TimeEntryForm
        initialGroup={data as TimeEntryGroup}
        editingId={id}
        onDone={() => router.push("/admin/employee-times")}
      />
    </div>
  );
}
