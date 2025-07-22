"use client";

import { useState, useEffect, useMemo } from "react";
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
import { useGetUsersQuery, User } from "@/redux/api/api";

export default function UsersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: users = [],
    isLoading,
    isError,
  } = useGetUsersQuery(); // Assume server returns all users for now

  const [rows, setRows] = useState<User[]>([]);

  useEffect(() => {
    setRows(users);
  }, [users]);

  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return rows;

    const term = searchTerm.toLowerCase();
    return rows.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
  }, [rows, searchTerm]);

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
      // You can also add a mutation to delete user from DB
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

  if (isLoading) {
    return <div className="py-4 text-gray-500">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="py-4 text-red-500 text-center">
        Failed to fetch users.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* SEARCH */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white text-black"
            placeholder="Search Users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER & BUTTON */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Users" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" /> Create User
        </button>
      </div>

      {/* TABLE */}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        autoHeight
        className="h-[400px] w-[100%] bg-white shadow rounded-lg border border-gray-200 !text-gray-700 dark:bg-zinc-900 dark:!text-gray-300"
      />
    </div>
  );
}
