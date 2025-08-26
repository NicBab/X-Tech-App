"use client";

import { useGetDLRsQuery } from "@/redux/api/api";
import DLRTable from "@/app/(components)/Tables/DLRTable";

export default function AdminDLRsPage() {
  const { data = [], isFetching, isError, refetch } = useGetDLRsQuery(
    { role: "admin", status: "PENDING" },  // server also blocks DRAFTs for admin
    { refetchOnMountOrArgChange: true }
  );

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        {/* <h1 className="text-xl font-semibold">Submitted DLRs</h1> */}
        <button className="text-sm underline" onClick={() => refetch()} disabled={isFetching}>
          Refresh
        </button>
      </div>

      <DLRTable
        data={data}
        isLoading={isFetching}
        role="admin"
        title="Submitted DLRs"
        // onRowClick={(row) => router.push(`/admin/dlrs/${row.dlrId}`)}
      />

      {isError && <p className="text-red-500 mt-3 text-sm">Failed to load DLRs.</p>}
      {!isFetching && !isError && data.length === 0 && (
        <p className="text-gray-500 mt-3 text-sm">No submitted DLRs found.</p>
      )}
    </div>
  );
}
