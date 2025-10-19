"use client";
import { motion } from "motion/react";
import Blocker from "./Blocker/Blocker";
import Footer from "./Footer";
import Header from "./Header";
import { useExtensionInstalled } from "@/hooks/useExtensionInstalled";
import { Button } from "../ui/button";

export default function HeroSection() {
  const installed = useExtensionInstalled();

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <motion.div
        initial={{ filter: `blur(20px)`, opacity: 0, y: 20 }}
        animate={{ filter: `blur(0px)`, opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          opacity: { duration: 0.6 },
          filter: { duration: 0.7 },
        }}
        className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Header />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex w-full items-center justify-center"
        >
          {installed ? (
            <Blocker />
          ) : (
            <div className="flex w-full items-center justify-center">
              <Button
                size="lg"
                aria-label="Install browser extension"
                className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring/80 cursor-pointer px-6 py-3 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Install extension
              </Button>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Footer />
        </motion.div>
      </motion.div>
    </div>
  );
}
