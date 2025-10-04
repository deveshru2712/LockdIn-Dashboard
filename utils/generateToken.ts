export default async function generateToken(): Promise<string | null> {
  try {
    const res = await fetch("/api/token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`Token API error: ${res.status}`);
      return null;
    }

    const data = await res.json();

    if (data?.success && data?.token) {
      return data.token as string;
    }

    console.error("Failed to generate token:", data?.error || "Unknown error");
    return null;
  } catch (error) {
    console.error("Token generation failed:", error);
    return null;
  }
}
