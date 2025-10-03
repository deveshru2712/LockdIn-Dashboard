import { useEffect, useState } from "react";

export function useExtensionInstalled() {
  const [installed, setInstalled] = useState(
    !!window.__BLOCKER_EXTENSION_INSTALLED,
  );

  useEffect(() => {
    const handler = () => setInstalled(true);
    window.addEventListener("blocker-extension-installed", handler);
    return () =>
      window.removeEventListener("blocker-extension-installed", handler);
  }, []);

  return installed;
}
