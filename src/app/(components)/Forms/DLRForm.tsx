"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { Clock } from "lucide-react";

interface JobEntry {
  jobNumber: string;
  startTime: string;
  endTime: string;
  hours: number;
  notes: string;
}

export default function TimeEntryForm() {
  const [date, setDate] = useState<string>("2025-07-08");
  const [notes, setNotes] = useState<string>("");
  const [status, setStatus] = useState<"draft" | "submitted">("draft");
  const [jobs, setJobs] = useState<JobEntry[]>([
    { jobNumber: "", startTime: "", endTime: "", hours: 0, notes: "" },
  ]);

  const weekEnd = format(endOfWeek(new Date(date), { weekStartsOn: 1 }), "yyyy-MM-dd");

  const handleJobChange = (
    index: number,
    field: keyof JobEntry,
    value: string
  ) => {
    const updated = [...jobs];
    if (field === "hours") {
      updated[index][field] = parseFloat(value) || 0;
    } else {
      updated[index][field] = value;
    }
    setJobs(updated);
  };

  const handleAddJob = () => {
    setJobs([
      ...jobs,
      { jobNumber: "", startTime: "", endTime: "", hours: 0, notes: "" },
    ]);
  };

  const handleRemoveJob = (index: number) => {
    const updated = [...jobs];
    updated.splice(index, 1);
    setJobs(updated);
  };

  const totalHours = jobs.reduce((sum, job) => sum + job.hours, 0);

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

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Jobs for the Day</h3>
        {jobs.map((job, index) => (
          <div
            key={index}
            className="space-y-4 p-4 border rounded-md bg-zinc-50 dark:bg-zinc-800"
          >
            <Input
              placeholder="Job Number"
              value={job.jobNumber}
              onChange={(e) => handleJobChange(index, "jobNumber", e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="time"
                placeholder="Start Time"
                value={job.startTime}
                onChange={(e) => handleJobChange(index, "startTime", e.target.value)}
              />
              <Input
                type="time"
                placeholder="End Time"
                value={job.endTime}
                onChange={(e) => handleJobChange(index, "endTime", e.target.value)}
              />
            </div>
            <Textarea
              placeholder="Optional notes for this job..."
              value={job.notes}
              onChange={(e) => handleJobChange(index, "notes", e.target.value)}
            />
            <Button
              variant="destructive"
              onClick={() => handleRemoveJob(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button onClick={handleAddJob}>+ Add Job</Button>
      </div>

      <Textarea
        placeholder="Optional Overall Notes..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

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