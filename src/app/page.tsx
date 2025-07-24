"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useHasHydrated } from "@/redux/useHasHydrated";

export default function Home() {
  const router = useRouter();
  const role = useAppSelector((state) => state.user.role);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const hasHydrated = useHasHydrated();

  useEffect(() => {
    if (!hasHydrated) return;

    if (!isAuthenticated) {
      router.push("/login");
    } else if (role === "admin") {
      router.push("/admin/admin-layout");
    } else if (role === "employee") {
      router.push("/employee/employee-layout");
    }
  }, [hasHydrated, role, isAuthenticated, router]);

  return null;
}



// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAppSelector } from "@/redux/hooks";

// export default function Home() {
//   const router = useRouter();
//   const { role, isAuthenticated } = useAppSelector((state) => state.user);

//   useEffect(() => {
//     // Delay just enough for Redux Persist to hydrate state
//     const timeout = setTimeout(() => {
//       if (role === "admin" && isAuthenticated) {
//         router.replace("/admin/admin-layout");
//       } else if (role === "employee" && isAuthenticated) {
//         router.replace("/employee/employee-layout");
//       } else {
//         router.replace("/login");
//       }
//     }, 200); // 200ms is enough for hydration

//     return () => clearTimeout(timeout);
//   }, [role, isAuthenticated, router]);

//   return <div className="p-8">Redirecting...</div>;
// }
