// redux/slices/dlr/DLRTypes.ts
export type DLRStatus = "DRAFT" | "PENDING" | "APPROVED" | "REJECTED" | "REVIEW";

export interface DLRUser {
  userId: string;
  name: string;
  email?: string | null;
}

export interface DLR {
  dlrId: string;
  dlrNumber: string;
  jobNumber: string;
  date: string;         // ISO
  userId: string;
  customer: string;
  notes?: string | null;
  status: DLRStatus;
  totalHours: number;
  fuel?: number | null;
  hotel?: number | null;
  mileage?: number | null;
  otherExpenses?: string | null; // JSON string of extra buckets
  fileUrl?: string | null;
  signedUrl?: string | null;
  createdAt: string;

  // optional relations when included by the API
  user?: DLRUser | null;
  invoiceId?: string | null;
  poId?: string | null;
  invoice?: any | null;
  po?: any | null;
}

export interface UpsertDLRDTO {
  // For create, omit id; for update, pass id separately in the mutation arg
  dlrNumber?: string;
  jobNumber: string;
  date: string; // "yyyy-MM-dd" is fine
  userId: string;
  customer?: string; // drafts may omit
  notes?: string;
  status?: DLRStatus;  // "DRAFT" or "PENDING"
  totalHours?: number; // 0 for drafts is OK
  fuel?: number;
  hotel?: number;
  mileage?: number;
  otherExpenses?: string; // JSON string
  fileUrl?: string;
  signedUrl?: string;
  invoiceId?: string | null;
  poId?: string | null;
}
