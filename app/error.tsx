"use client";
import { useRouter } from "next/navigation";
import ErrorPage from "@/components/ErrorPage";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <ErrorPage
      title="Unexpected Error"
      message={
        error?.message ||
        "Something went wrong while loading this page. Please try again."
      }
      icon="fatal"
      primaryAction={{
        label: "Try Again",
        onClick: () => reset(),
      }}
      secondaryAction={{
        label: "Go Home",
        onClick: () => router.push("/"),
      }}
    />
  );
}
