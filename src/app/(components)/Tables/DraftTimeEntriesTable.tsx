"use client";

import { useState, useMemo } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useGetTimeEntriesQuery } from "@/redux/api/api"; // must already be defined
import { TimeEntryGroup } from "@/redux/slices/time/TimeTypes";
import { Trash2Icon, SearchIcon, PlusCircleIcon } from "lucide-react";
import Header from "@/app/(components)/Header";

export default function DraftTimeEntriesTable() {
  const { userId, role } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: entries = [],
    isLoading,
    isError,
  } = useGetTimeEntriesQuery({
  userId: userId ?? "",
  role: role ?? "employee",
  status: "DRAFT",
});

  const filteredEntries: TimeEntryGroup[] = useMemo(() => {
    return entries
      .filter((entry) => entry.status === "DRAFT" && entry.userId === userId)
      .filter(
        (entry) =>
          entry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [entries, userId, searchTerm]);

  const columns: GridColDef<TimeEntryGroup>[] = [
    { field: "id", headerName: "Entry ID", width: 160 },
    {
      field: "employeeName",
      headerName: "Employee",
      width: 180,
      valueGetter: (value, row: TimeEntryGroup) => row?.user?.name ?? "N/A",
    },
    {
      field: "date",
      headerName: "Date",
      width: 140,
      valueGetter: (value, row: TimeEntryGroup) =>
        row?.date ? format(new Date(row.date), "yyyy-MM-dd") : "N/A",
    },
    {
      field: "jobCount",
      headerName: "Jobs",
      width: 100,
      valueGetter: (value, row: TimeEntryGroup) => row?.jobs?.length ?? 0,
    },
    {
      field: "totalHours",
      headerName: "Total Hours",
      width: 140,
      valueGetter: (value, row: TimeEntryGroup) =>
        row?.jobs?.reduce((sum, job) => sum + job.hoursWorked, 0) ?? 0,
    },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "actions",
      headerName: "Remove",
      sortable: false,
      width: 80,
      renderCell: (params: GridRenderCellParams<TimeEntryGroup>) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("Delete entry ID:", params?.row?.id);
          }}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2Icon className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      {/* SEARCH */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white text-black"
            placeholder="Search Drafted Times..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER & BUTTON */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Drafted Times" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push("/employee/new-time-entry")}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Create Entry
        </button>
      </div>

      {/* TABLE */}
      <DataGrid
        rows={filteredEntries}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={(params) =>
          router.push(`/employee/draft-times/${params.row.id}`)
        }
        className="bg-white shadow rounded-lg border border-gray-200 !text-gray-700 dark:bg-zinc-900 dark:!text-gray-300"
        autoHeight
        loading={isLoading}
      />

      {isError ? (
        <p className="text-red-500 mt-4 text-sm text-center">
          Failed to load time entries.
        </p>
      ) : (
        !isLoading &&
        filteredEntries.length === 0 && (
          <p className="text-gray-500 mt-4 text-sm text-center">
            No draft time entries found.
          </p>
        )
      )}
    </div>
  );
}
