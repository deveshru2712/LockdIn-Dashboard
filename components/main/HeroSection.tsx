"use client";

import { motion } from "motion/react";
import Blocker from "./Blocker/Blocker";
import Footer from "./Footer";
import Header from "./Header";
import { useExtensionInstalled } from "@/hooks/useExtensionInstalled";
import { Button } from "../ui/button";
import FloatingClock from "../FloatingClock";
import { RefreshCw } from "lucide-react";
import useMobileDevice from "@/hooks/useMobileDevice";

export default function HeroSection() {
  const installed = useExtensionInstalled();
  const isMobile = useMobileDevice();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center py-16 sm:py-0">
      {/* Animated Container */}
      <motion.div
        initial={{ filter: "blur(20px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-8 px-4 sm:max-w-2xl sm:gap-12"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full text-center"
        >
          <Header />
        </motion.div>

        {/* Core Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex w-full items-center justify-center"
        >
          {/* Desktop View */}
          {!isMobile ? (
            installed ? (
              <Blocker />
            ) : (
              <div className="flex w-full items-center justify-center">
                <Button
                  size="lg"
                  aria-label="Install browser extension"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring/80 cursor-pointer px-6 py-3 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  onClick={() =>
                    window.open("https://chromewebstore.google.com/", "_blank")
                  }
                >
                  Install extension
                </Button>
              </div>
            )
          ) : (
            /* Minimal Mobile Message */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="bg-muted/30 mx-auto flex max-w-xs items-center justify-center rounded-lg px-4 py-2 text-center backdrop-blur-sm"
            >
              <p className="text-foreground text-sm leading-snug font-semibold">
                Extensions are only available on desktop.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full text-center"
        >
          <Footer />
        </motion.div>
      </motion.div>

      {/* Floating Elements — desktop only */}
      {!isMobile &&
        (installed ? (
          <FloatingClock />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="from-background via-background/90 to-background/80 fixed right-6 bottom-4 flex items-center gap-3 rounded-md border bg-gradient-to-r px-5 py-4 shadow-[0_3px_10px_rgb(0,0,0,0.15)] backdrop-blur-sm max-sm:right-4"
          >
            <motion.div
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <RefreshCw className="text-primary" size={20} />
            </motion.div>

            <div className="flex flex-col">
              <h2 className="text-foreground text-xs">
                Please reload after installing the extension.
              </h2>
            </div>
          </motion.div>
        ))}
    </div>
  );
}
