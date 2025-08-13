"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetTimeEntryByIdQuery } from "@/redux/api/api";
import TimeEntryForm from "@/app/(components)/Forms/TimeEntryForm";

export default function AdminEditDraftPage() {
  // read dynamic route param
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const router = useRouter();
  const { userId } = useSelector((s: RootState) => s.user);

  // fetch the draft by id
  const { data, isLoading, isError } = useGetTimeEntryByIdQuery(id!, {
    skip: !id,
  });

  // if the draft doesn’t belong to this admin, bounce back
  useEffect(() => {
    if (!isLoading && data && userId && data.userId !== userId) {
      router.replace("/admin/drafted-times");
    }
  }, [isLoading, data, userId, router]);

  if (!id) return <div className="p-6 text-red-600">Invalid draft id.</div>;
  if (isLoading) return <div className="p-6">Loading…</div>;
  if (isError || !data) return <div className="p-6 text-red-600">Draft not found.</div>;
  if (data.userId !== userId) return <div className="p-6 text-red-600">You don’t have access to this draft.</div>;

  return (
    <div className="p-6">
      <div className="mb-4 text-sm text-gray-500">
        Editing draft <span className="font-mono">{id}</span>
      </div>

      <TimeEntryForm
        initialGroup={data}
        editingId={id}
        onDone={() => router.push("/admin/drafted-times")}
      />
    </div>
  );
}
