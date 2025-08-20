import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DLR } from "./DLRTypes";
import { api } from "@/redux/api/api";

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

// helpers
const upsert = (arr: DLR[], item: DLR) => {
  const i = arr.findIndex((x) => x.dlrId === item.dlrId);
  if (i >= 0) arr[i] = item;
  else arr.unshift(item);
};
const removeById = (arr: DLR[], id: string) => arr.filter((x) => x.dlrId !== id);
const syncBuckets = (state: DLRState, dlr: DLR) => {
  // remove from both, then add to the correct bucket
  state.draftDLRs = removeById(state.draftDLRs, dlr.dlrId);
  state.submittedDLRs = removeById(state.submittedDLRs, dlr.dlrId);
  if (dlr.status === "DRAFT") upsert(state.draftDLRs, dlr);
  else upsert(state.submittedDLRs, dlr); // PENDING/APPROVED/REJECTED/REVIEW treated as "submitted" bucket
};

export const DLRSlice = createSlice({
  name: "dlr",
  initialState,
  reducers: {
    setDraftDLRs: (state, action: PayloadAction<DLR[]>) => {
      state.draftDLRs = action.payload;
    },
    addDraftDLR: (state, action: PayloadAction<DLR>) => {
      upsert(state.draftDLRs, action.payload);
    },
    removeDraftDLR: (state, action: PayloadAction<string>) => {
      state.draftDLRs = removeById(state.draftDLRs, action.payload);
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
  extraReducers: (builder) => {
    // Detail fetch → keep selectedDLR fresh
    builder.addMatcher(
      api.endpoints.getDLRById.matchFulfilled,
      (state, { payload }) => {
        state.selectedDLR = payload;
        syncBuckets(state, payload);
      }
    );

    // Create (draft or submit)
    builder.addMatcher(
      api.endpoints.createDLR.matchFulfilled,
      (state, { payload }) => {
        syncBuckets(state, payload);
        state.selectedDLR = payload;
      }
    );

    // Update draft (may flip to submitted)
    builder.addMatcher(
      api.endpoints.updateDLR.matchFulfilled,
      (state, { payload }) => {
        syncBuckets(state, payload);
        state.selectedDLR = payload;
      }
    );

    // Submit draft → submitted bucket
    builder.addMatcher(
      api.endpoints.submitDLR.matchFulfilled,
      (state, { payload }) => {
        syncBuckets(state, payload);
        state.selectedDLR = payload;
      }
    );

    // Delete draft
    builder.addMatcher(
      api.endpoints.deleteDLR.matchFulfilled,
      (state, { meta }) => {
        // originalArgs is the dlrId
         const id = ((meta as any)?.arg?.originalArgs ?? "") as string;
        state.draftDLRs = removeById(state.draftDLRs, id);
        // if allow deleting non-drafts later, remove from submitted as well:
        state.submittedDLRs = removeById(state.submittedDLRs, id);
        if (state.selectedDLR?.dlrId === id) state.selectedDLR = null;
      }
    );

    // Optional: track loading/error for mutations
    builder.addMatcher(
      (action) =>
        action.type.startsWith(`${api.reducerPath}/executeMutation`) &&
        action.meta?.arg?.endpointName?.match(/(createDLR|updateDLR|submitDLR|deleteDLR)/),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      (action) =>
        action.type.endsWith("/rejected") &&
        action.meta?.arg?.endpointName?.match(/(createDLR|updateDLR|submitDLR|deleteDLR)/),
      (state, action: any) => {
        state.loading = false;
        state.error = action?.error?.message ?? "Request failed";
      }
    );
    builder.addMatcher(
      (action) =>
        action.type.endsWith("/fulfilled") &&
        action.meta?.arg?.endpointName?.match(/(createDLR|updateDLR|submitDLR|deleteDLR)/),
      (state) => {
        state.loading = false;
        state.error = null;
      }
    );
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
