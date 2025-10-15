import React from "react";
import HeroSection from "@/components/main/HeroSection";
import FeautreSection from "@/components/main/FeatureSection";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center p-8">
      <HeroSection />
      <FeautreSection />
    </div>
  );
}
