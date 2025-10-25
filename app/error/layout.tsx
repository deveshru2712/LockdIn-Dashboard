import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error - LockdIn Dashboard",
  description:
    "An unexpected error occurred while using the LockdIn Dashboard. Please refresh the page or contact support if the issue persists.",
  robots: {
    index: false, // prevents accidental indexing
    follow: false,
  },
  alternates: {
    canonical: "https://lockdin.in/error",
  },
  openGraph: {
    title: "Error - LockdIn Dashboard",
    description:
      "Something went wrong while using LockdIn. Please try again later.",
    url: "https://lockdin.in/error",
    type: "website",
    siteName: "LockdIn",
  },
  twitter: {
    card: "summary",
    title: "Error - LockdIn Dashboard",
    description:
      "An unexpected issue occurred while using LockdIn. Please try again or contact support.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
          {children}
        </main>
      </body>
    </html>
  );
}
