import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DLR } from "@/redux/slices/dlr/DLRTypes"
import { BaseUser } from "@/redux/slices/user/UserTypes";

export type User = BaseUser;
export interface Product {
  productId: string;
  mfr: string;
  sku: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface NewProduct {
  name: string;
  mfr: string;
  sku: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

// export interface User {
//   userId: string;
//   name: string;
//   email: string;
// }

// export interface DLR {
//   dlrId: string;
//   jobNumber: string;
//   employeeName: string;
//   date: string;
//   customer: string;
//   status: "Pending" | "Approved" | "Rejected" | "Review";
//   userId: string;
// }

export interface NewDLR {
  jobNumber: string;
  employeeName: string;
  date: string;
  customer: string;
  status: "Pending" | "Approved" | "Rejected" | "Review";
  userId: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
  }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Users", "DLRs", "Expenses"],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    getUsers: build.query<User[], string | void>({
      query: (search) => ({
        url: "/users",
        params: search ? { search } : {},
      }),
      providesTags: ["Users"],
    }),

   getDLRs: build.query<DLR[], string | void>({
      query: (search) => ({
        url: "/dlrs",
        params: search ? { search } : {},
      }),
      providesTags: ["DLRs"],
    }),

    createDLR: build.mutation<DLR, NewDLR>({
      query: (newDLR) => ({
        url: "/dlrs",
        method: "POST",
        body: newDLR,
      }),
      invalidatesTags: ["DLRs"],
    }),

    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetDLRsQuery,
  useCreateDLRMutation,
  useGetExpensesByCategoryQuery,
} = api;
