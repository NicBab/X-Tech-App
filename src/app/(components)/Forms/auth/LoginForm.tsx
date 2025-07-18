"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen w-full flex items-center justify-center from-gray-950 to-zinc-800 p-4 text-white z-2">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@xtechnology-usa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button className="w-full mt-4">Login</Button>
          {/* 
          <Button variant="secondary" className="w-full" disabled>
            Login with Company Email (coming soon)
          </Button> */}

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
