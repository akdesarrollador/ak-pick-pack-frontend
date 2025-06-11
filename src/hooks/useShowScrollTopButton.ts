import { useState, useCallback } from "react";
import useShowScrollTop from "./useShowScrollTop";

/**
 * Hook para manejar el botón de scroll top con animación suave.
 * @param offset - Altura desde la que se muestra el botón (por defecto 100)
 * @returns { showScrollTop, scrolling, handleScrollTop, setScrolling }
 */
function useScrollTopButton(offset = 100) {
  const [scrolling, setScrolling] = useState(false);
  const showScrollTop = useShowScrollTop(offset);

  const handleScrollTop = useCallback(() => {
    setScrolling(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Animación suave para saber cuándo terminó el scroll
    const check = () => {
      if (window.scrollY <= 10) {
        setScrolling(false);
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  }, []);

  return { showScrollTop, scrolling, handleScrollTop, setScrolling };
}

export default useScrollTopButton;