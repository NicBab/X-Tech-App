"use client";

import { useState, useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { SearchIcon, Trash2Icon, PlusCircleIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import Header from "@/app/(components)/Header";

interface DraftDLR {
  id: string;
  dlrNumber: string;
  jobNumber: string;
  date: string;
  hours: number;
  userId: string;
}

interface DraftDLRTableProps {
  role: "admin" | "user";
  currentUserId: string;
}

// Replace this with API or Redux data later
const mockDLRs: DraftDLR[] = [
  {
    id: "1",
    dlrNumber: "DLR-001",
    jobNumber: "XT-2025-045",
    date: "2025-07-08",
    hours: 8,
    userId: "user-123",
  },
  {
    id: "2",
    dlrNumber: "DLR-002",
    jobNumber: "XT-2025-046",
    date: "2025-07-09",
    hours: 6,
    userId: "user-123",
  },
  {
    id: "3",
    dlrNumber: "DLR-003",
    jobNumber: "XT-2025-047",
    date: "2025-07-10",
    hours: 5,
    userId: "user-456",
  },
];

export default function DraftDLRsTable({ role, currentUserId }: DraftDLRTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDLRs = useMemo(() => {
    return mockDLRs.filter((dlr) => {
      const matchesUser = role === "admin" || dlr.userId === currentUserId;
      const matchesSearch =
        dlr.dlrNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dlr.jobNumber.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesUser && matchesSearch;
    });
  }, [searchTerm, currentUserId, role]);

  const handleDelete = (id: string) => {
    // Replace with backend logic later
    console.log(`Delete draft DLR ${id}`);
  };

  const columns: GridColDef<DraftDLR>[] = [
    { field: "dlrNumber", headerName: "DLR#", width: 120 },
    { field: "jobNumber", headerName: "Job#", width: 120 },
    { field: "date", headerName: "Date", width: 140 },
    { field: "hours", headerName: "Hours", width: 100 },
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
            placeholder="Search drafted DLRs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER & BUTTON */}
      <div className="flex justify-between items-center">
        <Header name="Drafted DLRs" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Create DLR
        </button>
      </div>

      {/* TABLE */}
      <DataGrid
        rows={filteredDLRs}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
        className="bg-white shadow rounded-lg border border-gray-200 !text-gray-700 mt-6 dark:bg-zinc-900 dark:!text-gray-300"
        onRowClick={(params) =>
          router.push(`/employee/draft-dlrs/${params.id}`)
        }
      />
      
    </div>
  );
}
