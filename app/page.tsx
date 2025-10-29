import React from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/main/HeroSection";

export const metadata: Metadata = {
  title: "LockdIn Dashboard - Stay Focused and Productive",
  description:
    "LockdIn helps you stay focused by blocking distracting websites. Manage your productivity with our powerful dashboard and browser extension.",
  alternates: {
    canonical: "https://lockdin.in",
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <HeroSection />
    </div>
  );
}
