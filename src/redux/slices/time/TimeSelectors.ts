import { RootState } from "@/redux/store";
import { TimeEntry } from "./TimeTypes";

export const selectAllTimeEntries = (state: RootState) => state.time.entries;

export const selectTimeEntryById = (id: string) => (state: RootState) =>
  state.time.entries.find((entry: TimeEntry) => entry.id === id);

export const selectTimeEntriesByUser = (userId: string) => (state: RootState) =>
  state.time.entries.filter((entry: TimeEntry) => entry.userId === userId);