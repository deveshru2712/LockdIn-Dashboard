"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function Navbar() {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)", y: -20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-6 left-1/2 z-50 w-full -translate-x-1/2 px-4 md:px-6 lg:px-8"
    >
      <nav className="bg-foreground text-background border-border mx-auto flex max-w-3xl items-center justify-between rounded-4xl border px-6 py-2.5 shadow-lg backdrop-blur-md">
        <Link
          href="/"
          className="text-background flex items-center gap-2 text-lg font-semibold tracking-wide"
        >
          <Lock className="h-5 w-5" color="white" />
          LockdIn
        </Link>

        {/* Links */}
        <div className="hidden items-center gap-6 text-sm md:flex">
          <Link
            href="/features"
            className="text-slate-500 transition-all duration-300 hover:scale-105 hover:text-slate-100"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-slate-500 transition-all duration-300 hover:scale-105 hover:text-slate-100"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-slate-500 transition-all duration-300 hover:scale-105 hover:text-slate-100"
          >
            About
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 rounded-md bg-slate-900">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="transition-all duration-300"
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </nav>
    </motion.div>
  );
}
