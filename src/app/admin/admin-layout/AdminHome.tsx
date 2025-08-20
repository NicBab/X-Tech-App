// "use client";

// import React, { useMemo } from "react";
// import Link from "next/link";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   FileText,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Plus,
//   TrendingUp,
// } from "lucide-react";

// // RTK Query hooks (adjust import paths to your project)
// import {
//   useGetMeQuery,
// } from "@/redux/api/api"; // e.g., auth/me
// import {
//   useGetDLRsQuery,
// } from "@/redux/api/api"; // e.g., dlrs?created_by=
// import {
//   useGetTimeEntriesQuery,
// } from "@/redux/api/api"; // e.g., time-entries?created_by=

// // Types you likely already have
// type DlrStatus = "draft" | "submitted" | "approved" | "rejected";
// interface DLR {
//   id: string;
//   job_number: string;
//   status: DlrStatus;
//   description?: string;
//   date: string;
//   hours_worked?: number;
//   created_by: string;
// }
// interface TimeEntry {
//   id: string;
//   date: string; // ISO
//   status: "draft" | "submitted";
//   total_hours?: number;
//   created_by: string;
// }
// interface Me {
//   email: string;
//   full_name?: string;
// }

// // Helpers
// const startOfThisWeek = (d = new Date()) => {
//   const copy = new Date(d);
//   const day = copy.getDay(); // 0=Sun..6=Sat
//   copy.setHours(0, 0, 0, 0);
//   copy.setDate(copy.getDate() - day); // Sunday as start
//   return copy;
// };

// export default function DashboardHome() {
//   // 1) Current user
//   const { data: me, isLoading: meLoading } = useGetMeQuery({});
//   const userEmail = me?.email ?? "";

//   // 2) Load DLRs & Time entries for this user
//   //    If your API expects query params, you can pass them via hook args or selectFromResult.
//   const {
//     data: allDLRs = [],
//     isLoading: dlrLoading,
//     isFetching: dlrFetching,
//   } = useGetDLRsQuery(
//     userEmail ? { created_by: userEmail, limit: 100 } : { skip: true } as any,
//     { skip: !userEmail }
//   );

//   const {
//     data: timeEntries = [],
//     isLoading: teLoading,
//     isFetching: teFetching,
//   } = useGetTimeEntriesQuery(
//     userEmail ? { created_by: userEmail, limit: 200 } : { skip: true } as any,
//     { skip: !userEmail }
//   );

//   const loading = meLoading || dlrLoading || teLoading || dlrFetching || teFetching;

//   // 3) Derive stats
//   const { draftDLRs, submittedDLRs, rejectedDLRs, thisWeekHours, recentDLRs } =
//     useMemo(() => {
//       const draft = allDLRs.filter((d: DLR) => d.status === "draft").length;
//       const submitted = allDLRs.filter((d: DLR) => d.status === "submitted").length;
//       const rejected = allDLRs.filter((d: DLR) => d.status === "rejected").length;

//       const weekStart = startOfThisWeek();
//       const hours = (timeEntries as TimeEntry[])
//         .filter(
//           (t) =>
//             new Date(t.date) >= weekStart &&
//             t.status === "submitted" &&
//             t.created_by === userEmail
//         )
//         .reduce((sum, t) => sum + (t.total_hours || 0), 0);

//       // Sort newest first (assumes d.date exists)
//       const recent = [...(allDLRs as DLR[])]
//         .sort((a, b) => +new Date(b.date) - +new Date(a.date))
//         .slice(0, 5);

//       return {
//         draftDLRs: draft,
//         submittedDLRs: submitted,
//         rejectedDLRs: rejected,
//         thisWeekHours: hours,
//         recentDLRs: recent,
//       };
//     }, [allDLRs, timeEntries, userEmail]);

//   if (loading) {
//     return (
//       <div className="p-6">
//         <div className="animate-pulse space-y-6 max-w-7xl mx-auto">
//           <div className="h-8 bg-gray-200 rounded w-64" />
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="h-32 bg-gray-200 rounded-xl" />
//             ))}
//           </div>
//           <div className="h-64 bg-gray-200 rounded-xl" />
//         </div>
//       </div>
//     );
//   }

//   const firstName =
//     me?.full_name?.trim()?.split(" ")?.[0] || me?.email?.split("@")?.[0] || "User";

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">
//               Welcome back, {firstName}
//             </h1>
//             <p className="text-gray-600 mt-1">Here&apos;s your work overview</p>
//           </div>
//           <div className="flex gap-3">
//             {/* Adjust these routes to your actual app paths */}
//             <Link href="/employee/time-entry">
//               <Button className="bg-green-600 hover:bg-green-700">
//                 <Clock className="w-4 h-4 mr-2" />
//                 Clock In/Out
//               </Button>
//             </Link>
//             <Link href="/employee/dlrs/new">
//               <Button className="bg-blue-600 hover:bg-blue-700">
//                 <Plus className="w-4 h-4 mr-2" />
//                 New DLR
//               </Button>
//             </Link>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
//             <CardHeader className="pb-2">
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-sm font-medium text-blue-700">
//                   Draft DLRs
//                 </CardTitle>
//                 <FileText className="w-5 h-5 text-blue-600" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-blue-900">{draftDLRs}</div>
//               <p className="text-xs text-blue-600 mt-1">Need to be submitted</p>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
//             <CardHeader className="pb-2">
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-sm font-medium text-green-700">
//                   Submitted DLRs
//                 </CardTitle>
//                 <CheckCircle className="w-5 h-5 text-green-600" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-green-900">{submittedDLRs}</div>
//               <p className="text-xs text-green-600 mt-1">Awaiting approval</p>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
//             <CardHeader className="pb-2">
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-sm font-medium text-red-700">
//                   Rejected DLRs
//                 </CardTitle>
//                 <AlertCircle className="w-5 h-5 text-red-600" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-red-900">{rejectedDLRs}</div>
//               <p className="text-xs text-red-600 mt-1">Need attention</p>
//             </CardContent>
//           </Card>

//           <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
//             <CardHeader className="pb-2">
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-sm font-medium text-purple-700">
//                   This Week
//                 </CardTitle>
//                 <TrendingUp className="w-5 h-5 text-purple-600" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-purple-900">
//                 {thisWeekHours.toFixed(1)}h
//               </div>
//               <p className="text-xs text-purple-600 mt-1">Hours logged</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent DLRs */}
//         <Card className="bg-white shadow-sm">
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <CardTitle className="text-xl font-semibold">
//                 Recent Daily Reports
//               </CardTitle>
//               <Link href="/employee/dlrs">
//                 <Button variant="outline" size="sm">View All</Button>
//               </Link>
//             </div>
//           </CardHeader>
//           <CardContent>
//             {recentDLRs.length === 0 ? (
//               <div className="text-center py-8 text-gray-500">
//                 <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
//                 <p>No daily reports yet</p>
//                 <Link href="/employee/dlrs" className="text-blue-600 hover:underline">
//                   Create your first DLR
//                 </Link>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {recentDLRs.map((dlr: DLR) => (
//                   <div
//                     key={dlr.id}
//                     className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                   >
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3">
//                         <h3 className="font-medium text-gray-900">Job #{dlr.job_number}</h3>
//                         <span
//                           className={[
//                             "px-2 py-1 text-xs font-medium rounded-full",
//                             dlr.status === "approved"
//                               ? "bg-green-100 text-green-800"
//                               : dlr.status === "rejected"
//                               ? "bg-red-100 text-red-800"
//                               : dlr.status === "submitted"
//                               ? "bg-blue-100 text-blue-800"
//                               : "bg-gray-100 text-gray-800",
//                           ].join(" ")}
//                         >
//                           {dlr.status}
//                         </span>
//                       </div>
//                       {dlr.description && (
//                         <p className="text-sm text-gray-600 mt-1">{dlr.description}</p>
//                       )}
//                       <p className="text-xs text-gray-500 mt-1">
//                         {new Date(dlr.date).toLocaleDateString()} • {dlr.hours_worked ?? 0}h
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
