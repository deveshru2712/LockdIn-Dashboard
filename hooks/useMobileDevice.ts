import { useState, useEffect } from "react";

export default function useMobileDevice() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const detectMobile = () => {
      const ua = navigator.userAgent || navigator.vendor || "";
      const isMobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const smallScreen =
        Math.max(window.innerWidth, window.innerHeight) <= 800;

      setIsMobile(isMobileUA || (hasTouch && smallScreen));
    };

    detectMobile();

    window.addEventListener("resize", detectMobile);

    // Cleanup
    return () => window.removeEventListener("resize", detectMobile);
  }, []);

  return isMobile;
}
