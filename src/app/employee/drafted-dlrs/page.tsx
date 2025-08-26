"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetDLRsQuery } from "@/redux/api/api";
import DLRTable from "@/app/(components)/Tables/DLRTable";

export default function EmployeeDraftedDLRsPage() {
  const { userId } = useSelector((s: RootState) => s.user);

  const { data = [], isFetching, isError, refetch } = useGetDLRsQuery(
    { userId: userId ?? "", role: "employee", status: "DRAFT" },
    { refetchOnMountOrArgChange: true, skip: !userId }
  );

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        {/* <h1 className="text-xl font-semibold">My Draft DLRs</h1> */}
        <button className="text-sm underline" onClick={() => refetch()} disabled={isFetching}>
          Refresh
        </button>
      </div>

      <DLRTable
        data={data}
        isLoading={isFetching}
        role="employee"
        currentUserId={userId ?? ""}
        title="My Draft DLRs"
      />

      {isError && <p className="text-red-500 mt-3 text-sm">Failed to load drafted DLRs.</p>}
      {!isFetching && !isError && data.length === 0 && (
        <p className="text-gray-500 mt-3 text-sm">No draft DLRs found.</p>
      )}
    </div>
  );
}
