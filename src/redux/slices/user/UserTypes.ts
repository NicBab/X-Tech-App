export interface UserState {
  userId: string | null;
  name: string;
  email: string;
  phoneNumber: string;
  role: "admin" | "user" | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  token?: string | null;
}
