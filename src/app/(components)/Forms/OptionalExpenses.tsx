"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function OptionalExpenses() {
  const [form, setForm] = useState({
    fuel: 0,
    hotel: 0,
    mileage: 0,
    perDiem: 0,
    toolRental: 0,
    truckRental: 0,
  })

  const mileageRate = 0.8

  const totalOptional = useMemo(() => {
    const { fuel, hotel, perDiem, toolRental, truckRental } = form
    return fuel + hotel + perDiem + toolRental + truckRental
  }, [form])

  const mileageTotal = useMemo(() => form.mileage * mileageRate, [form.mileage])

  const overallTotal = useMemo(() => totalOptional + mileageTotal, [totalOptional, mileageTotal])

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: parseFloat(e.target.value) || 0 })
  }

  return (
    <div className="space-y-6 mt-8">
      <h3 className="text-lg font-semibold">Optional Expenses</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fuel">Fuel</Label>
          <Input
            id="fuel"
            type="number"
            placeholder="Fuel cost"
            value={form.fuel || ""}
            onChange={handleChange("fuel")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hotel">Hotel</Label>
          <Input
            id="hotel"
            type="number"
            placeholder="Hotel cost"
            value={form.hotel || ""}
            onChange={handleChange("hotel")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="perDiem">Per Diem</Label>
          <Input
            id="perDiem"
            type="number"
            placeholder="Per diem amount"
            value={form.perDiem || ""}
            onChange={handleChange("perDiem")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="toolRental">Tool Rental</Label>
          <Input
            id="toolRental"
            type="number"
            placeholder="Tool rental cost"
            value={form.toolRental || ""}
            onChange={handleChange("toolRental")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="truckRental">Truck Rental</Label>
          <Input
            id="truckRental"
            type="number"
            placeholder="Truck rental cost"
            value={form.truckRental || ""}
            onChange={handleChange("truckRental")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="mileage">Mileage</Label>
            <Input
              id="mileage"
              type="number"
              placeholder="Miles driven"
              value={form.mileage || ""}
              onChange={handleChange("mileage")}
            />
          </div>

          <div className="space-y-2">
            <Label>Total ($0.80/mile)</Label>
            <Input
              disabled
              value={`$${mileageTotal.toFixed(2)}`}
              className="bg-gray-100 text-gray-700 cursor-default"
            />
          </div>
        </div>
      </div>

      {/* Expense Summary */}
      <div className="mt-4 space-y-1 text-sm font-medium text-gray-800">
        <p>Optional Expenses = ${totalOptional.toFixed(2)}</p>
        <p>Mileage = ${mileageTotal.toFixed(2)}</p>
        <p className="font-semibold text-black">Expense Total = ${overallTotal.toFixed(2)}</p>
      </div>
    </div>
  )
}