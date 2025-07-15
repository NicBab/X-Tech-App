import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userId: string | null;
  name: string;
  role: "admin" | "employee" | null;
}

const initialState: UserState = {
  userId: null,
  name: "",
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ userId: string; name: string; role: "admin" | "employee" }>
    ) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
    clearUser: (state) => {
      state.userId = null;
      state.name = "";
      state.role = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;