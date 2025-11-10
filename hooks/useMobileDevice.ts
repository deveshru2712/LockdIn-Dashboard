import { useState, useEffect } from "react";

export default function useMobileDevice() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const detectMobile = () => {
      const width = window.innerWidth;
      const isReallySmall = width <= 800;

      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

      // More comprehensive iPad detection
      const isIPad =
        /iPad/.test(navigator.userAgent) ||
        (/Macintosh/.test(navigator.userAgent) && hasTouch) ||
        (navigator.platform === "MacIntel" && hasTouch);

      // Expanded tablet size range (iPad Air 6 is 820px portrait, 1180px landscape)
      const isTabletSize = width > 800 && width <= 1366 && hasTouch;

      // Check for pointer coarse (touch-primary devices)
      const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

      setIsMobile(
        isReallySmall ||
          isIPad ||
          isTabletSize ||
          (hasTouch && width <= 900) ||
          (hasCoarsePointer && width <= 1366),
      );
    };

    detectMobile();

    window.addEventListener("resize", detectMobile);
    window.addEventListener("orientationchange", detectMobile);

    return () => {
      window.removeEventListener("resize", detectMobile);
      window.removeEventListener("orientationchange", detectMobile);
    };
  }, []);

  return isMobile;
}
