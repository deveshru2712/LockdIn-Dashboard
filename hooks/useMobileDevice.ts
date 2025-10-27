import { useState, useEffect } from "react";

export default function useMobileDevice() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const detectMobile = () => {
      const width = window.innerWidth;
      const isReallySmall = width <= 800;

      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

      setIsMobile(isReallySmall || (hasTouch && width <= 900));
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
