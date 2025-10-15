"use client";
import { motion } from "motion/react";
import { Shield, Timer, Zap } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function FeatureSection() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-blue-500" />,
      title: "One-Click Block",
      description:
        "Instantly block distractions from the popup or dashboard. No setup or complexity — just click and focus.",
      span: "sm:col-span-2 lg:col-span-1",
    },
    {
      icon: <Timer className="h-10 w-10 text-blue-500" />,
      title: "Focus Session",
      description:
        "Start a focus session to dive deep into work. Your blocked sites stay off-limits until time's up.",
      span: "sm:col-span-1 lg:col-span-1",
    },
    {
      icon: <Zap className="h-10 w-10 text-blue-500" />,
      title: "Simple & Fast",
      description:
        "Built on Chrome's DNR API — fast, lightweight, and privacy-friendly blocking without background scripts.",
      span: "sm:col-span-2 lg:col-span-1",
    },
  ];

  return (
    <section className="relative flex w-full flex-col items-center justify-center px-6 py-24 text-center">
      {/* Section Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl"
      >
        Features
      </motion.h1>

      {/* Quote */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-16 max-w-2xl text-4xl font-bold text-gray-700 italic dark:text-gray-400"
      >
        "The cost of being distracted is the life you could have lived."
      </motion.p>

      {/* Bento Grid */}
    </section>
  );
}
