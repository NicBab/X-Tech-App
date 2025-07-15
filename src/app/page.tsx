import Image from "next/image";
import DLRForm from "./(components)/Forms/DLRForm";
import Login from "./(components)/Forms/Login"
import Register from "./(components)/Forms/Register"
import DLRTable from "./(components)/Tables/DLRTable"
import UsersTable from "./(components)/Tables/UsersTable"
import TimeEntryForm from "./(components)/Forms/TimeEntryForm"
import DraftTimeEntries from "./(components)/Tables/DraftTimeEntries"
import DraftDLRsTable from "./(components)/Tables/DraftDLRsTable"


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-10 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center">

        <Login/>
        <Register/>
        <DLRForm/>
        <DraftDLRsTable/>
        <TimeEntryForm/>
        <DraftTimeEntries/>
        <DLRTable/>
        <UsersTable/>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
       
      </footer>
    </div>
  );
};


// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAppSelector } from "@/redux/hooks";

// export default function HomePage() {
//   const router = useRouter();
//   const role = useAppSelector((state) => state.user.role); // "admin" or "employee"

//   useEffect(() => {
//     if (role === "admin") {
//       router.push("/admin/dashboard");
//     } else if (role === "employee") {
//       router.push("/employee/dashboard");
//     }
//   }, [role, router]);

//   return null; // or loading spinner
// }
