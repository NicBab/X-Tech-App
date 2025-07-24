"use client";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardWrapper from "@/app/(components)/wrappers/DashboardWrapper";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { role, isAuthenticated } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (hydrated && (!isAuthenticated || role !== "admin")) {
      router.replace("/login");
    }
  }, [role, isAuthenticated, hydrated, router]);

  if (!hydrated || !isAuthenticated || role !== "admin") {
    return <div className="p-8">Redirecting...</div>;
  }
  return <DashboardWrapper>{children}</DashboardWrapper>;
}