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
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    default: "LockdIn – Block Distracting Websites & Boost Focus",
    template: "%s | LockdIn Dashboard",
  },
  description:
    "LockdIn helps you stay focused by blocking distracting websites, tracking your screen time, and boosting productivity. Manage your focus sessions with the LockdIn Chrome extension and dashboard — your ultimate tool for deep work and distraction-free productivity.",
  keywords: [
    // 🔹 Core branding
    "LockdIn",
    "LockdIn Dashboard",
    "LockdIn Chrome Extension",

    // 🔹 Productivity & focus
    "productivity extension",
    "website blocker",
    "focus app",
    "focus booster",
    "distraction blocker",
    "stay focused app",
    "deep work tool",
    "focus timer",
    "Pomodoro alternative",
    "digital wellbeing extension",
    "focus productivity tool",
    "productivity companion",

    // 🔹 Chrome-related
    "Chrome productivity extension",
    "Chrome focus extension",
    "Chrome website blocker",
    "Chrome focus mode",
    "best productivity Chrome extension",
    "block distracting websites Chrome",
    "Chrome extension for students",
    "focus Chrome extension",

    // 🔹 Time management
    "time management app",
    "screen time manager",
    "study focus extension",
    "student productivity tool",
    "remote work productivity app",
    "work from home focus app",
    "focus and study tool",
    "time tracking dashboard",

    // 🔹 Problem-solving / user intent
    "how to stop wasting time online",
    "how to block distracting websites",
    "tools to stay focused while studying",
    "reduce procrastination",
    "apps to block social media",
    "stay productive online Chrome extension",
    "how to manage screen time on Chrome",
    "how to improve focus and productivity",
    "extension to stay focused",
    "tools to fight procrastination",

    // 🔹 Behavior / mindset
    "self discipline app",
    "mindful productivity",
    "digital detox app",
    "concentration booster",
    "distraction-free workflow",
    "deep work productivity",
    "habit tracker extension",
    "healthy work routine",
    "focus habit builder",
    "creator productivity tool",

    // 🔹 Lifestyle & background
    "modern productivity dashboard",
    "clean minimalist UI",
    "modern focus app",
    "responsive productivity web app",
    "privacy friendly extension",
    "intuitive dashboard experience",
    "motivational focus extension",
    "study focus Chrome extension",
    "work focus dashboard",
    "focus session tracker",
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
    title: "LockdIn – Block Distractions & Boost Productivity",
    description:
      "Stay focused and productive with LockdIn — a Chrome extension and dashboard that helps you block time-wasting websites and manage your focus sessions effortlessly.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LockdIn – Productivity Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LockdIn – Boost Your Focus & Block Distractions",
    description:
      "Enhance your productivity with LockdIn — block distracting sites, track your focus, and stay on task with our Chrome extension and web dashboard.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://lockdin.in",
  },
  category: "Productivity",
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
      className={`${geistSans.variable} ${inter.variable} ${jakarta.variable} ${libre.variable}`}
    >
      <body className="min-h-screen antialiased">
        <Overlay />
        <main className="relative z-10">{children}</main>
        <Toaster richColors position="bottom-center" />
      </body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
