"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ErrorPage from "@/components/ErrorPage";

export default function ErrorWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Error />
    </Suspense>
  );
}

function Error() {
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
      message: "Please sign in again.",
      icon: "auth",
    },
    network: {
      title: "Network Error",
      message: "Unable to connect to the server.",
      icon: "network",
    },
    fatal: {
      title: "Critical Error",
      message: "Something went seriously wrong.",
      icon: "fatal",
    },
    alert: {
      title: "Error",
      message: "An unknown error occurred.",
      icon: "alert",
    },
  };

  const { title, message, icon } = errorConfig[type ?? "alert"];

  return (
    <ErrorPage
      title={title}
      message={message}
      icon={icon}
      primaryAction={{ label: "Go Home", onClick: () => router.push("/") }}
    />
  );
}
