import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "./UserTypes";

// Simulated login
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: { email: string; password: string }) => {
    // Replace this with actual login logic (e.g., API call)
    const mockUser: UserState = {
      userId: "123",
      name: "Nick Babineaux",
      email: credentials.email,
      phoneNumber: "",
      role: credentials.email === "admin@xtechnology-usa.com" ? "admin" : "employee",
      isAuthenticated: true,
      loading: false,
      error: null,
    
    };
    await new Promise((res) => setTimeout(res, 1000));
    return mockUser;
  }
);

// Simulated fetch current user
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  // Replace with real fetch call
  const user: UserState = {
    userId: "123",
    name: "Nick Babineaux",
    email: "nick@xtechnology-usa.com",
    phoneNumber: "3372579202",
    role: "admin",
    isAuthenticated: true,
    loading: false,
    error: null,
  };
  await new Promise((res) => setTimeout(res, 1000));
  return user;
});