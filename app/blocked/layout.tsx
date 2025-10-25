import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Blocked - LockdIn",
  description:
    "This site has been blocked by LockdIn to help you stay focused and productive. You can manage your blocked websites anytime from the LockdIn Dashboard.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://lockdin.in/blocked",
  },
  openGraph: {
    title: "Site Blocked - LockdIn",
    description:
      "Stay focused. This site has been blocked by LockdIn to prevent distractions and improve your productivity.",
    type: "website",
    url: "https://lockdin.in/blocked",
    siteName: "LockdIn",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LockdIn Site Blocked",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Site Blocked - LockdIn",
    description:
      "This site has been blocked by LockdIn to help you stay focused. Manage your blocklist in the dashboard.",
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
