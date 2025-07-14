"use client";

import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { SearchIcon, Trash2Icon, PlusCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/app/(components)/Header";

interface DraftDLR {
  id: string;
  dlrNumber: string;
  jobNumber: string;
  date: string;
  hours: number;
  userId: string;
}

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
];

export default function DraftDLRsTable() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<DraftDLR[]>([]);
  const loggedInUserId = "user-123"; // Replace with Redux/Auth context

  useEffect(() => {
    const userDrafts = mockDLRs.filter((dlr) => dlr.userId === loggedInUserId);
    setFiltered(userDrafts);
  }, []);

  useEffect(() => {
    const results = mockDLRs.filter(
      (dlr) =>
        dlr.userId === loggedInUserId &&
        (dlr.dlrNumber.toLowerCase().includes(search.toLowerCase()) ||
          dlr.jobNumber.toLowerCase().includes(search.toLowerCase()))
    );
    setFiltered(results);
  }, [search]);

  const handleDelete = (id: string) => {
    setFiltered((prev) => prev.filter((dlr) => dlr.id !== id));
  };

  const columns: GridColDef[] = [
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
    <Card className="mx-auto p-8 space-y-6 border rounded-xl bg-white shadow-md dark:bg-zinc-900 border-zinc-800 m-20">
      <div className="flex items-center justify-between">
        <Header name="Drafted DLRs" />
        <Button onClick={() => router.push("/employee/new-dlr")}>
          <PlusCircle className="w-5 h-5 mr-2" />
          New DLR
        </Button>
      </div>

      <div className="flex items-center border border-gray-300 rounded mt-4">
        <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
        <input
          className="w-full py-2 px-4 bg-white"
          placeholder="Search by DLR# or Job#..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <DataGrid
        rows={filtered}
        columns={columns}
        getRowId={(row) => row.id}
        className="bg-white shadow rounded-lg border border-gray-200 !text-gray-700"
        onRowClick={(params) =>
          router.push(`/employee/draft-dlrs/${params.id}`)
        }
      />
    </Card>
  );
};