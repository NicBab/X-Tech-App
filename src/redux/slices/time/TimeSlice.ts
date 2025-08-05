import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TimeEntryGroup } from "./TimeTypes";

interface TimeState {
  entries: TimeEntryGroup[];
}

const initialState: TimeState = {
  entries: [],
};

const TimeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setTimeEntries: (state, action: PayloadAction<TimeEntryGroup[]>) => {
      state.entries = action.payload;
    },
    addTimeEntry: (state, action: PayloadAction<TimeEntryGroup>) => {
      state.entries.push(action.payload);
    },
    updateTimeEntry: (state, action: PayloadAction<TimeEntryGroup>) => {
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
  setTimeEntries,
  addTimeEntry,
  updateTimeEntry,
  deleteTimeEntry,
  resetTimeEntries,
} = TimeSlice.actions;

export default TimeSlice.reducer;
