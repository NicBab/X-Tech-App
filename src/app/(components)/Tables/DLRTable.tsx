"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useMemo } from "react";
import Header from "@/app/(components)/Header";
import { SearchIcon } from "lucide-react";

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
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>
          {status}
        </span>
      );
    },
  },
];

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
  const [search, setSearch] = useState("");
  const [data] = useState(rows);

  const filtered = useMemo(() => {
    return data.filter((row) => {
      const s = search.toLowerCase();
      return (
        row.dlrId.toLowerCase().includes(s) ||
        row.jobNumber.toLowerCase().includes(s) ||
        row.employeeName.toLowerCase().includes(s) ||
        row.customer.toLowerCase().includes(s)
      );
    });
  }, [search, data]);

  return (
    <div className="w-full mx-auto p-8 space-y-6 border rounded-xl bg-white shadow-md dark:bg-zinc-900 border-zinc-800 m-20">
      <div className="flex justify-between items-center">
        <Header name="DLRs" />
      </div>

      <div className="flex items-center border border-gray-300 rounded px-3 py-2 mb-4">
        <SearchIcon className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search DLR#, Job#, Employee, Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200"
        />
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filtered}
          columns={columns}
          getRowId={(row) => row.dlrId}
          className="bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-100"
        />
      </div>
    </div>
  );
};

export default DLRTable;




// "use client";

// import { useState, useMemo } from "react";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import Header from "@/app/(components)/Header";
// import { Input } from "@/components/ui/input";

// interface DLR {
//   dlrId: string;
//   jobNumber: string;
//   employeeName: string;
//   employeeId: string;
//   date: string;
//   customer: string;
//   status: string;
// }

// interface DLRTableProps {
//   currentUserId: string;
//   currentUserRole: "admin" | "user";
// }

// const allRows: DLR[] = [
//   {
//     dlrId: "DLR-001",
//     jobNumber: "XT-2024-001",
//     employeeName: "Nick Babineaux",
//     employeeId: "user-123",
//     date: "2024-07-08",
//     customer: "Talos",
//     status: "Pending",
//   },
//   {
//     dlrId: "DLR-002",
//     jobNumber: "XT-2024-002",
//     employeeName: "John Smith",
//     employeeId: "user-456",
//     date: "2024-07-09",
//     customer: "Grit",
//     status: "Approved",
//   },
//   {
//     dlrId: "DLR-003",
//     jobNumber: "XT-2024-003",
//     employeeName: "User 1",
//     employeeId: "user-789",
//     date: "2024-07-09",
//     customer: "SM Energy",
//     status: "Rejected",
//   },
// ];

// export default function DLRTable({ currentUserId, currentUserRole }: DLRTableProps) {
//   const [search, setSearch] = useState("");

//   const columns: GridColDef[] = [
//     { field: "jobNumber", headerName: "Job#", width: 120 },
//     { field: "dlrId", headerName: "DLR#", width: 120 },
//     { field: "employeeName", headerName: "Employee", width: 180 },
//     { field: "date", headerName: "Date", width: 140 },
//     { field: "customer", headerName: "Customer", width: 140 },
//     {
//       field: "status",
//       headerName: "Status",
//       width: 140,
//       renderCell: (params) => {
//         const status = params.value;
//         let badgeClass = "";
//         switch (status) {
//           case "Approved":
//             badgeClass = "bg-green-300 text-black";
//             break;
//           case "Pending":
//             badgeClass = "bg-yellow-200 text-black";
//             break;
//           case "Rejected":
//             badgeClass = "bg-red-300 text-black";
//             break;
//           default:
//             badgeClass = "bg-gray-300 text-black";
//             break;
//         }
//         return (
//           <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>
//             {status}
//           </span>
//         );
//       },
//     },
//   ];

//   const filteredRows = useMemo(() => {
//     const filtered = allRows.filter((row) =>
//       currentUserRole === "admin" ? true : row.employeeId === currentUserId
//     );

//     return filtered.filter((row) =>
//       row.jobNumber.toLowerCase().includes(search.toLowerCase()) ||
//       row.dlrId.toLowerCase().includes(search.toLowerCase()) ||
//       row.employeeName.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [search, currentUserId, currentUserRole]);

//   return (
//     <div className="w-full mx-auto p-8 space-y-6 border rounded-xl bg-white shadow-md dark:bg-zinc-900 border-zinc-800 m-20">
//       <div className="flex justify-between items-center">
//         <Header name="DLRs" />
//         <Input
//           type="text"
//           placeholder="Search by DLR, Job#, or Name..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-[250px]"
//         />
//       </div>
//       <div style={{ height: 400, width: "100%" }}>
//         <DataGrid
//           rows={filteredRows}
//           columns={columns}
//           getRowId={(row) => row.dlrId}
//           className="bg-white text-gray-800 dark:bg-zinc-900 dark:text-gray-200"
//         />
//       </div>
//     </div>
//   );
// }