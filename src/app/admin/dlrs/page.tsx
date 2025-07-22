import DLRTable from "@/app/(components)/Tables/DLRTable";

export default function AdminDLRsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
      </div>
      <DLRTable role="admin" currentUserId="admin-123" />
    </div>
  )
}
