"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format, endOfWeek } from "date-fns";
import { ClockIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { useUpsertTimeEntryMutation, useUpdateTimeEntryMutation, } from "@/redux/api/api";
import { useAppSelector } from "@/redux/hooks";
import { TimeEntryGroup } from "@/redux/slices/time/TimeTypes";
import { UpsertTimeEntryDTO } from "@/redux/slices/time/TimeDTO";

interface JobEntry {
  jobNumber: string;
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
  notes: string;
  // show existing hours when editing
  existingHours?: number;
}

export default function TimeEntryForm({
  initialGroup,
  editingId,
  onDone,
}: {
  initialGroup?: TimeEntryGroup;
  editingId?: string;
  onDone?: () => void;
}) {
  const userId = useAppSelector((s) => s.user.userId) ?? "";

  const [date, setDate] = useState<string>(initialGroup ? format(new Date(initialGroup.date), "yyyy-MM-dd") : "2025-07-08");
  const [jobs, setJobs] = useState<JobEntry[]>([
    { jobNumber: "", startTime: "", endTime: "", notes: "" },
  ]);


  useEffect(() => {
    if (initialGroup) {
      setDate(format(new Date(initialGroup.date), "yyyy-MM-dd"));
      setJobs(
        (initialGroup.jobs ?? []).map((j) => ({
          jobNumber: j.jobNumber,
          startTime: "",     // not stored in DB
          endTime: "",       // not stored in DB
          notes: j.comments ?? "",
          existingHours: Number(j.hoursWorked) || 0,
        }))
      );
    }
  }, [initialGroup]);

  const [upsert, { isLoading }] = useUpsertTimeEntryMutation();
  const [updateEntry, { isLoading: isUpdating }] = useUpdateTimeEntryMutation();

  const weekEnd = useMemo(
    () => format(endOfWeek(new Date(date), { weekStartsOn: 1 }), "yyyy-MM-dd"),
    [date]
  );

  const getDurationInHours = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const startDate = new Date(0, 0, 0, sh, sm || 0);
    const endDate = new Date(0, 0, 0, eh, em || 0);
    const diffHrs = (endDate.getTime() - startDate.getTime()) / 36e5;
    return diffHrs > 0 ? diffHrs : 0;
  };

  const computedTotal = useMemo(
    () =>
      jobs.reduce((sum, j) => {
        const fromTimes = getDurationInHours(j.startTime, j.endTime);
        // prefer explicitly entered times, else fall back to existing hours in edit mode
        return sum + (fromTimes > 0 ? fromTimes : (j.existingHours ?? 0));
      }, 0),
    [jobs]
  );

  const handleChange = (index: number, field: keyof JobEntry, value: string) => {
    setJobs((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddJob = () => {
    setJobs((prev) => [...prev, { jobNumber: "", startTime: "", endTime: "", notes: "" }]);
  };
  const handleRemoveJob = (index: number) => {
    setJobs((prev) => prev.filter((_, i) => i !== index));
  };

  const buildPayload = (status: "DRAFT" | "SUBMITTED"): UpsertTimeEntryDTO => {
    const apiJobs = jobs
      .filter((j) => j.jobNumber.trim() !== "")
      .map((j) => {
        const fromTimes = getDurationInHours(j.startTime, j.endTime);
        const hoursWorked = Number((fromTimes > 0 ? fromTimes : (j.existingHours ?? 0)).toFixed(2));
        const job: any = {
          jobNumber: j.jobNumber.trim(),
          hoursWorked,
        };
        if (j.notes?.trim()) job.comments = j.notes.trim();
        return job;
      });

    const dto: UpsertTimeEntryDTO = {
      ...(editingId ? { id: editingId } : {}),
      userId,
      date,
      weekEndingDate: weekEnd,
      status,
      jobs: apiJobs,
    };
    return dto;
  };

const onSaveDraft = async () => {
  if (!userId) return toast.error("No userId found.");
  const dto = buildPayload("DRAFT");
  try {
    if (editingId) {
      await updateEntry({ id: editingId, ...dto }).unwrap();   // <-- PATCH path
    } else {
      await upsert(dto).unwrap();                               // <-- POST path
    }
    toast.success("Draft saved");
    onDone?.();
  } catch (e) {
    console.error(e);
    toast.error("Failed to save draft");
  }
};

const onSubmit = async () => {
  if (!userId) return toast.error("No userId found.");
  const dto = buildPayload("SUBMITTED");
  try {
    if (editingId) {
      await updateEntry({ id: editingId, ...dto }).unwrap();   // <-- PATCH path
    } else {
      await upsert(dto).unwrap();                               // <-- POST path
    }
    toast.success("Time entry submitted");
    onDone?.();
  } catch (e) {
    console.error(e);
    toast.error("Failed to submit time entry");
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border rounded-xl shadow-md space-y-6 dark:bg-zinc-900 dark:border-zinc-700 mt-20">
      <h2 className="text-2xl font-bold text-center">
        {editingId ? "Edit Draft Time Entry" : "Employee Time Entry"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <Input disabled value={`Week Ending: ${weekEnd}`} />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Jobs for the Day</h3>
        {jobs.map((job, index) => {
          const timeHours = getDurationInHours(job.startTime, job.endTime);
          const displayHours = timeHours > 0 ? timeHours : (job.existingHours ?? 0);
          return (
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
                  Hours: {displayHours.toFixed(2)}
                  {job.existingHours && timeHours === 0 ? " (from saved draft)" : ""}
                </span>
                <Button variant="destructive" size="sm" onClick={() => handleRemoveJob(index)}>
                  Remove Job
                </Button>
              </div>
            </div>
          );
        })}
        <Button onClick={handleAddJob} type="button">+ Add Another Job</Button>
      </div>

      <div className="text-right text-sm font-semibold">
        Total Hours: {computedTotal.toFixed(2)} hrs
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="secondary" onClick={onSaveDraft} disabled={isLoading} type="button">
          Save Draft
        </Button>
        <Button onClick={onSubmit} disabled={isLoading} type="button">
          Submit
        </Button>
      </div>
    </div>
  );
}
