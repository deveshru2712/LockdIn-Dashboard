import type { Metadata } from "next";
import {
  Geist,
  Inter,
  Plus_Jakarta_Sans,
  Libre_Baskerville,
} from "next/font/google";
import "./globals.css";
import Overlay from "@/components/Overlay";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const libre = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://lockdin.in"),
  title: "LockdIn Dashboard - Stay Focused and Productive",
  description:
    "LockdIn helps you stay focused by blocking distracting websites. Manage your productivity with our powerful dashboard and browser extension.",
  keywords: [
    "productivity",
    "focus",
    "website blocker",
    "time management",
    "distraction blocker",
  ],
  authors: [{ name: "Devesh Chandra" }],
  creator: "LockdIn",
  publisher: "LockdIn",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lockdin.in",
    siteName: "LockdIn",
    title: "LockdIn Dashboard - Stay Focused and Productive",
    description:
      "LockdIn helps you stay focused by blocking distracting websites. Manage your productivity with our powerful dashboard and browser extension.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LockdIn Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LockdIn Dashboard - Stay Focused and Productive",
    description:
      "LockdIn helps you stay focused by blocking distracting websites. Manage your productivity with our powerful dashboard and browser extension.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://lockdin.in",
  },
};

// Root layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} overflow-hidden ${inter.variable} ${jakarta.variable} ${libre.variable}`}
    >
      <body className="antialiased">
        <Overlay />
        <div className="relative z-10">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
