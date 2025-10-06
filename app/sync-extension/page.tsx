"use client";
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
  const [status, setStatus] = useState("Syncing with Chrome extension...");

  useEffect(() => {
    const syncToken = async () => {
      try {
        const token = await generateToken();

        if (!token) {
          setStatus("❌ Failed to generate token (not logged in?)");
          return;
        }

        const response = await sendTokenToExtension(token);
        console.log("Extension response:", response);

        if (response?.ok) {
          setStatus("✅ Synced successfully with Chrome extension!");
          router.push("/");
        } else {
          // toast about moving forward locally
          setStatus("❌ Failed to sync with extension");
        }
      } catch (err) {
        console.error("Sync failed:", err);
        setStatus("❌ Unexpected error syncing with extension");
      }
    };

    syncToken();
  }, []);

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
            <span>{status}</span>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
