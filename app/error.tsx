"use client";

import { Suspense } from "react";
import ErrorPage from "@/components/Error/ErrorPage";

export default function ErrorWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Error />
    </Suspense>
  );
}

function Error() {
  return (
    <ErrorPage
      title="Something Went Wrong"
      message="An unexpected error occurred. Please try again later."
      icon="fatal"
    />
  );
}
