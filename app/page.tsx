import React from "react";
import HeroSection from "@/components/main/HeroSection";
import FloatingClock from "@/components/FloatingClock";

export default function Home() {
  return (
    <div
      className="relative flex w-full flex-col items-center justify-center p-8"
      data-lenis-prevent
    >
      <HeroSection />
      <FloatingClock />
    </div>
  );
}
