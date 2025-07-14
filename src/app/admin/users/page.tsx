"use client";

import UsersTable from "@/app/(components)/Tables/UsersTable";
import Header from "@/app/(components)/Header";

export default function UsersPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Header name="Users" />
      </div>
      <UsersTable />
    </div>
  );
}