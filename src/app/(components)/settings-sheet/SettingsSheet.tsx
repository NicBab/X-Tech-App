// /app/(components)/Navbar/settings-sheet/SettingsSheet.tsx
"use client";

import * as React from "react";
import { Settings as SettingsIcon } from "lucide-react"; // <- alias the icon
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

// import your Settings page/component
import SettingsPanel from "@/app/(components)/settings-panel/SettingsPanel";

export default function SettingsSheet() {
  return (
    <Sheet>
      {/* Gear icon opens the sheet */}
      <SheetTrigger asChild>
        <button
          aria-label="Open settings"
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <SettingsIcon className="text-gray-500" size={24} />
        </button>
      </SheetTrigger>

      {/* Wider sheet + proper scrolling area */}
      <SheetContent
        side="right"
        className="p-0 w-[80vw] sm:max-w-[550px]"
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b">
            <SheetHeader>
              <SheetTitle>Admin Settings</SheetTitle>
              <SheetDescription>Update your preferences below.</SheetDescription>
            </SheetHeader>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {/* If you added the prop, use embedded; otherwise just <SettingsPanel /> */}
            <SettingsPanel embedded />
          </div>

          <div className="px-6 py-4 border-t flex justify-end gap-2">
            <Button type="button">Save changes</Button>
            <SheetClose asChild>
              <Button variant="outline" type="button">Close</Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
