import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./UserTypes";
import { loginUser, fetchUser } from "./UserThunks";

const initialState: UserState = {
  userId: null,
  name: "",
  email: "",
  phoneNumber: "",
  role: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.userId = null;
      state.name = "";
      state.email = "";
      state.phoneNumber = "";
      state.role = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      Object.assign(state, action.payload, {
         role: action.payload.role?.toLowerCase() as "admin" | "employee",
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserState>) => {
        Object.assign(state, action.payload, {
          role: action.payload.role?.toLowerCase() as "admin" | "employee",
          isAuthenticated: true,
          loading: false,
          error: null,
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserState>) => {
        Object.assign(state, action.payload, { isAuthenticated: true });
      });
  },
});

export const { logoutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
