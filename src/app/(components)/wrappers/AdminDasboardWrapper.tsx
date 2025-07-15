"use client";

import React, { useEffect } from "react";
import AdminNavbar from "@/app/(components)/Navbar/AdminNavbar";
import AdminSidebar from "@/app/(components)/Sidebar/AdminSidebar";
import StoreProvider from "@/redux/provider";
import { useAppSelector } from "@/redux/hooks";

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`flex w-full min-h-screen ${isDarkMode ? "dark" : "light"}`}>
      <AdminSidebar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 dark:bg-zinc-900 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <AdminNavbar />
        {children}
      </main>
    </div>
  );
};

const AdminDashboardWrapper = ({ children }: { children: React.ReactNode }) => (
  <StoreProvider>
    <AdminDashboardLayout>{children}</AdminDashboardLayout>
  </StoreProvider>
);

export default AdminDashboardWrapper;