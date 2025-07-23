import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DLR } from "./DLRTypes";

interface DLRState {
  draftDLRs: DLR[];
  submittedDLRs: DLR[];
  selectedDLR: DLR | null;
  loading: boolean;
  error: string | null;
}

const initialState: DLRState = {
  draftDLRs: [],
  submittedDLRs: [],
  selectedDLR: null,
  loading: false,
  error: null,
};

export const DLRSlice = createSlice({
  name: "dlr",
  initialState,
  reducers: {
    setDraftDLRs: (state, action: PayloadAction<DLR[]>) => {
      state.draftDLRs = action.payload;
    },
    addDraftDLR: (state, action: PayloadAction<DLR>) => {
      state.draftDLRs.push(action.payload);
    },
    removeDraftDLR: (state, action: PayloadAction<string>) => {
      state.draftDLRs = state.draftDLRs.filter((dlr) => dlr.dlrId !== action.payload);
    },
    setSubmittedDLRs: (state, action: PayloadAction<DLR[]>) => {
      state.submittedDLRs = action.payload;
    },
    setSelectedDLR: (state, action: PayloadAction<DLR | null>) => {
      state.selectedDLR = action.payload;
    },
    setDLRLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setDLRError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setDraftDLRs,
  addDraftDLR,
  removeDraftDLR,
  setSubmittedDLRs,
  setSelectedDLR,
  setDLRLoading,
  setDLRError,
} = DLRSlice.actions;

export default DLRSlice.reducer;