"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function DLRForm() {
  const expenseLabels = [
    "Fuel",
    "Hotel",
    "Per Diem",
    "Tool Rental",
    "Truck Rental",
    "Other",
  ]

  const [expenses, setExpenses] = useState<{ [key: string]: number }>({})
  const [mileage, setMileage] = useState<number>(0)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  const handleExpenseChange = (label: string, value: string) => {
    const amount = parseFloat(value)
    setExpenses((prev) => ({
      ...prev,
      [label]: isNaN(amount) ? 0 : amount,
    }))
  }

  const handleMileageChange = (value: string) => {
    const miles = parseFloat(value)
    setMileage(isNaN(miles) ? 0 : miles)
  }

  const calculateHours = (start: string, end: string) => {
    if (!start || !end) return 0
    const [sh, sm] = start.split(":").map(Number)
    const [eh, em] = end.split(":").map(Number)
    const startMinutes = sh * 60 + sm
    const endMinutes = eh * 60 + em
    const diff = endMinutes - startMinutes
    return diff > 0 ? parseFloat((diff / 60).toFixed(2)) : 0
  }

  const hoursWorked = calculateHours(startTime, endTime)
  const mileageRate = 0.8
  const mileageTotal = mileage * mileageRate
  const optionalTotal = Object.values(expenses).reduce((sum, val) => sum + val, 0)
  const overallTotal = optionalTotal + mileageTotal

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6 border rounded-xl bg-white shadow-md dark:bg-zinc-900 border-zinc-800">
      <h2 className="text-2xl font-bold text-center">Daily Labor Report (DLR)</h2>

      {/* Main DLR Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input placeholder="DLR #" />
        <Input placeholder="Job #" />
        <Input type="date" />
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
      <Textarea placeholder="Work description..." rows={4} />

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
        <p>Mileage (${mileageRate.toFixed(2)}/mile): ${mileageTotal.toFixed(2)}</p>
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
        <Button variant="secondary">Save Draft</Button>
        <Button>Submit</Button>
      </div>
    </div>
  )
}