"use client";
import { syncLocalWithDb } from "@/components/main/Blocker/actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import generateToken from "@/utils/generateToken";
import sendTokenToExtension from "@/utils/sendTokenToExtension";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [status, setStatus] = useState("🔄 Starting sync process...");

  useEffect(() => {
    const syncProcess = async () => {
      try {
        setStatus("Generating secure token...");
        const token = await generateToken();

        if (!token) {
          setStatus("Failed to generate token (not logged in?)");
          return;
        }

        setStatus("Syncing with Chrome extension...");
        const response = await sendTokenToExtension(token);

        if (!response?.ok) {
          setStatus("Failed to sync with Chrome extension");
          return;
        }

        setStatus("✅ Extension connected successfully!");

        setStatus(" Reading local blocked websites...");
        const localBlockedWebsite = localStorage.getItem("blocked-website");
        const localBlockedWebsiteArr = localBlockedWebsite
          ? JSON.parse(localBlockedWebsite)
          : [];

        if (localBlockedWebsiteArr.length > 0) {
          setStatus("Syncing blocked websites with database...");
          const result = await syncLocalWithDb(localBlockedWebsiteArr);

          if (result?.success) {
            setStatus(`✅ Synced `);
          } else {
            setStatus("Partial sync completed or error occurred.");
          }
        } else {
          setStatus("No local blocked websites to sync.");
        }

        setStatus("Redirecting to dashboard...");
        setTimeout(() => router.push("/"), 1500);
      } catch (err) {
        console.error("Sync failed:", err);
        setStatus("Unexpected error during sync.");
      }
    };

    syncProcess();
  }, [router]);

  return (
    <main className="flex h-dvh w-full items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="tracking-tight text-balance">
            Syncing with Extension
          </CardTitle>
          <CardDescription className="text-pretty">
            Linking your account and extension settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="bg-muted/40 rounded-lg border px-3 py-2">
              <p className="text-muted-foreground text-xs">
                This usually takes just a moment. You can keep this tab open.
              </p>
            </div>
            <span className="text-sm font-medium whitespace-pre-line">
              {status}
            </span>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
