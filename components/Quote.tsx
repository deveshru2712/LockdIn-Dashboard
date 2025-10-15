"use client";
import { motion } from "motion/react";

export default function Quote() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="font-libre-baskerville mt-6 text-center text-xl font-bold text-gray-700 italic"
    >
      "The cost of being distracted is the life you could have lived."
    </motion.p>
  );
}
