// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { TimeEntry } from "./TimeTypes";

// // Optional: Pass userId if filtering server-side
// export const fetchTimeEntries = createAsyncThunk(
//   "time/fetchTimeEntries",
//   async (userId?: string | null) => {
//     const res = await axios.get<TimeEntry[]>(
//       userId ? `/api/times?userId=${userId}` : "/api/times"
//     );
//     return res.data;
//   }
// );
