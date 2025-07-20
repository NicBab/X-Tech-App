"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../redux/slices/user/UserSlice"; // This must exist with `setUser`
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Email domain validation
    if (!form.email.endsWith("@xtechnology-usa.com")) {
      alert("Please use your @xtechnology-usa.com email address.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Registration failed.");
        return;
      }

      dispatch(
        setUser({
          userId: data.user.userId,
          name: data.user.name,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          role: data.user.role.toLowerCase(), // admin or employee
          isAuthenticated: true,
          loading: false,
          error: null,
          token: data.token,
        })
      );

      if (data.user.role.toLowerCase() === "admin") {
        router.push("/admin/admin-dashboard");
      } else {
        router.push("/employee/employee-dashboard");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center from-gray-950 to-zinc-800 p-4 text-white z-2">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
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

            <div>
              <Label htmlFor="email">Company Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@xtechnology-usa.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="337-555-1234"
                value={form.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full mt-4">
              Register
            </Button>
          </form>

          <p className="text-sm text-center text-gray-300 pt-4">
            Already have an account?{" "}
            <Link href="/login" className="underline text-blue-400">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
