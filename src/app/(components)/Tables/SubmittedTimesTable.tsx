"use client";

import { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import Header from "@/app/(components)/Header";
import { SearchIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetTimeEntriesQuery } from "@/redux/api/api";
import {
  TimeEntryGroup,
  TimeEntryJob,
} from "@/redux/slices/time/TimeTypes";
import { format } from "date-fns";

export default function SubmittedTimesTable() {
  const { userId, role } = useSelector((state: RootState) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  const { data = [], isLoading, isError } = useGetTimeEntriesQuery({
    userId: userId ?? "",
    role: role ?? "employee",
    status: "SUBMITTED",
  });

  const filteredEntries: TimeEntryGroup[] = data
    .filter((entry) => entry.status === "SUBMITTED")
    .filter((entry) =>
      role === "admin" ? true : entry.userId === userId
    )
    .filter(
      (entry) =>
        entry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const columns: GridColDef<TimeEntryGroup>[] = [
    { field: "id", headerName: "Entry ID", width: 160 },
    {
      field: "user",
      headerName: "Employee",
      width: 180,
      valueGetter: (value, row: TimeEntryGroup) =>
        row?.user?.name ?? "N/A",
    },
    {
      field: "date",
      headerName: "Date",
      width: 140,
      valueGetter: (value, row: TimeEntryGroup) =>
        row?.date
          ? format(new Date(row.date), "yyyy-MM-dd")
          : "N/A",
    },
    {
      field: "weekEndingDate",
      headerName: "Week Ending",
      width: 140,
      valueGetter: (value, row: TimeEntryGroup) =>
        row?.weekEndingDate
          ? format(new Date(row.weekEndingDate), "yyyy-MM-dd")
          : "N/A",
    },
    {
      field: "totalHours",
      headerName: "Total Hours",
      width: 140,
      valueGetter: (value, row: TimeEntryGroup) =>
        row?.jobs?.reduce(
          (sum: number, job: TimeEntryJob) => sum + job.hoursWorked,
          0
        ) ?? 0,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      valueGetter: (value, row: TimeEntryGroup) =>
        row?.status ?? "Unknown",
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
            placeholder="Search Submitted Times..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Submitted Times" />
      </div>

      {/* TABLE */}
      {isError ? (
        <p className="text-red-500 text-center mt-4">
          Failed to load time entries.
        </p>
      ) : (
        <DataGrid
          rows={filteredEntries}
          columns={columns}
          getRowId={(row: TimeEntryGroup) => row.id}
          autoHeight
          loading={isLoading}
          className="bg-white shadow rounded-lg border border-gray-200 !text-gray-700 dark:bg-zinc-900 dark:!text-gray-300"
        />
      )}
    </div>
  );
}
