"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { ClockIcon } from "lucide-react";

interface JobEntry {
  jobNumber: string;
  startTime: string;
  endTime: string;
  notes: string;
}

export default function TimeEntryForm() {
  const [date, setDate] = useState<string>("2025-07-08");
  const [status, setStatus] = useState<"draft" | "submitted">("draft");
  const [jobs, setJobs] = useState<JobEntry[]>([
    { jobNumber: "", startTime: "", endTime: "", notes: "" },
  ]);

  const weekEnd = format(endOfWeek(new Date(date), { weekStartsOn: 1 }), "yyyy-MM-dd");

  const getDurationInHours = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const startDate = new Date(0, 0, 0, sh, sm);
    const endDate = new Date(0, 0, 0, eh, em);
    const diff = (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60;
    return diff > 0 ? diff : 0;
  };

  const totalHours = jobs.reduce(
    (sum, job) => sum + getDurationInHours(job.startTime, job.endTime),
    0
  );

  const handleChange = (
    index: number,
    field: keyof JobEntry,
    value: string
  ) => {
    const updated = [...jobs];
    updated[index][field] = value;
    setJobs(updated);
  };

  const handleAddJob = () => {
    setJobs([...jobs, { jobNumber: "", startTime: "", endTime: "", notes: "" }]);
  };

  const handleRemoveJob = (index: number) => {
    const updated = [...jobs];
    updated.splice(index, 1);
    setJobs(updated);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border rounded-xl shadow-md space-y-6 dark:bg-zinc-900 dark:border-zinc-700 mt-20">
      <h2 className="text-2xl font-bold text-center">Employee Time Entry</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input disabled value={`Week Ending: ${weekEnd}`} />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Jobs for the Day</h3>
        {jobs.map((job, index) => (
          <div key={index} className="border rounded-md p-4 space-y-3 bg-gray-50 dark:bg-zinc-800">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                placeholder="Job Number"
                value={job.jobNumber}
                onChange={(e) => handleChange(index, "jobNumber", e.target.value)}
              />
              <div className="relative">
                <ClockIcon className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="time"
                  placeholder="Start Time"
                  value={job.startTime}
                  onChange={(e) => handleChange(index, "startTime", e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <ClockIcon className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="time"
                  placeholder="End Time"
                  value={job.endTime}
                  onChange={(e) => handleChange(index, "endTime", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Textarea
              placeholder="Optional notes for this job..."
              value={job.notes}
              onChange={(e) => handleChange(index, "notes", e.target.value)}
            />

            <div className="flex justify-between items-center pt-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Hours: {getDurationInHours(job.startTime, job.endTime).toFixed(2)}
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveJob(index)}
              >
                Remove Job
              </Button>
            </div>
          </div>
        ))}
        <Button onClick={handleAddJob}>+ Add Another Job</Button>
      </div>

      <div className="text-right text-sm font-semibold">
        Total Hours: {totalHours.toFixed(2)} hrs
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="secondary" onClick={() => setStatus("draft")}>
          Save Draft
        </Button>
        <Button onClick={() => setStatus("submitted")}>Submit</Button>
      </div>
    </div>
  );
}