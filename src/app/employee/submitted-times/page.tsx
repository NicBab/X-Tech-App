import SubmittedTimesTable from "@/app/(components)/Tables/SubmittedTimesTable";
import React from "react";

const SubmittedTimesPage = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6"></div>
      <SubmittedTimesTable />
    </div>
  );
};

export default SubmittedTimesPage;
