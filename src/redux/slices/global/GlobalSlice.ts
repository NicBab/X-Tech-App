import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalState } from "./GlobalTypes";

const initialState: GlobalState = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const {
  setIsSidebarCollapsed,
  toggleSidebar,
  setIsDarkMode,
  toggleDarkMode,
} = globalSlice.actions;

export default globalSlice.reducer;


// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface InitialStateTypes {
//   isSidebarCollapsed: boolean;
//   isDarkMode: boolean;
// }

// const initialState: InitialStateTypes = {
//   isSidebarCollapsed: false,
//   isDarkMode: false,
// };

// export const globalSlice = createSlice({
//   name: "global",
//   initialState,
//   reducers: {
//     setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
//       state.isSidebarCollapsed = action.payload;
//     },
//     setIsDarkMode: (state, action: PayloadAction<boolean>) => {
//       state.isDarkMode = action.payload;
//     },
//   },
// });

// export const { setIsSidebarCollapsed, setIsDarkMode } = globalSlice.actions;

// export default globalSlice.reducer;