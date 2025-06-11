/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";

function useInfiniteOrders(fetchOrdersFromAPI: (page: number) => Promise<any[]>) {
  const [orders, setOrders] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchOrders = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const newOrders = await fetchOrdersFromAPI(page);
    setOrders((prev) => [...prev, ...newOrders]);

    if (newOrders.length === 0) {
      setHasMore(false);
    } else {
      setPage((prev) => prev + 1);
    }

    setLoading(false);
  }, [loading, page, hasMore, fetchOrdersFromAPI]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchOrders();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [fetchOrders]);

  return { orders, loading, hasMore, observerRef };
}

export default useInfiniteOrders