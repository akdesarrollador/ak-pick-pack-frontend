import { useState, useRef, useEffect } from "react";

type Product = {
  code: string;
  nombre: string;
  cantidad: number;
  lote: string;
  presentacion: string;
  fotoUrl?: string;
  status: string;
};

const PRODUCTS_PER_PAGE = 12;

export function useResponsiveProductPagination(products: Product[]) {
  // Responsive: mobile/sm usa infinite scroll, md+ usa paginación
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop pagination
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = products.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  // Infinite scroll para mobile
  const [mobileProducts, setMobileProducts] = useState<Product[]>(
    products.slice(0, PRODUCTS_PER_PAGE)
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isDesktop) return;
    setMobileProducts(products.slice(0, PRODUCTS_PER_PAGE));
  }, [products, isDesktop]);

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
            setMobileProducts((prev) =>
              products.slice(0, prev.length + PRODUCTS_PER_PAGE)
            );
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

  // Devuelve todo lo necesario
  return {
    isDesktop,
    page,
    setPage,
    totalPages,
    paginatedProducts,
    mobileProducts,
    loadingMore,
    observerRef,
  };
}