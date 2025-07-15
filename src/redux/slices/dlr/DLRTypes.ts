export interface DLR {
  id: string;
  dlrNumber: string;
  jobNumber: string;
  date: string;
  hours: number;
  customer: string;
  employeeName: string;
  status: "Pending" | "Approved" | "Rejected";
  userId: string;
}