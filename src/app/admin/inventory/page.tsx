"use client";

import InventoryTable from "@/app/(components)/Tables/InventoryTable";

export default function InventoryPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6"></div>
      <InventoryTable />
    </div>
  );
}
