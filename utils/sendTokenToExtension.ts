export default async function sendTokenToExtension(token: string) {
  if (!token) return null;

  try {
    const response = await chrome.runtime.sendMessage(
      process.env.NEXT_PUBLIC_EXTENSION_ID,
      {
        type: "SAVE_TOKEN",
        token,
      },
    );

    if (response?.success) {
      console.log("✅ Token saved successfully in extension storage");
      return { ok: true };
    } else {
      console.error("❌ Extension responded with error:", response);
      return { ok: false, error: response?.error || "Unknown error" };
    }
  } catch (err) {
    console.error("⚠️ Could not connect to extension:", err);
    return { ok: false, error: "Extension not reachable" };
  }
}
