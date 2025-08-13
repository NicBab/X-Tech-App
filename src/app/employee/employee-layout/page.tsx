"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import CardPopularProducts from "./CardPopularProducts";
// import CardSalesSummary from "./CardSalesSummary";
// import CardPurchaseSummary from "./CardPurchseSummary";
// import CardExpenseSummary from "./CardExpenseSummary";
// import StatCard from "./StatCard";
import { CheckCircle, Package, Tag, TrendingDown, TrendingUp } from "lucide-react";

export default function EmployeeLayoutPage() {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user.isAuthenticated || user.role !== "employee") {
      router.push("/login");
    }
  }, [user.isAuthenticated, user.role]);

  if (!user.isAuthenticated || user.role !== "employee") {
    return <p className="text-white text-center mt-20">Redirecting...</p>;
  }

  return (
    <>
    <div className="text-black p-8">
      <h1 className="text-3xl font-bold mb-4">{`Welcome ${user.name}`}</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Authenticated:</strong> {user.isAuthenticated ? "Yes" : "No"}</p>
    </div>
     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      {/* <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <CardExpenseSummary />
      <StatCard
        title="Customer & Expenses"
        primaryIcon={<Package className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Customer Growth",
            amount: "175.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Expenses",
            amount: "10.00",
            changePercentage: -56,
            IconComponent: TrendingDown,
          },
        ]}
      /> */}
      {/* <StatCard
        title="Dues & Pending Orders"
        primaryIcon={<CheckCircle className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Dues",
            amount: "250.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Pending Orders",
            amount: "147",
            changePercentage: -56,
            IconComponent: TrendingDown,
          },
        ]}
      /> */}
      {/* <StatCard
        title="Sales & Discount"
        primaryIcon={<Tag className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 October 2023"
        details={[
          {
            title: "Sales",
            amount: "1000.00",
            changePercentage: 20,
            IconComponent: TrendingUp,
          },
          {
            title: "Discount",
            amount: "200.00",
            changePercentage: -10,
            IconComponent: TrendingDown,
          },
        ]}
      /> */}
    </div>
    </>
    
  );
}
