"use client";
import { motion } from "motion/react";
import Blocker from "./Blocker";
import Footer from "./Footer";
import Header from "./Header";
import FloatingMenu from "../FloatingMenu";

export default function HeroSection() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <motion.div
        initial={{ filter: `blur(20px)`, opacity: 0, y: 20 }}
        animate={{ filter: `blur(0px)`, opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          opacity: { duration: 0.6 },
          filter: { duration: 0.7 },
        }}
        className="mx-auto flex max-w-2xl flex-col gap-12"
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
        >
          <Blocker />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Footer />
        </motion.div>
      </motion.div>

      {/* floating menu */}
      <motion.div
        className="fixed right-10 bottom-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
      >
        <FloatingMenu />
      </motion.div>
    </div>
  );
}
