"use client";

import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Header from "@/app/(components)/Header";

// Sample mock data for draft entries
const DraftTimeEntries = [
  {
    id: "entry-001",
    employeeName: "Nick Babineaux",
    date: "2025-07-07",
    jobCount: 2,
    totalHours: 10.5,
    status: "Draft",
  },
  {
    id: "entry-002",
    employeeName: "Nick Babineaux",
    date: "2025-07-08",
    jobCount: 1,
    totalHours: 8.0,
    status: "Draft",
  },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "Entry ID", width: 140 },
  { field: "employeeName", headerName: "Employee", width: 180 },
  {
    field: "date",
    headerName: "Date",
    width: 140,
    valueGetter: (value) => format(new Date(value), "yyyy-MM-dd"),
  },
  { field: "jobCount", headerName: "Jobs", width: 100 },
  { field: "totalHours", headerName: "Total Hours", width: 140 },
  { field: "status", headerName: "Status", width: 120 },
];

export default function DraftedTimeEntries() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleRowClick = (params: any) => {
    setSelected(params.row.id);
    router.push(`/employee/draft-times/${params.row.id}`);
  };

  return (
    <div className="w-full mx-auto p-8 space-y-6 border rounded-xl bg-white shadow-md dark:bg-zinc-900 border-zinc-800 m-20">
      <div className="flex justify-between items-center">
        <Header name="Drafted Time Entries" />
        <Button onClick={() => router.push("/employee/time-entry")}>New Entry</Button>
      </div>

      <DataGrid
        rows={DraftTimeEntries}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={handleRowClick}
        className="bg-white shadow rounded-lg border border-gray-200 !text-gray-700 dark:bg-zinc-900 dark:!text-gray-300"
        autoHeight
      />
    </div>
  );
}
