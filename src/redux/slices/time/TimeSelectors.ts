import { RootState } from "@/redux/store";

export const selectTimeEntries = (state: RootState) => state.time.entries;

export const selectSubmittedTimeEntries = (state: RootState) =>
  state.time.entries.filter((entry) => entry.status === "SUBMITTED");

export const selectDraftTimeEntries = (state: RootState) =>
  state.time.entries.filter((entry) => entry.status === "DRAFT");
