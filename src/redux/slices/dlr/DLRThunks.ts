import { AppDispatch } from "@/redux/store";
import {
  setDLRLoading,
  setDLRError,
  setSubmittedDLRs,
} from "./DLRSlice";
import { DLR } from "./DLRTypes";

// Simulated async fetch for submitted DLRs
export const fetchSubmittedDLRs = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setDLRLoading(true));

    // Simulate delay / mock data
    const response = await new Promise<DLR[]>((resolve) =>
      setTimeout(() => {
        resolve([
          {
            id: "1",
            dlrNumber: "DLR-001",
            jobNumber: "XT-2025-001",
            date: "2025-07-08",
            hours: 8,
            customer: "Talos",
            employeeName: "Nick Babineaux",
            status: "Pending",
            userId: "user-123",
          },
        ]);
      }, 500)
    );

    dispatch(setSubmittedDLRs(response));
    dispatch(setDLRLoading(false));
  } catch (err) {
    dispatch(setDLRError("Failed to fetch submitted DLRs"));
    dispatch(setDLRLoading(false));
  }
};