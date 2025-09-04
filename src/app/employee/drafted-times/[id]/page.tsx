"use client";

import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useGetTimeEntryByIdQuery } from "@/redux/api/api";
import { TimeEntryGroup } from "@/redux/slices/time/TimeTypes";
import TimeEntryForm from "@/app/(components)/Forms/TimeEntryForm";

export default function EditDraftTimeEntryPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, isError } = useGetTimeEntryByIdQuery(id);

  if (isLoading) return <div className="p-6">Loading…</div>;
  if (isError || !data) return <div className="p-6 text-red-600">Failed to load draft.</div>;

  // If your TimeEntryForm calls onDone() with the updated group, we can inspect status.
  const handleDone = (updated?: Partial<TimeEntryGroup>) => {
    const wasDraft =
      !updated || updated.status === "DRAFT" || updated.status === undefined;

    if (wasDraft) {
      toast.success("Draft saved successfully");
    } else {
      toast.success("Time entry submitted");
    }
    router.push("/employee/drafted-times");
  };

  return (
    <div className="p-4">
      <TimeEntryForm
        initialGroup={data as TimeEntryGroup}
        editingId={id}
        onDone={handleDone}
      />
    </div>
  );
}
