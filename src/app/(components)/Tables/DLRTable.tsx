"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import Header from "@/app/(components)/Header"

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
          break;
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

{/*MOCK DATA*/}
const rows = [
  {
    dlrId: "DLR-001",
    jobNumber: "XT-2024-001",
    employeeName: "Nick Babineaux",
    date: "2024-07-08",
    customer: "Talos",
    status: "Pending",
  },
  {
    dlrId: "DLR-002",
    jobNumber: "XT-2024-002",
    employeeName: "John Smith",
    date: "2024-07-09",
    customer: "Grit",
    status: "Approved",
  },
    {
    dlrId: "DLR-003",
    jobNumber: "XT-2024-003",
    employeeName: "User 1",
    date: "2024-07-09",
    customer: "SM energy",
    status: "Rejected",
  },
];

const DLRTable = () => {
  const [data] = useState(rows);

  return (
    <div className="w-full mx-auto p-8 space-y-6 border rounded-xl bg-white shadow-md dark:bg-zinc-900 border-zinc-800 m-20">
       <div className="flex justify-between items-center">
        <Header name="DLR's" />
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.dlrId}
        />
      </div>
    </div>
  );
};

export default DLRTable;