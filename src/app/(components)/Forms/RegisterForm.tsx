"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    companyEmail: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
        <div className="min-h-screen w-full flex items-center justify-center from-gray-950 to-zinc-800 p-4 text-white z-2">
      <Card className="w-full max-w-md border shadow-md">
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
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              placeholder="1-"
              value={form.phoneNumber}
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
            <span className="underline cursor-pointer">
              <Link href="/login" title="login">
              Login
              </Link>
              </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}