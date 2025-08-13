import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DLR } from "@/redux/slices/dlr/DLRTypes";
import { BaseUser } from "@/redux/slices/user/UserTypes";
import { TimeEntryGroup } from "../slices/time/TimeTypes";
import { UpsertTimeEntryDTO } from "../slices/time/TimeDTO";

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
  tagTypes: [
    "DashboardMetrics",
    "Products",
    "Users",
    "DLRs",
    "TimeEntries",
    "Expenses",
  ],
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

    getTimeEntries: build.query<
      TimeEntryGroup[],
      { userId: string; role: string; status?: string }
    >({
      query: ({ userId, role, status }) => ({
        url: "/times",
        params: { userId, role, ...(status && { status }) },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((g) => ({
                type: "TimeEntries" as const,
                id: g.id,
              })),
              { type: "TimeEntries" as const, id: "LIST" },
            ]
          : [{ type: "TimeEntries" as const, id: "LIST" }],
    }),

    // Create or update draft (also supports immediate submit via status)
    upsertTimeEntry: build.mutation<TimeEntryGroup, UpsertTimeEntryDTO>({
      query: (body) => ({
        url: "/times",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "TimeEntries", id: "LIST" }],
    }),

    // Submit an existing draft
    submitTimeEntry: build.mutation<TimeEntryGroup, string>({
      query: (id) => ({
        url: `/times/${id}/submit`,
        method: "PATCH",
      }),
      invalidatesTags: (res, err, id) => [
        { type: "TimeEntries", id },
        { type: "TimeEntries", id: "LIST" },
      ],
    }),

    // Delete a draft
    deleteTimeEntry: build.mutation<void, string>({
      query: (id) => ({
        url: `/times/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (res, err, id) => [
        { type: "TimeEntries", id },
        { type: "TimeEntries", id: "LIST" },
      ],
    }),

    getTimeEntryById: build.query<TimeEntryGroup, string>({
      query: (id) => `/times/${id}`,
      providesTags: (result, error, id) => [{ type: "TimeEntries", id }],
    }),

    updateTimeEntry: build.mutation<
      TimeEntryGroup,
      { id: string } & Omit<UpsertTimeEntryDTO, "id">
    >({
      query: ({ id, ...body }) => ({
        url: `/times/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (res, err, arg) => [
        { type: "TimeEntries", id: arg.id },
        { type: "TimeEntries", id: "LIST" },
      ],
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
  //DLRs
  useGetUsersQuery,
  useGetDLRsQuery,
  useCreateDLRMutation,
  //TIMES
  useGetTimeEntriesQuery,
  useUpsertTimeEntryMutation,
  useSubmitTimeEntryMutation,
  useDeleteTimeEntryMutation,
  useGetTimeEntryByIdQuery,
  useUpdateTimeEntryMutation,
  //EXPENSES
  useGetExpensesByCategoryQuery,
} = api;
