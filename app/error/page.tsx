"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ErrorPage from "@/components/ErrorPage";

export default function Error() {
  const params = useSearchParams();
  const router = useRouter();
  const type = params.get("type");

  const errorConfig: Record<
    string,
    {
      title: string;
      message: string;
      icon: "auth" | "network" | "fatal" | "alert";
    }
  > = {
    auth: {
      title: "Authentication Error",
      message: "Please sign in again to continue.",
      icon: "auth",
    },
    network: {
      title: "Network Error",
      message: "Unable to connect to the server. Check your connection.",
      icon: "network",
    },
    fatal: {
      title: "Critical Error",
      message: "Something went seriously wrong. Please restart the app.",
      icon: "fatal",
    },
  };

  const { title, message, icon } = errorConfig[type ?? "alert"];

  return (
    <ErrorPage
      title={title}
      message={message}
      icon={icon}
      primaryAction={{
        label: "Go Home",
        onClick: () => router.push("/"),
      }}
    />
  );
}
