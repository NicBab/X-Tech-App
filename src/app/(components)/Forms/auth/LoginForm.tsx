"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../redux/slices/user/UserSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Login failed");
      return;
    }

    dispatch(
      setUser({
        userId: data.user.userId,
        name: data.user.name,
        email: data.user.email,
        phoneNumber: data.user.phoneNumber,
        role: data.user.role.toLowerCase(),
        isAuthenticated: true,
        loading: false,
        error: null,
        token: data.token,
      })
    );

    if (data.user.role.toLowerCase() === "admin") {
      router.push("/admin/admin-layout");
    } else {
      router.push("/employee/employee-layout");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center from-gray-950 to-zinc-800 p-4 text-white z-2">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@xtechnology-usa.com"
                value={form.email}
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

            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          </form>

          <div className="flex justify-between pt-2 text-sm text-muted-foreground">
            <span className="cursor-pointer underline">Forgot password?</span>
            <span className="cursor-pointer underline">
              <Link href="/register" title="Register">
                Register
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
