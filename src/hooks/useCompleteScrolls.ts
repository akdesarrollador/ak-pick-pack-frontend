import { useState, useEffect, useCallback } from "react";

function useCompleteScroll(threshold = 100) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  // Mostrar/ocultar botón según scroll
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  // Manejar animación de scroll arriba
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
  }, [scrolling]);

  // Acción para ir arriba
  const handleScrollTop = useCallback(() => {
    setScrolling(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { showScrollTop, scrolling, handleScrollTop };
}

export default useCompleteScroll;