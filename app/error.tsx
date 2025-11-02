"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import ErrorPage from "@/components/Error/ErrorPage";

export default function ErrorWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Error />
    </Suspense>
  );
}

function Error() {
  const router = useRouter();

  return (
    <ErrorPage
      title="Something Went Wrong"
      message="An unexpected error occurred. Please try again later."
      icon="fatal"
      primaryAction={{
        label: "Go Home",
        onClick: () => router.push("/"),
      }}
    />
  );
}
