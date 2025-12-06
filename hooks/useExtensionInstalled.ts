import { useEffect, useState } from "react";

export function useExtensionInstalled() {
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.__BLOCKER_EXTENSION_INSTALLED) {
      setInstalled(true);
      return;
    }

    const handler = () => setInstalled(true);
    window.addEventListener("blocker-extension-installed", handler);

    return () => {
      window.removeEventListener("blocker-extension-installed", handler);
    };
  }, []);

  return installed;
}
