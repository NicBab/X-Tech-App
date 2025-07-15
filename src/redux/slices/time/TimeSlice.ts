import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface TimeState {
  entries: TimeEntry[];
}

const initialState: TimeState = {
  entries: [],
};

const TimeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    addTimeEntry: (state, action: PayloadAction<TimeEntry>) => {
      state.entries.push(action.payload);
    },
    updateTimeEntry: (state, action: PayloadAction<TimeEntry>) => {
      const index = state.entries.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    deleteTimeEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter((entry) => entry.id !== action.payload);
    },
    resetTimeEntries: (state) => {
      state.entries = [];
    },
  },
});

export const {
  addTimeEntry,
  updateTimeEntry,
  deleteTimeEntry,
  resetTimeEntries,
} = TimeSlice.actions;

export default TimeSlice.reducer;