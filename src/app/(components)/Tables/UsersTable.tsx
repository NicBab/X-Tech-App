"use client";

import { useState, useEffect } from "react";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Trash2Icon, SearchIcon, PlusCircleIcon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockUsers = [
  {
    userId: "u001",
    name: "Nick Babineaux",
    email: "nick@xtechnology-usa.com",
    role: "admin",
    status: "active",
  },
  {
    userId: "u002",
    name: "John Smith",
    email: "john@xtechnology-usa.com",
    role: "user",
    status: "inactive",
  },
];

export default function UsersTable() {
  const [rows, setRows] = useState(mockUsers);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!search) {
      setRows(mockUsers);
    } else {
      const filtered = mockUsers.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      );
      setRows(filtered);
    }
  }, [search]);

  const handleRoleChange = (id: string, newRole: string) => {
    setRows((prev) =>
      prev.map((u) => (u.userId === id ? { ...u, role: newRole } : u))
    );
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setRows((prev) =>
      prev.map((u) => (u.userId === id ? { ...u, status: newStatus } : u))
    );
  };

  const handleDelete = (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setRows((prev) => prev.filter((u) => u.userId !== id));
    }
  };

  const columns: GridColDef[] = [
    { field: "userId", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 230 },
    {
      field: "role",
      headerName: "Role",
      width: 160,
      renderCell: (params: GridRenderCellParams) => (
        <Select
          defaultValue={params.row.role}
          onValueChange={(val) => handleRoleChange(params.row.userId, val)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params: GridRenderCellParams) => (
        <Select
          defaultValue={params.row.status}
          onValueChange={(val) => handleStatusChange(params.row.userId, val)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <button
          onClick={() => handleDelete(params.row.userId)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2Icon className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div className="w-full mx-auto p-8 space-y-6 border rounded-xl bg-white shadow-md dark:bg-zinc-900 border-zinc-800 m-20">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Header name="Users" />
        <Button className="flex items-center space-x-2">
          <PlusCircleIcon className="w-4 h-4" />
          <span>Add New User</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center border border-gray-300 rounded px-3 py-2 w-full max-w-md">
        <SearchIcon className="w-5 h-5 text-gray-500 mr-2" />
        <Input
          type="text"
          placeholder="Search by name, email, role, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-none focus:outline-none bg-transparent text-sm"
        />
      </div>

      {/* Table */}
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        autoHeight
        className="h-[400px] w-[100%] bg-white shadow rounded-lg border border-gray-200 !text-gray-700 dark:bg-zinc-900 dark:!text-gray-300"
      />
    </div>
  );
};