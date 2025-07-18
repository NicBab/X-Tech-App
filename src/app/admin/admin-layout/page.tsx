"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function AdminLayoutPage() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, Admin</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Authenticated:</strong> {user.isAuthenticated ? "Yes" : "No"}</p>
    </div>
  );
}