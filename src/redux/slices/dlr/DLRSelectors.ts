import { RootState } from "@/redux/store";

export const selectDraftDLRs = (state: RootState) => state.dlr.draftDLRs;
export const selectSubmittedDLRs = (state: RootState) => state.dlr.submittedDLRs;
export const selectSelectedDLR = (state: RootState) => state.dlr.selectedDLR;
export const selectDLRLoading = (state: RootState) => state.dlr.loading;
export const selectDLRError = (state: RootState) => state.dlr.error;