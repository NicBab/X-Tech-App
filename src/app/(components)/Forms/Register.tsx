"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    companyEmail: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md border border-zinc-800 shadow-md">
        <CardContent className="p-6 sm:p-8 space-y-6 text-gray-900">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Personal Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyEmail">Company Email</Label>
            <Input
              id="companyEmail"
              name="companyEmail"
              type="email"
              placeholder="you@xtechnology-usa.com"
              value={form.companyEmail}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <Button className="w-full mt-4">Register</Button>

          <div className="text-sm text-center text-gray-600 pt-2">
            Already have an account?{" "}
            <span className="underline cursor-pointer">Login</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}