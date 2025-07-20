"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayoutPage() {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user.isAuthenticated || user.role !== "admin") {
      router.push("/login");
    }
  }, [user.isAuthenticated, user.role]);

  if (!user.isAuthenticated || user.role !== "admin") {
    return <p className="text-white text-center mt-20">Redirecting...</p>;
  }

  return (
    <div className="min-h-screen text-black p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, Admin</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Authenticated:</strong> {user.isAuthenticated ? "Yes" : "No"}</p>
    </div>
  );
}
