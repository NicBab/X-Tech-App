"use client";

import { useMemo, useState } from "react";
import { DataGrid, GridColDef, GridRowId, GridRowParams } from "@mui/x-data-grid";
import { format } from "date-fns";
import { TimeEntryGroup } from "@/redux/slices/time/TimeTypes";
import { SearchIcon, EyeIcon, PlusCircleIcon } from "lucide-react";
import Header from "@/app/(components)/Header";

type Props = {
  rows: any[];
  loading?: boolean;
  error?: boolean;
  title?: string;
  onRowClick?: (id: GridRowId) => void;
  onCreate?: () => void;
  showCreateButton?: boolean;
};

export default function SubmittedTimesTable({
  rows,
  loading,
  error,
  title = "Submitted Times",
  onRowClick,
  onCreate,
  showCreateButton = false,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRows: TimeEntryGroup[] = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return (rows || []).filter(
      (e) =>
        e.id.toLowerCase().includes(term) ||
        (e.user?.name?.toLowerCase() ?? "").includes(term)
    );
  }, [rows, searchTerm]);

  const columns: GridColDef<TimeEntryGroup>[] = [
    { field: "id", headerName: "Entry ID", width: 170 },
    {
      field: "employeeName",
      headerName: "Employee",
      width: 180,
      valueGetter: (_, row) => row?.user?.name ?? "N/A",
    },
    {
      field: "date",
      headerName: "Date",
      width: 140,
      valueGetter: (_, row) =>
        row?.date ? format(new Date(row.date), "yyyy-MM-dd") : "N/A",
    },
    {
      field: "weekEndingDate",
      headerName: "Week Ending",
      width: 140,
      valueGetter: (_, row) =>
        row?.weekEndingDate ? format(new Date(row.weekEndingDate), "yyyy-MM-dd") : "N/A",
    },
    {
      field: "jobCount",
      headerName: "Jobs",
      width: 90,
      valueGetter: (_, row) => row?.jobs?.length ?? 0,
    },
    {
      field: "totalHours",
      headerName: "Total Hours",
      width: 130,
      valueGetter: (_, row) =>
        (row?.jobs ?? []).reduce((sum, j) => sum + (Number(j.hoursWorked) || 0), 0),
    },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "view",
      headerName: "View",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRowClick?.(params.row.id);
          }}
          title="View"
          className="text-blue-600 hover:text-blue-800"
        >
          <EyeIcon className="w-5 h-5" />
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
            className="w-full py-2 px-4 rounded bg-white text-black dark:bg-zinc-800 dark:text-gray-100"
            placeholder="Search submitted times..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER & (optional) BUTTON */}
      <div className="flex justify-between items-center mb-6">
        <Header name={title} />
        {showCreateButton && (
          <button
            className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => onCreate?.()}
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" /> Create Time Entry
          </button>
        )}
      </div>

      {/* TABLE */}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        getRowId={(row) => row.id}
       onRowClick={(params: GridRowParams) => onRowClick?.(params.id)}
        className="bg-white shadow rounded-lg border border-gray-200 !text-gray-700 dark:bg-zinc-900 dark:!text-gray-300"
        autoHeight
        loading={loading}
      />

      {error ? (
        <p className="text-red-500 mt-4 text-sm text-center">
          Failed to load time entries.
        </p>
      ) : (
        !loading &&
        filteredRows.length === 0 && (
          <p className="text-gray-500 mt-4 text-sm text-center">
            No submitted time entries found.
          </p>
        )
      )}
    </div>
  );
}
