export interface UserState {
  userId: string | null;
  name: string;
  email: string;
  role: "admin" | "user" | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}