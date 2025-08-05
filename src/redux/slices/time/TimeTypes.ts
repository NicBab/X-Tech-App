export interface TimeEntryJob {
  id: string;
  groupId: string;
  jobNumber: string;
  hoursWorked: number;
  comments?: string;
  mileage?: number;
  extraExpenses?: string;
}

export interface TimeEntryGroup {
  id: string;
  userId: string;
  date: string; // or Date, depending on usage
  weekEndingDate: string;
  status: "DRAFT" | "SUBMITTED";
  notes?: string;
  jobs: TimeEntryJob[];
  user?: {
    name: string;
  };
}
