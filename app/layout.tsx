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
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const libre = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lockdin.in"),
  title: {
    default: "LockdIn Dashboard – Boost Focus & Productivity",
    template: "%s | LockdIn Dashboard",
  },
  description:
    "LockdIn Dashboard helps you manage blocked sites, monitor focus sessions, and stay productive with seamless integration to the LockdIn Chrome extension.",
  keywords: [
    "LockdIn",
    "productivity dashboard",
    "focus tracker",
    "website blocker",
    "chrome extension companion",
    "time management",
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
    title: "LockdIn Dashboard – Boost Focus & Productivity",
    description:
      "A productivity dashboard to manage and sync your LockdIn Chrome extension settings.",
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
    title: "LockdIn Dashboard – Boost Focus & Productivity",
    description:
      "Manage focus sessions, blocked sites, and productivity insights with LockdIn Dashboard — the web companion for your Chrome extension.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://lockdin.in",
  },
  category: "productivity",
  applicationName: "LockdIn Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${inter.variable} ${jakarta.variable} ${libre.variable} scroll-smooth`}
    >
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Overlay />
        <main className="relative z-10 min-h-screen">{children}</main>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
