export default async function sendTokenToExtension(token: string) {
  if (!token) return null;

  // Your actual Chrome extension ID
  const EXTENSION_ID = "jplmpjbfgdnhoceoeelbfhjhaedieghh";

  try {
    const response = await chrome.runtime.sendMessage(EXTENSION_ID, {
      type: "SAVE_TOKEN",
      token,
    });

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
