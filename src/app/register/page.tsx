"use client";

import RegisterForm from "@/app/(components)/Forms/RegisterForm";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/X_grey_logo.png"
          alt="background logo"
          fill
          quality={100}
          className="object-contain object-center opacity-3"
          priority
        />
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-primary opacity-10 z-1" />
        {/* Register Form */}
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 z-2">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}

