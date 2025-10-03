import { useEffect, useState } from "react";

export function useExtensionInstalled() {
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setInstalled(!!window.__BLOCKER_EXTENSION_INSTALLED);
    }
  }, []);

  return installed;
}
