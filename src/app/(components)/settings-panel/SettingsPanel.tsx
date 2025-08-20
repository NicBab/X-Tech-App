// /app/(components)/Settings.tsx
"use client";

import React, { useState } from "react";
import Header from "@/app/(components)/Header";

type UserSetting = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const mockSettings: UserSetting[] = [
  { label: "Username", value: "john_doe", type: "text" },
  { label: "Email", value: "you@xtechnology-usa.com", type: "text" },
  { label: "Notification", value: true, type: "toggle" },
  { label: "Dark Mode", value: false, type: "toggle" },
  { label: "Language", value: "English", type: "text" },
];

interface SettingsProps {
  embedded?: boolean; // <- NEW
}

const Settings: React.FC<SettingsProps> = ({ embedded = false }) => {
  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
  };

  return (
    <div className="w-[500px]">
      {!embedded && <Header name="User Settings" />}
      <div className={`overflow-x-auto mt-5 shadow-md ${embedded ? "" : ""}`}>
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Setting</th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Value</th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr className="hover:bg-blue-50" key={setting.label}>
                <td className="py-2 px-4">{setting.label}</td>
                <td className="py-2 px-4">
                  {setting.type === "toggle" ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.value as boolean}
                        onChange={() => handleToggleChange(index)}
                      />
                      <div
                        className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                        transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-blue-600"
                      />
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingsCopy = [...userSettings];
                        settingsCopy[index].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;

// "use client";

// import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { useAppDispatch } from "@/redux/hooks";
// import { setIsDarkMode } from "@/redux/slices/global/GlobalSlice";

// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-hot-toast";

// import {
//   Card, CardContent, CardHeader, CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
// } from "@/components/ui/form";
// import { Switch } from "@/components/ui/switch";
// import { Separator } from "@/components/ui/separator";
// import { SheetClose } from "@/components/ui/sheet";

// // --- Swap to your real RTK endpoint import
// import { useUpdateUserMutation } from "@/redux/api/api"; // expects payload { name?, phoneNumber? }

// type SettingsPanelProps = {
//   embedded?: boolean; // when true, hide big page header & fit in Sheet
// };

// const FormSchema = z.object({
//   name: z.string().min(2, "Name is too short").max(100, "Name is too long"),
//   phoneNumber: z.string().optional(),
//   darkMode: z.boolean(),
// });

// const SettingsPanel: React.FC<SettingsPanelProps> = ({ embedded = false }) => {
//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   const user = useSelector((s: RootState) => s.user);
//   const isDarkMode = useSelector((s: RootState) => s.global.isDarkMode);

//   const [updateUser, { isLoading: saving }] = useUpdateUserMutation();

//   // Optional guard (keep your existing logic)
//   useEffect(() => {
//     if (!user.isAuthenticated || user.role !== "admin") {
//       router.push("/login");
//     }
//   }, [user.isAuthenticated, user.role, router]);

//   if (!user.isAuthenticated || user.role !== "admin") {
//     return <p className="text-white text-center mt-20">Redirecting...</p>;
//   }

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       name: user.name ?? "",
//       phoneNumber: user.phoneNumber ?? "",
//       darkMode: isDarkMode ?? false,
//     },
//     mode: "onBlur",
//   });

//   const onSubmit = async (values: z.infer<typeof FormSchema>) => {
//     try {
//       // 1) Persist profile updates
//       const payload = {
//         name: values.name,
//         phoneNumber: values.phoneNumber,
//       };
//       await updateUser(payload).unwrap();

//       // 2) Update dark mode via Redux (local preference)
//       dispatch(setIsDarkMode(values.darkMode));

//       // 3) If your user slice has an action to update the profile locally, do it here:
//       // dispatch(updateUserProfile(payload)); // <-- replace with your action if desired

//       toast.success("Settings saved");
//     } catch (err: any) {
//       console.error(err);
//       toast.error(err?.data?.message ?? "Failed to save settings");
//     }
//   };

//   return (
//     <div className="w-full">
//       {/* Top summary (your real user values) */}
//       <Card className={`shadow-sm ${embedded ? "border-0 bg-transparent" : ""}`}>
//         {!embedded && (
//           <CardHeader>
//             <CardTitle>User Settings</CardTitle>
//           </CardHeader>
//         )}
//         <CardContent className={embedded ? "pt-4" : ""}>
//           <div className="text-black p-0 md:p-2">
//             <p><strong>Name:</strong> {user.name}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Role:</strong> {user.role}</p>
//             <p><strong>Authenticated:</strong> {user.isAuthenticated ? "Yes" : "No"}</p>
//           </div>
//         </CardContent>
//       </Card>

//       <Separator className="my-4" />

//       {/* Editable preferences */}
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <Card className="shadow-sm">
//             <CardHeader>
//               <CardTitle>Profile</CardTitle>
//             </CardHeader>
//             <CardContent className="grid gap-4">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Display Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Your name" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div>
//                 <Label>Email (read-only)</Label>
//                 <Input value={user.email} disabled className="mt-1" />
//               </div>

//               <FormField
//                 control={form.control}
//                 name="phoneNumber"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Phone</FormLabel>
//                     <FormControl>
//                       <Input placeholder="e.g. 555-555-5555" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </CardContent>
//           </Card>

//           <Card className="shadow-sm">
//             <CardHeader>
//               <CardTitle>Preferences</CardTitle>
//             </CardHeader>
//             <CardContent className="grid gap-6">
//               <FormField
//                 control={form.control}
//                 name="darkMode"
//                 render={({ field }) => (
//                   <FormItem className="flex items-center justify-between space-y-0">
//                     <FormLabel className="text-base">Dark Mode</FormLabel>
//                     <FormControl>
//                       <Switch checked={field.value} onCheckedChange={field.onChange} />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               {/* Add more toggles (e.g., notifications) here if/when you have a backing field */}
//             </CardContent>
//           </Card>

//           <div className="flex items-center justify-end gap-2">
//             {/* If this is inside a Sheet, this will close it */}
//             <SheetClose asChild>
//               <Button variant="outline" type="button">Close</Button>
//             </SheetClose>
//             <Button type="submit" disabled={saving}>
//               {saving ? "Saving..." : "Save changes"}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default SettingsPanel;

