import React from "react";
import HeroSection from "@/components/main/HeroSection";

export default function Home() {
  return (
    <div
      className="flex w-full flex-col items-center justify-center p-8"
      data-lenis-prevent
    >
      <HeroSection />
    </div>
  );
}
