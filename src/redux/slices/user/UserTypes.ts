export type Role = "admin" | "employee" | null;
export type Status = "active" | "inactive";
export interface BaseUser {
  userId: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: Role;
  status: Status;
}
export interface UserState extends BaseUser {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  token?: string | null;
}
