import { useState, useRef, useEffect, useCallback } from "react";

const PRODUCTS_PER_PAGE = 12;

export function useResponsiveProductList<T>(products: T[]) {
  // Responsive: mobile/sm usa infinite scroll, md+ usa paginación
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Infinite scroll para mobile
  const [mobileProducts, setMobileProducts] = useState<T[]>(products.slice(0, PRODUCTS_PER_PAGE));
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Reset mobile products cuando cambian los productos o el modo
  useEffect(() => {
    if (isDesktop) return;
    setMobileProducts(products.slice(0, PRODUCTS_PER_PAGE));
  }, [products, isDesktop]);

  // IntersectionObserver para infinite scroll
  useEffect(() => {
    if (isDesktop) return;
    if (!observerRef.current) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loadingMore &&
          mobileProducts.length < products.length
        ) {
          setLoadingMore(true);
          setTimeout(() => {
            setMobileProducts((prev) => products.slice(0, prev.length + PRODUCTS_PER_PAGE));
            setLoadingMore(false);
          }, 600);
        }
      },
      { rootMargin: "0px", threshold: 1 }
    );
    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
    // eslint-disable-next-line
  }, [loadingMore, mobileProducts.length, products, isDesktop]);

  // Paginación para desktop
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!isDesktop) setPage(1);
  }, [isDesktop, products]);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = products.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  // Handler para cambiar de página
  const goToPrevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const goToNextPage = useCallback(() => setPage((p) => Math.min(totalPages, p + 1)), [totalPages]);

  return {
    isDesktop,
    mobileProducts,
    loadingMore,
    observerRef,
    paginatedProducts,
    page,
    setPage,
    totalPages,
    goToPrevPage,
    goToNextPage,
  };
}