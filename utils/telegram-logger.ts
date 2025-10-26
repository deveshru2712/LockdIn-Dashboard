import { sendErrorMessageToTelegram } from "@/lib/telegram/action";

export const telegramLogger = async (errorMessage: string, error?: unknown) => {
  try {
    const isClient = typeof window !== "undefined";
    const screenWidth = isClient ? window.innerWidth : null;
    const screenHeight = isClient ? window.innerHeight : null;
    const userBrowserName = isClient
      ? getUserBrowserName(navigator.userAgent)
      : null;

    const timestamp = new Date().toISOString();

    const errorDetails =
      error instanceof Error
        ? formatErrorDetails(error)
        : typeof error === "string"
          ? error
          : "Unknown error";

    const message = `🚨 Error Alert
──────────────
📋 Message: ${errorMessage}
⏰ Timestamp: ${timestamp}
🧭 Environment: ${isClient ? "Client" : "Server"}
🌐 Browser: ${userBrowserName || "N/A"}
📱 Screen: ${screenWidth && screenHeight ? `${screenWidth}x${screenHeight}px` : "N/A"}
──────────────
🔍 Error Details:
${errorDetails}`;

    await sendErrorMessageToTelegram({
      errorMessage: message,
      timestamp,
      browserName: userBrowserName,
      screenWidth,
      screenHeight,
      errorDetails,
    });
  } catch (loggingError) {
    console.error("Failed to send error to Telegram:", loggingError);
  }
};

const formatErrorDetails = (error: Error): string => {
  if (!error.stack) return `${error.name}: ${error.message}`;
  const lines = error.stack.split("\n").slice(0, 4);
  return lines.map((line) => line.trim()).join("\n→ ");
};

const getUserBrowserName = (userAgent: string): string => {
  if (userAgent.includes("Firefox")) return "Mozilla Firefox";
  if (userAgent.includes("SamsungBrowser")) return "Samsung Internet";
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
  if (userAgent.includes("Edge")) return "Microsoft Edge (Legacy)";
  if (userAgent.includes("Edg")) return "Microsoft Edge (Chromium)";
  if (userAgent.includes("Chrome")) return "Google Chrome or Chromium";
  if (userAgent.includes("Safari")) return "Apple Safari";
  return "unknown";
};
