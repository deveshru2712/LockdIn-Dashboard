"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  AlertTriangle,
  Home,
  RefreshCw,
  Lock,
  XCircle,
  Globe,
} from "lucide-react";

interface ErrorPageProps {
  title?: string;
  message?: string;
  icon?: "alert" | "auth" | "network" | "fatal";
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export default function ErrorPage({
  title = "Something Went Wrong",
  message = "Oops! We couldn’t load this page. It may be a temporary glitch or a broken link.",
  icon = "alert",
  primaryAction,
  secondaryAction,
}: ErrorPageProps) {
  const router = useRouter();

  const IconMap = {
    alert: AlertTriangle,
    auth: Lock,
    network: Globe,
    fatal: XCircle,
  };

  const SelectedIcon = IconMap[icon] ?? AlertTriangle;

  return (
    <main className="from-background to-secondary/30 text-foreground relative flex min-h-screen items-center justify-center bg-gradient-to-b px-6">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-destructive/10 absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
      </div>

      <motion.section
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-card relative z-10 w-full max-w-md rounded-2xl border p-8 shadow-lg backdrop-blur-sm"
      >
        <header className="text-center">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-destructive/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
          >
            <SelectedIcon className="text-destructive h-7 w-7" />
          </motion.div>

          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {message}
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-secondary/40 mt-8 space-y-4 rounded-md p-4 text-sm"
        >
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              variant="default"
              className="w-full sm:w-auto"
              onClick={
                primaryAction ? primaryAction.onClick : () => router.refresh()
              }
            >
              {primaryAction?.label ?? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" /> Try Again
                </>
              )}
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={
                secondaryAction
                  ? secondaryAction.onClick
                  : () => router.push("/")
              }
            >
              {secondaryAction?.label ?? (
                <>
                  <Home className="mr-2 h-4 w-4" /> Go Home
                </>
              )}
            </Button>
          </div>

          <footer className="text-muted-foreground mt-4 text-center text-xs">
            If the issue persists please{" "}
            <span
              className="text-foreground cursor-pointer underline underline-offset-2"
              onClick={() => router.push("https://x.com/deveshru2712")}
            >
              contact us.
            </span>
          </footer>
        </motion.div>
      </motion.section>
    </main>
  );
}
