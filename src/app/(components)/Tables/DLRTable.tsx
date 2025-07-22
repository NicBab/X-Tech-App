"use client";

import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/app/(components)/Header";
import { Input } from "@/components/ui/input";

type Role = "admin" | "user";

interface DLR {
  dlrId: string;
  jobNumber: string;
  employeeName: string;
  date: string;
  customer: string;
  status: "Pending" | "Approved" | "Rejected";
  userId: string;
}

interface DLRTableProps {
  role: "admin" | "user";
  currentUserId: string;
}

const mockDLRs: DLR[] = [
  {
    dlrId: "DLR-001",
    jobNumber: "XT-2024-001",
    employeeName: "Nick Babineaux",
    date: "2024-07-08",
    customer: "Talos",
    status: "Pending",
    userId: "user-123",
  },
  {
    dlrId: "DLR-002",
    jobNumber: "XT-2024-002",
    employeeName: "John Smith",
    date: "2024-07-09",
    customer: "Grit",
    status: "Approved",
    userId: "user-456",
  },
  {
    dlrId: "DLR-003",
    jobNumber: "XT-2024-003",
    employeeName: "User 1",
    date: "2024-07-09",
    customer: "SM Energy",
    status: "Rejected",
    userId: "user-123",
  },
];

export default function DLRTable({ role, currentUserId }: DLRTableProps) {
  const [search, setSearch] = useState("");

  const filteredDLRs = mockDLRs.filter((dlr) => {
    const matchesUser = role === "admin" || dlr.userId === currentUserId;
    const matchesSearch =
      dlr.dlrId.toLowerCase().includes(search.toLowerCase()) ||
      dlr.jobNumber.toLowerCase().includes(search.toLowerCase()) ||
      dlr.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      dlr.customer.toLowerCase().includes(search.toLowerCase());
    return matchesUser && matchesSearch;
  });

  const columns: GridColDef[] = [
    { field: "jobNumber", headerName: "Job#", width: 120 },
    { field: "dlrId", headerName: "DLR#", width: 120 },
    { field: "employeeName", headerName: "Employee", width: 180 },
    { field: "date", headerName: "Date", width: 140 },
    { field: "customer", headerName: "Customer", width: 120 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        const status = params.value;
        let badgeClass = "";
        switch (status) {
          case "Approved":
            badgeClass = "bg-green-300 text-black";
            break;
          case "Pending":
            badgeClass = "bg-yellow-200 text-black";
            break;
          case "Rejected":
            badgeClass = "bg-red-300 text-black";
            break;
          default:
            badgeClass = "bg-gray-300 text-black";
        }
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="w-full mx-auto p-8 space-y-6 border rounded-xl bg-white shadow-md dark:bg-zinc-900 border-zinc-800 m-20">
      <div className="flex justify-between items-center">
        <Header name="DLRs" />
        <Input
          placeholder="Search by DLR, Job, Employee, or Customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[300px]"
        />
      </div>

      <DataGrid
        rows={filteredDLRs}
        columns={columns}
        getRowId={(row) => row.dlrId}
        autoHeight
        className="bg-white shadow rounded-lg border border-gray-200 !text-gray-700 dark:bg-zinc-900 dark:!text-gray-300"
      />
    </div>
  );
}
