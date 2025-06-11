import { useLayoutEffect, useState } from "react";

function useShowScrollTop(threshold = 100) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useLayoutEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return showScrollTop;
}

export default useShowScrollTop