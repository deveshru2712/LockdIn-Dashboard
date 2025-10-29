"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ClosePopupProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmEnd: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ClosePopup({
  open,
  setOpen,
  setConfirmEnd,
}: ClosePopupProps) {
  const [step, setStep] = useState(0);

  const messages = [
    "You need to pay $10,000,000 first… 💸",
    "Fine. But just know… we could've been filthy rich. 😏",
    "This is your final-final chance. ⏳ (Yes, really.)",
    "Alright… goodbye, billionaire. 👋💔",
  ];

  const buttonTexts = [
    { green: "I'm broke 💀", red: "I dare to proceed 😎" },
    { green: "Really? 😭", red: "I'm fine being poor." },
    { green: "I changed my mind 😤", red: "Just close it already." },
    { green: "Wait… maybe I can be rich 💸", red: "Just close it." },
  ];

  useEffect(() => {
    if (open) {
      const audio = new Audio("./meme.mp3");
      audio.play().catch(() => {});
    }
  }, [open]);

  const handleGreenClick = () => setOpen(false);

  const handleRedClick = () => {
    if (step < messages.length - 1) setStep(step + 1);
    else {
      setOpen(false);
      setTimeout(() => setConfirmEnd(true), 400);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogContent className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold text-gray-900">
            <blockquote>“A man’s word is his bond.”</blockquote>
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="text-md text-center leading-relaxed text-gray-700"
          >
            {messages[step]}
          </motion.p>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center gap-4"
        >
          <Button
            onClick={handleGreenClick}
            className="bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            {buttonTexts[step].green}
          </Button>

          <Button
            onClick={handleRedClick}
            variant="destructive"
            className="px-4 py-2"
          >
            {buttonTexts[step].red}
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
