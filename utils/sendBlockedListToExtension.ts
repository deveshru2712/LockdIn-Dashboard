export default async function sendBlockedSitesToExtension(
  blockedSites: string[],
  session?: boolean,
) {
  try {
    if (!Array.isArray(blockedSites)) {
      throw new Error("Invalid blockedSites array");
    }

    const payload = session
      ? {
          type: "UPDATE_SESSION_BLOCKED_SITES",
          sessionBlockedSites: blockedSites,
        }
      : { type: "UPDATE_BLOCKED_SITES", blockedSites };

    const response = await chrome.runtime.sendMessage(
      process.env.NEXT_PUBLIC_EXTENSION_ID,
      payload,
    );

    console.log("🔁 Extension response:", response);
    return response;
  } catch (error) {
    console.error("❌ Failed to send blocked sites to extension:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
