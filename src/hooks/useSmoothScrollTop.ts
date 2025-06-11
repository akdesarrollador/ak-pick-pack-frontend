import { useEffect } from "react";

function useSmoothScrollTop(scrolling: boolean, setScrolling: (v: boolean) => void) {
  useEffect(() => {
    if (!scrolling) return;
    const check = () => {
      if (window.scrollY <= 10) {
        setScrolling(false);
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  }, [scrolling, setScrolling]);
}

export default useSmoothScrollTop;