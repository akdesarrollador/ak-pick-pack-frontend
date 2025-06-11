import { useEffect, useState } from "react";

export function useMobilePortrait() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    function check() {
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      const isMobile = window.innerWidth < 768; // md breakpoint
      setShow(isPortrait && isMobile);
    }
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  return show;
}