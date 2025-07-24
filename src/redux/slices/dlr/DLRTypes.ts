export interface DLR {
  dlrId: string;
  dlrNumber: string;
  jobNumber: string;
  date: string;
  customer: string;
  notes?: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "REVIEW";
  totalHours: number;
  fuel?: number;
  hotel?: number;
  mileage?: number;
  otherExpenses?: string;
  fileUrl?: string;
  signedUrl?: string;
  createdAt: string;
  userId: string;
  invoiceId?: string;
  poId?: string;
  user?: {
    name: string;
  };
}