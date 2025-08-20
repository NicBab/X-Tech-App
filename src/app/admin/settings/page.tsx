import Settings from "@/app/(components)/settings-panel/SettingsPanel";
import React from "react";

const SettingsPage = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6"></div>
      <Settings />
    </div>
  );
};

export default SettingsPage;
