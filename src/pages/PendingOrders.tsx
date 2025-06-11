/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef, useCallback } from "react";
import FondoPendingOrders from "../svg/FondoPendingOrders";
import LogoutSVG from "../svg/LogoutSVG";
// import { useMobilePortrait } from "../hooks/useMobilePortrait";
import Input from "../components/Input";
import CardOrder from "../components/CardOrder";
import MoveLeftIcon from "../svg/LeftIcon";
import { useResponsiveMarginTop } from "../hooks/useResponsiveMarginTop";
import BoxTime from "../svg/BoxTime";

// Mapeo de altura de pantalla a clases de margin
const mtByHeight: { [key: number]: string } = {
  300: "mt-72",
  400: "mt-60",
  500: "mt-60",
  667: "mt-56",
  750: "mt-56",
  800: "mt-52",
  850: "mt-56",
  900: "mt-56",
  950: "mt-56",
  1000: "mt-56",
};

// Simulación de API (remplaza por fetch real)
async function fetchOrdersFromAPI(page: number) {
  const statusOptions = ["por empacar", "empacado"] as const;
  return new Promise<
    {
      code: string;
      numeroPedido: string;
      cantidad: number;
      status: (typeof statusOptions)[number];
    }[]
  >((resolve) => {
    setTimeout(() => {
      const more = Array.from({ length: 10 }).map((_, i) => ({
        code: `00${page}-${i + 1}`,
        numeroPedido: `Pedido #${Math.floor(Math.random() * 1000000)}`,
        cantidad: Math.floor(Math.random() * 10) + 1,
        status: statusOptions[Math.random() > 0.5 ? 0 : 1],
      }));
      resolve(more);
    }, 1000);
  });
}

const PendingOrders = () => {
  // const showSVG = useMobilePortrait();
  const mtClass = useResponsiveMarginTop(mtByHeight);

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
  }, [loading, page, hasMore]);

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

  return (
    <div className="relative w-full min-h-screen flex items-start justify-center bg-[#F9F9F9] ">
      {/* NAVBAR ICONOS */}
      <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-6 z-20">
        <button
          aria-label="Volver"
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <MoveLeftIcon stroke="#fff" />
        </button>
        <button
          aria-label="Cerrar sesión"
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <LogoutSVG color="#fff" />
        </button>
      </div>

      {/* Fondo SVG SIEMPRE visible y creciendo */}
      <FondoPendingOrders
        className="absolute top-0 right-0 z-0 pointer-events-none w-full max-w-none h-auto transition-all"
        style={{ minHeight: 180, maxHeight: 230 }}
        aria-hidden="true"
      />

      {/* Encabezado */}
         <div className="absolute top-16 md:top-12 left-0 w-full flex flex-col items-center z-10">
        {/* SOLO EN MÓVIL: título + cantidad */}
        <span className="block md:hidden text-white text-xl drop-shadow-md">
          Pedidos pendientes
        </span>
        <span className="block md:hidden text-white text-6xl font-bold drop-shadow-md mt-2">
          {orders.length}
        </span>
        {/* SOLO EN TABLET/DESKTOP: solo título, más grande y con icono */}
        <div className="hidden md:flex items-center gap-4">
          <BoxTime width={100} height={100} />
          <span className="text-white text-5xl md:text-5xl font-semibold drop-shadow-md">
            Pedidos pendientes
          </span>
          
        </div>
      </div>

      {/* Contenido */}
      <div
        className={`relative z-10 w-10/12 max-w-xl flex flex-col items-center justify-start ${mtClass}`}
      >
        <span className="text-[#6E7191] text-lg font-semibold mb-3 w-full text-left sm:hidden">
          Selecciona un pedido
        </span>
        <span className="text-[#6E7191] text-lg font-semibold mb-3 w-full text-center hidden sm:block">
          Selecciona un pedido {orders.length}
        </span>
        <Input placeholder="Buscar pedido..." />

        {/* Cards de pedidos */}
        <div
          className={`
            flex gap-4 mt-6 w-full
            flex-col
            sm:grid sm:grid-cols-2
          `}
        >
          {orders.map((order) => (
            <CardOrder
              key={order.code + order.numeroPedido}
              code={order.code}
              numeroPedido={order.numeroPedido}
              cantidad={order.cantidad}
              status={order.status}
            />
          ))}

          {loading && (
            <div className="w-full flex justify-start items-center py-4 text-primary font-semibold">
              Cargando más pedidos...
            </div>
          )}

          {/* Observador para infinite scroll */}
          <div ref={observerRef} className="h-1 md:col-span-2" />
        </div>
      </div>
    </div>
  );
};

export default PendingOrders;
