import { useEffect, useState } from "react";

type MtByHeight = { [key: number]: string };

export function useResponsiveMarginTop(mtByHeight: MtByHeight, defaultClass = "mt-20") {
  const [mtClass, setMtClass] = useState(defaultClass);

  useEffect(() => {
    function updateMargin() {
      const h = window.innerHeight;
      const sorted = Object.keys(mtByHeight).map(Number).sort((a, b) => a - b);
      let found = defaultClass;
      for (let i = 0; i < sorted.length; i++) {
        if (h >= sorted[i]) {
          found = mtByHeight[sorted[i]];
        }
      }
      setMtClass(found);
    }
    updateMargin();
    window.addEventListener("resize", updateMargin);
    return () => window.removeEventListener("resize", updateMargin);
  }, [mtByHeight, defaultClass]);

  return mtClass;
}