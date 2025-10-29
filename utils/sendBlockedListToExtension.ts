import { telegramLogger } from "./telegram-logger";

export default async function sendBlockedSitesToExtension(
  blockedSites: string[],
  session?: boolean,
) {
  if (!Array.isArray(blockedSites)) {
    return { success: false, error: "Invalid blockedSites array" };
  }

  const payload = session
    ? {
        type: "UPDATE_SESSION_BLOCKED_SITES",
        sessionBlockedSites: blockedSites,
      }
    : { type: "UPDATE_BLOCKED_SITES", blockedSites };

  try {
    const response = await chrome.runtime.sendMessage(
      process.env.NEXT_PUBLIC_EXTENSION_ID,
      payload,
    );
    return response;
  } catch (error) {
    await telegramLogger(
      "error while sending blocked list to the extension",
      error,
    );
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
