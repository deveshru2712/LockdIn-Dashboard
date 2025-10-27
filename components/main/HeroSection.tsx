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

      {!isMobile ? (
        installed ? (
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
            className="from-background via-background/90 to-background/80 fixed right-8 bottom-8 flex items-center gap-3 rounded-md border bg-gradient-to-r px-5 py-4 shadow-[0_3px_10px_rgb(0,0,0,0.15)] backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <RefreshCw className="text-primary" size={20} />
            </motion.div>

            <div className="flex flex-col">
              <h2 className="text-foreground text-sm font-medium">
                Please reload after installing the extension.
              </h2>
              <p className="text-muted-foreground mt-1 text-xs">
                (Your new extension powers will activate on reload!)
              </p>
            </div>
          </motion.div>
        )
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="from-background via-background/90 to-background/80 fixed inset-x-0 bottom-6 mx-auto flex max-w-xs items-center justify-center rounded-md border bg-gradient-to-r px-4 py-2 text-center shadow-[0_3px_10px_rgb(0,0,0,0.15)] backdrop-blur-sm sm:max-w-sm"
        >
          <div className="flex flex-col">
            <h2 className="text-foreground px-5 text-sm leading-snug font-medium">
              Chrome extensions are only available on Desktop.
            </h2>
          </div>
        </motion.div>
      )}
    </div>
  );
}
