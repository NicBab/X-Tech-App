"use client";

import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useGetTimeEntryByIdQuery } from "@/redux/api/api";
import { TimeEntryGroup } from "@/redux/slices/time/TimeTypes";
import TimeEntryForm from "@/app/(components)/Forms/TimeEntryForm";

export default function EmployeeSubmittedTimeByIdPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, isError } = useGetTimeEntryByIdQuery(id);

  if (isLoading) return <div className="p-6">Loading…</div>;
  if (isError || !data) return <div className="p-6 text-red-600">Not found.</div>;

  const entry = data as TimeEntryGroup;
  const isSubmitted = entry.status === "SUBMITTED";

  const handleDone = (updated?: Partial<TimeEntryGroup>) => {
    const finalStatus = (updated?.status ?? entry.status) as TimeEntryGroup["status"];
    if (finalStatus === "SUBMITTED") {
      toast.success(isSubmitted ? "Re-submitted successfully" : "Submitted successfully");
      router.push("/employee/submitted-times");
    } else {
      toast.success("Draft saved");
      // If you prefer drafts to go back to Drafted Times:
      router.push("/employee/drafted-times");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {isSubmitted ? "Submitted Time Entry (View / Re-submit)" : "Draft Time Entry (Edit)"}
        </h1>
        <button
          className="text-sm underline"
          onClick={() =>
            router.push(isSubmitted ? "/employee/submitted-times" : "/employee/drafted-times")
          }
        >
          Back to {isSubmitted ? "Submitted Times" : "Drafted Times"}
        </button>
      </div>

      <TimeEntryForm
        initialGroup={entry}
        // If it's submitted, enable the replace flow via POST /times/:id/resubmit
        resubmitId={isSubmitted ? id : undefined}
        // If it's (somehow) a draft here, allow normal PATCH /times/:id
        editingId={!isSubmitted ? id : undefined}
        onDone={handleDone}
      />
    </div>
  );
}
