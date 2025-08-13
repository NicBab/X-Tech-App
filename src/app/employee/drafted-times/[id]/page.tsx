"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetTimeEntryByIdQuery } from "@/redux/api/api";
import { TimeEntryGroup } from "@/redux/slices/time/TimeTypes";
import TimeEntryForm from "@/app/(components)/Forms/TimeEntryForm";

export default function EditDraftTimeEntryPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, isError } = useGetTimeEntryByIdQuery(id);

  if (isLoading) return <div className="p-6">Loading…</div>;
  if (isError || !data) return <div className="p-6 text-red-600">Failed to load draft.</div>;

  // Pass the loaded group into the form for prefill and include the id to update
  return (
    <div className="p-4">
      <TimeEntryForm initialGroup={data as TimeEntryGroup} editingId={id} onDone={() => router.push("/employee/draft-times")} />
    </div>
  );
}
