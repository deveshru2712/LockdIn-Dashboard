"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, LogOut, Loader2, ChevronDown, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient, signIn, signOut } from "@/lib/auth/auth-client";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await signOut();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="fixed top-4 left-1/2 z-50 w-full -translate-x-1/2 px-4 md:px-6 lg:px-8"
    >
      <nav className="bg-foreground text-background border-border mx-auto flex max-w-3xl items-center justify-between rounded-3xl border px-4 py-2 shadow-sm backdrop-blur supports-[backdrop-filter]:backdrop-blur">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold tracking-wide"
        >
          <Lock className="h-5 w-5" />
          <span className="text-pretty">LockdIn</span>
        </Link>

        {/* Links */}
        <div className="hidden items-center gap-5 text-sm md:flex">
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

        <div className="flex items-center gap-2">
          {!session ? (
            <Button
              variant="secondary"
              size="sm"
              className="h-9 rounded-full px-4"
              onClick={() => signIn()}
            >
              Sign in
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 rounded-full px-2.5"
                >
                  <User className="mr-2 h-5 w-5" />
                  <span
                    className="hidden max-w-[140px] truncate md:inline"
                    title={session.user.name}
                  >
                    {session.user.name}
                  </span>
                  <ChevronDown className="ml-1 hidden h-4 w-4 opacity-60 md:inline" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="space-y-0.5">
                  <div className="leading-none font-medium">
                    {session.user.name}
                  </div>
                  {(session?.user as any)?.email ? (
                    <div className="text-muted-foreground text-xs leading-none">
                      {(session?.user as any)?.email}
                    </div>
                  ) : null}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="cursor-pointer"
                >
                  {signingOut ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="mr-2 h-4 w-4" />
                  )}
                  <span>{signingOut ? "Signing out..." : "Sign out"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </motion.div>
  );
}
