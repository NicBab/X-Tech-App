"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateDLRMutation } from "@/redux/api/api";
import { format } from "date-fns";
import toast from "react-hot-toast";

export default function DLRForm() {
  const { userId } = useSelector((s: RootState) => s.user);

  const expenseLabels = [
    "Fuel",
    "Hotel",
    "Per Diem",
    "Tool Rental",
    "Truck Rental",
    "Other",
  ];

  // controlled fields
  const [dlrNumber, setDlrNumber] = useState("");
  const [jobNumber, setJobNumber] = useState("");
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [customer, setCustomer] = useState(""); // required on submit
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");

  const [expenses, setExpenses] = useState<{ [key: string]: number }>({});
  const [mileage, setMileage] = useState<number>(0);

  const handleExpenseChange = (label: string, value: string) => {
    const amount = parseFloat(value);
    setExpenses((prev) => ({ ...prev, [label]: isNaN(amount) ? 0 : amount }));
  };
  const handleMileageChange = (value: string) => {
    const miles = parseFloat(value);
    setMileage(isNaN(miles) ? 0 : miles);
  };

  const calculateHours = (start: string, end: string) => {
    if (!start || !end) return 0;
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const startMinutes = sh * 60 + sm;
    const endMinutes = eh * 60 + em;
    const diff = endMinutes - startMinutes;
    return diff > 0 ? parseFloat((diff / 60).toFixed(2)) : 0;
  };

  const hoursWorked = calculateHours(startTime, endTime);
  const mileageRate = 0.8;
  const mileageTotal = mileage * mileageRate;
  const optionalTotal = Object.values(expenses).reduce(
    (sum, val) => sum + val,
    0
  );
  const overallTotal = optionalTotal + mileageTotal;

  const [createDLR, { isLoading }] = useCreateDLRMutation();

  const buildPayload = (status: "DRAFT" | "PENDING") => {
    const fuel = expenses["Fuel"] ?? 0;
    const hotel = expenses["Hotel"] ?? 0;

    // bundle other expense buckets into JSON string
    const otherMap: Record<string, number> = {};
    for (const [k, v] of Object.entries(expenses)) {
      if (!["Fuel", "Hotel"].includes(k) && (v ?? 0) > 0) otherMap[k] = v;
    }
    const otherExpenses = Object.keys(otherMap).length
      ? JSON.stringify(otherMap)
      : undefined;

    return {
      dlrNumber: dlrNumber || undefined,
      jobNumber: jobNumber.trim(),
      date,
      userId: userId ?? "",
      customer: customer.trim(),
      notes: notes.trim() || undefined,
      status, // "DRAFT" or "PENDING"
      totalHours: hoursWorked,
      fuel: fuel || undefined,
      hotel: hotel || undefined,
      mileage: mileage || undefined,
      otherExpenses,
    };
  };

  const handleSaveDraft = async () => {
    if (!userId) return toast.error("No user/session");
    if (!jobNumber.trim()) return toast.error("Job # is required");

    const body = buildPayload("DRAFT");
    await toast.promise(createDLR(body as any).unwrap(), {
      loading: "Saving draft…", // or "Submitting…"
      success: "DLR saved", // or "DLR submitted"
      error: (e: any) =>
        e?.data?.error || e?.error || e?.message || "Failed to create DLR",
    });
  };

  const handleSubmit = async () => {
    if (!userId) return toast.error("No user/session");
    if (!jobNumber.trim()) return toast.error("Job # is required to submit");
    if (!customer.trim()) return toast.error("Customer is required to submit");
    if (hoursWorked <= 0)
      return toast.error("Total hours must be > 0 to submit");

    const body = buildPayload("PENDING");
    await toast.promise(createDLR(body as any).unwrap(), {
      loading: "Submitting…",
      success: "DLR submitted",
      error: (e) => e?.data?.error || "Failed to submit DLR",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6 border rounded-xl bg-white shadow-md dark:bg-zinc-900 border-zinc-800">
      <h2 className="text-2xl font-bold text-center">
        Daily Labor Report (DLR)
      </h2>

      {/* Main DLR Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          placeholder="DLR #"
          value={dlrNumber}
          onChange={(e) => setDlrNumber(e.target.value)}
        />
        <Input
          placeholder="Job #"
          value={jobNumber}
          onChange={(e) => setJobNumber(e.target.value)}
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          placeholder="Customer *"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
        <Input
          type="time"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <Input
          type="time"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <Input disabled value={`${hoursWorked.toFixed(2)} hours`} />
      </div>

      {/* Description */}
      <Textarea
        placeholder="Work description..."
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      {/* Expenses Section */}
      <h3 className="font-semibold pt-4">Optional Expenses</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {expenseLabels.map((label) => (
          <div
            key={label}
            className="flex items-center border rounded-md bg-gray-50 px-3 py-2"
          >
            <span className="text-sm font-medium text-gray-500 w-24 shrink-0">
              {label}
            </span>
            <input
              type="number"
              className="w-full bg-transparent outline-none text-sm px-2"
              placeholder="$0.00"
              onChange={(e) => handleExpenseChange(label, e.target.value)}
            />
          </div>
        ))}

        {/* Mileage */}
        <div className="flex items-center border rounded-md bg-gray-50 px-3 py-2 col-span-1 sm:col-span-2">
          <span className="text-sm font-medium text-gray-500 w-24 shrink-0">
            Mileage
          </span>
          <input
            type="number"
            className="w-full bg-transparent outline-none text-sm px-2"
            placeholder="Miles driven"
            onChange={(e) => handleMileageChange(e.target.value)}
          />
        </div>
      </div>

      {/* Totals */}
      <div className="text-right pt-4 space-y-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        <p>Total Hours: {hoursWorked.toFixed(2)}</p>
        <p>Optional Expenses: ${optionalTotal.toFixed(2)}</p>
        <p>
          Mileage (${mileageRate.toFixed(2)}/mile): ${mileageTotal.toFixed(2)}
        </p>
        <p className="font-semibold text-black dark:text-white">
          Expense Total: ${overallTotal.toFixed(2)}
        </p>
      </div>

      {/* Signature Block */}
      <div className="pt-6">
        <h3 className="font-semibold mb-2">Field Manager Signature</h3>
        <div className="w-full h-[150px] border rounded-md bg-gray-100 flex items-center justify-center text-gray-500">
          Signature pad placeholder
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-6">
        <Button
          variant="secondary"
          onClick={handleSaveDraft}
          disabled={isLoading}
        >
          Save Draft
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          Submit
        </Button>
      </div>
    </div>
  );
}
