// redux/slices/time/TimeDTOs.ts
export type EntryStatusDTO = "DRAFT" | "SUBMITTED";

export interface TimeEntryJobUpsertDTO {
  jobNumber: string;
  hoursWorked: number;
  comments?: string;      // omit if empty
  mileage?: number;       // omit if not used
  extraExpenses?: string; // omit if not used
}

export interface UpsertTimeEntryDTO {
  id?: string; // present when editing an existing draft
  userId: string;
  date: string;           // ISO "yyyy-MM-dd"
  weekEndingDate: string; // ISO "yyyy-MM-dd"
  status: EntryStatusDTO;
  notes?: string;         // omit if empty
  jobs: TimeEntryJobUpsertDTO[];
}
