"use client";

import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2Icon, SearchIcon, PlusCircleIcon } from "lucide-react";
import Header from "@/app/(components)/Header";

// Sample mock data for draft entries
const initialDraftTimeEntries = [
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

export default function DraftTimeEntries() {
  const router = useRouter();
  const [entries, setEntries] = useState(initialDraftTimeEntries);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEntries, setFilteredEntries] = useState(entries);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const results = entries.filter(
      (entry) =>
        entry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEntries(results);
  }, [searchTerm, entries]);

  const handleRowClick = (params: { row: { id: string } }) => {
    router.push(`/employee/draft-times/${params.row.id}`);
  };

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

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
    {
      field: "actions",
      headerName: "Remove",
      sortable: false,
      width: 80,
      renderCell: (params) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(params.row.id);
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
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Create DLR
        </button>
      </div>

      {/* Data Table */}
      <DataGrid
        rows={filteredEntries}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={handleRowClick}
        className="bg-white shadow rounded-lg border border-gray-200 !text-gray-700 dark:bg-zinc-900 dark:!text-gray-300"
        autoHeight
      />
    </div>
  );
}
