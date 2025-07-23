"use client";

import { useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Header from "@/app/(components)/Header";
import { Input } from "@/components/ui/input";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useGetDLRsQuery } from "@/redux/api/api"; // RTK query
import { DLR } from "@/redux/slices/dlr/DLRTypes" // your existing shared type

interface DLRTableProps {
  role: "admin" | "user";
  currentUserId: string;
}

export default function DLRTable({ role, currentUserId }: DLRTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data = [], isLoading, isError } = useGetDLRsQuery(searchTerm);

  const filteredDLRs: DLR[] = data.filter((dlr) => {
    const matchesUser = role === "admin" || dlr.userId === currentUserId;
    return matchesUser;
  });

  const columns: GridColDef<DLR>[] = [
  { field: "dlrNumber", headerName: "DLR#", width: 120 },
  { field: "jobNumber", headerName: "Job#", width: 120 },
  {
    field: "user",
    headerName: "Employee",
    width: 180,
    valueGetter: (params) => params.row.user?.name || "N/A", // ✅ this now works
  },
  { field: "date", headerName: "Date", width: 140 },
  { field: "customer", headerName: "Customer", width: 120 },
  {
    field: "status",
    headerName: "Status",
    width: 140,
    renderCell: (params: GridRenderCellParams<DLR>) => {
      const status = params.value;
      let badgeClass = "";
      switch (status) {
        case "APPROVED":
          badgeClass = "bg-green-300 text-black";
          break;
        case "PENDING":
          badgeClass = "bg-yellow-200 text-black";
          break;
        case "REJECTED":
          badgeClass = "bg-red-300 text-black";
          break;
        case "REVIEW":
          badgeClass = "bg-blue-300 text-black";
          break;
        default:
          badgeClass = "bg-gray-300 text-black";
      }
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>
          {status}
        </span>
      );
    },
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
            placeholder="Search DLRs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER & BUTTON */}
      <div className="flex justify-between items-center mb-6">
        <Header name="DLRs" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Create DLR
        </button>
      </div>

      {isError ? (
        <p className="text-red-600">Failed to fetch DLRs.</p>
      ) : (
        <DataGrid
          rows={filteredDLRs}
          columns={columns}
          getRowId={(row: DLR) => row.dlrId}
          autoHeight
          loading={isLoading}
          className="bg-white shadow rounded-lg border border-gray-200 !text-gray-700 dark:bg-zinc-900 dark:!text-gray-300"
        />
      )}
    </div>
  );
}
