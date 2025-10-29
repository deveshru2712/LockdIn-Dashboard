"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { AlarmClock, Play, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import SessionBlocker from "./SessionBlocker";
import sendBlockedSitesToExtension from "@/utils/sendBlockedListToExtension";
import Confetti from "react-confetti";
import ClosePopup from "./ClosePopup";

interface Preset {
  label: string;
  ms: number;
}

const PRESETS: Preset[] = [
  { label: "30m", ms: 30 * 60 * 1000 },
  { label: "1h", ms: 60 * 60 * 1000 },
  { label: "3h", ms: 3 * 60 * 60 * 1000 },
  { label: "6h", ms: 6 * 60 * 60 * 1000 },
  { label: "12h", ms: 12 * 60 * 60 * 1000 },
  { label: "24h", ms: 24 * 60 * 60 * 1000 },
];

type PresetMs = (typeof PRESETS)[number]["ms"];
const LS_END_KEY = "lockdin_session_end";
const LS_TOTAL_KEY = "lockdin_session_total";

function FormatTime(ms: number) {
  if (ms <= 0) return "00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0)
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function GetTimeFromLocalStorage(key: string): number | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

export default function FloatingClock() {
  const [sessionBlockedUrls, setSessionBlockedUrls] = useState<string[]>([]);
  const [sessionMs, setSessionMs] = useState<PresetMs>(PRESETS[0].ms);
  const [showBlockedContainer, setShowBlockedContainer] = useState(false);

  const [closePopup, setClosePopup] = useState(false);
  const [confirmEnd, setConfirmEnd] = useState(false);

  const [open, setOpen] = useState(false);
  const [sessionEnd, setSessionEnd] = useState<number | null>(null);
  const [sessionTotalMs, setSessionTotalMs] = useState<number | null>(null);
  const [tick, setTick] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Load blocked websites
  useEffect(() => {
    const local = localStorage.getItem("session-blocked-website");
    setSessionBlockedUrls(local ? JSON.parse(local) : []);
    setTimeout(() => setShowBlockedContainer(true), 2000);
  }, []);

  // Restore session
  useEffect(() => {
    const end = GetTimeFromLocalStorage(LS_END_KEY);
    const total = GetTimeFromLocalStorage(LS_TOTAL_KEY);
    if (end && end > Date.now()) {
      setSessionEnd(end);
      if (total && total > 0) setSessionTotalMs(total);
    } else {
      localStorage.removeItem(LS_END_KEY);
      localStorage.removeItem(LS_TOTAL_KEY);

      sendBlockedSitesToExtension([], true);
    }
  }, []);

  // Ticking
  useEffect(() => {
    if (!sessionEnd) return;
    const i = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(i);
  }, [sessionEnd]);

  const remainingMs = useMemo(
    () => Math.max(0, (sessionEnd || 0) - Date.now()),
    [sessionEnd, tick],
  );
  const active = sessionEnd !== null && remainingMs > 0;

  const progressPct = useMemo(() => {
    if (!active || !sessionTotalMs || sessionTotalMs <= 0) return 0;
    return Math.min(
      100,
      ((sessionTotalMs - remainingMs) / sessionTotalMs) * 100,
    );
  }, [active, sessionTotalMs, remainingMs]);

  // Auto-end session when timer reaches zero
  useEffect(() => {
    if (!sessionEnd || remainingMs > 0 || showCelebration) return;
    setSessionEnd(null);
    setSessionTotalMs(null);
    setSessionBlockedUrls([]);

    localStorage.removeItem(LS_END_KEY);
    localStorage.removeItem(LS_TOTAL_KEY);
    localStorage.removeItem("session-blocked-website");

    sendBlockedSitesToExtension([], true);
    setShowCelebration(true);

    const timeout = setTimeout(() => setShowCelebration(false), 3000);
    return () => clearTimeout(timeout);
  }, [remainingMs, sessionEnd]);

  function persist(end: number, totalMs: number | null) {
    localStorage.setItem(LS_END_KEY, String(end));
    if (totalMs && totalMs > 0)
      localStorage.setItem(LS_TOTAL_KEY, String(totalMs));
    else localStorage.removeItem(LS_TOTAL_KEY);
  }

  function startWithDuration(ms: number) {
    if (sessionBlockedUrls.length === 0) return;
    const end = Date.now() + ms;
    setSessionEnd(end);
    setSessionTotalMs(ms);
    persist(end, ms);

    localStorage.setItem(
      "session-blocked-website",
      JSON.stringify(sessionBlockedUrls),
    );
    sendBlockedSitesToExtension(sessionBlockedUrls, true);
  }

  function endSession() {
    if (!active) return;
    setClosePopup(true);
    setOpen(false);
  }

  // Confirm end
  useEffect(() => {
    if (!confirmEnd) return;
    setSessionEnd(null);
    setSessionTotalMs(null);
    setSessionBlockedUrls([]);
    setClosePopup(false);
    setConfirmEnd(false);

    localStorage.removeItem(LS_END_KEY);
    localStorage.removeItem(LS_TOTAL_KEY);
    localStorage.removeItem("session-blocked-website");

    sendBlockedSitesToExtension([], true);
  }, [confirmEnd]);

  const endTimeDisplay = useMemo(
    () =>
      sessionEnd
        ? new Date(sessionEnd).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "",
    [sessionEnd],
  );

  return (
    <>
      {/* Session Dialog */}
      <Dialog open={open && !closePopup} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            aria-label={
              active
                ? `Session active, ${FormatTime(remainingMs)} remaining`
                : "Start a focus session"
            }
            size="icon"
            className={`fixed right-8 bottom-8 z-20 h-12 w-12 cursor-pointer rounded-full shadow-lg transition-transform hover:scale-105 ${
              active
                ? "bg-primary text-primary-foreground ring-primary/40 animate-pulse ring-2"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {active ? (
              <span className="text-xs font-medium">
                {FormatTime(remainingMs)}
              </span>
            ) : (
              <AlarmClock className="h-5 w-5" />
            )}
          </Button>
        </DialogTrigger>

        <DialogContent
          className={`sm:max-w-[420px] ${closePopup ? "pointer-events-none opacity-50" : ""}`}
        >
          <DialogHeader>
            <DialogTitle>
              {active ? "Focus Session Active" : "Start a LockdIn Session"}
            </DialogTitle>
            <DialogDescription>
              {active
                ? "Stay focused until the session ends."
                : "Pick a preset duration to stay focused."}
            </DialogDescription>
          </DialogHeader>

          {active ? (
            <div className="grid gap-4">
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">
                    Time remaining
                  </span>
                  <span className="text-2xl font-semibold tabular-nums">
                    {FormatTime(remainingMs)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground text-sm">Ends</span>
                  <div className="font-medium">{endTimeDisplay}</div>
                </div>
              </div>

              {sessionTotalMs && (
                <div className="grid gap-2">
                  <div
                    className="bg-muted h-2 w-full overflow-hidden rounded-full"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(progressPct)}
                  >
                    <div
                      className="bg-primary h-full"
                      style={{
                        width: `${progressPct}%`,
                        transition: "width 0.6s ease",
                      }}
                    />
                  </div>
                  <div className="text-muted-foreground flex items-center justify-between text-xs">
                    <span>Started</span>
                    <span>{Math.round(progressPct)}%</span>
                    <span>Complete</span>
                  </div>
                </div>
              )}

              {sessionBlockedUrls.length > 0 && showBlockedContainer && (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <Separator />
                  <h3 className="text-sm font-medium text-gray-600">
                    Blocked Websites ({sessionBlockedUrls.length})
                  </h3>
                  <div className="flex flex-wrap gap-2 rounded-md border bg-white/95 px-2.5 py-2 shadow-md">
                    {sessionBlockedUrls.map((url) => (
                      <Badge
                        key={url}
                        variant="secondary"
                        className="flex items-center gap-1 px-2 py-1 transition-all duration-300 hover:bg-slate-50"
                      >
                        {url}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}

              <Button
                onClick={endSession}
                className="cursor-pointer hover:bg-red-400"
              >
                <X />
                End Session
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              <SessionBlocker
                sessionBlockedUrls={sessionBlockedUrls}
                setSessionBlockedUrls={setSessionBlockedUrls}
              />
              <div className="grid grid-cols-3 gap-2">
                {PRESETS.map((p) => (
                  <Button
                    key={p.label}
                    variant="secondary"
                    className={`${sessionMs == p.ms ? "border border-red-400" : ""} hover:border hover:border-red-300`}
                    onClick={() => setSessionMs(p.ms)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    {p.label}
                  </Button>
                ))}
              </div>
              <Button
                disabled={sessionBlockedUrls.length === 0}
                onClick={() => startWithDuration(sessionMs)}
                className="w-full bg-green-500 hover:bg-green-400"
              >
                Create Session
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Celebration */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => setShowCelebration(false)}
            className="bg-background/50 fixed inset-0 z-[9999] flex flex-col items-center justify-center backdrop-blur-sm"
          >
            <Confetti
              recycle={false}
              numberOfPieces={250}
              run={showCelebration}
              width={typeof window !== "undefined" ? window.innerWidth : 0}
              height={typeof window !== "undefined" ? window.innerHeight : 0}
            />
            <motion.h1
              initial={{ y: 30, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="px-4 text-center text-3xl font-bold text-green-600"
            >
              🎉 Focus Session Complete!
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-2 px-6 text-center text-base text-gray-600"
            >
              You’ve earned a well-deserved break — great job!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ClosePopup Overlay */}
      {closePopup && (
        <ClosePopup
          open={closePopup}
          setOpen={setClosePopup}
          setConfirmEnd={setConfirmEnd}
        />
      )}
    </>
  );
}
