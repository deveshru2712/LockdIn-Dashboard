import React from "react";
import AuthCard from "@/components/auth/AuthCard";
import { UserLock } from "lucide-react";

export default function page() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="font-boldz flex items-center gap-2 self-center text-3xl">
          <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
            <UserLock className="size-4" />
          </div>
          Lock In.
        </h1>
        <AuthCard />
      </div>
    </div>
  );
}
