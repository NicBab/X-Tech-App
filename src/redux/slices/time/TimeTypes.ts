export interface JobEntry {
  jobNumber: string;
  hours: number;
  notes?: string;
  miles?: number;
  expenses?: number;
}

export interface TimeEntry {
  id: string;
  userId: string;
  date: string;
  weekEnding: string;
  jobs: JobEntry[];
  totalHours: number;
  status: "draft" | "submitted";
}