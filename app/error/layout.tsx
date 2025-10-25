import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error - LockdIn",
  description: "An error occurred while using LockdIn. Please try again or contact support if the issue persists.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://lockdin.in/error",
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
