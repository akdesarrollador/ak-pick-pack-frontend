/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import FondoPendingOrders from "../svg/FondoPendingOrders";
import LogoutSVG from "../svg/LogoutSVG";
// import { useMobilePortrait } from "../hooks/useMobilePortrait";
import Input from "../components/Input";
import CardOrder from "../components/CardOrder";
import MoveLeftIcon from "../svg/LeftIcon";
import { useResponsiveMarginTop } from "../hooks/useResponsiveMarginTop";
import BoxTime from "../svg/BoxTime";
import useShowScrollTop from "../hooks/useShowScrollTop";
import useInfiniteOrders from "../hooks/useInfiniteOrders";
import { mtByHeightPendingORders } from "../data/constants";
import Spinner from "../svg/Spinner";
import ArrowUpIcon from "../svg/ArrowUpIcon";

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
  const mtClass = useResponsiveMarginTop(mtByHeightPendingORders);

  const { orders, loading, observerRef } =
    useInfiniteOrders(fetchOrdersFromAPI);

  const [scrolling, setScrolling] = useState(false);

  const showScrollTop = useShowScrollTop(100);

  const handleScrollTop = () => {
    setScrolling(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  return (
    <div className="relative w-full min-h-screen flex items-start justify-center bg-[#F9F9F9]">
      {/* NAVBAR ICONOS */}
      <div className="absolute w-full md:w-8/12 mx-auto mt-2  flex justify-between items-center px-6 z-20">
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
        style={{ minHeight: 180, maxHeight: 210 }}
        aria-hidden="true"
      />

      {/* Encabezado */}
      <div className="absolute top-12 left-0 w-full flex flex-col items-center z-10">
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
          <span className="text-white text-4xl font-semibold drop-shadow-md">
            Pedidos pendientes
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div
        className={`relative z-10 md:w-8/12 flex flex-col items-center justify-center ${mtClass}`}
      >
        <span className="text-[#6E7191] text-lg font-semibold mb-3 w-full text-left sm:hidden">
          Selecciona un pedido
        </span>
        <span className="text-[#6E7191] text-lg font-semibold mb-3 w-full text-center hidden sm:block">
          Selecciona un pedido ({orders.length})
        </span>
        <Input placeholder="Buscar pedido..." />

        {/* Cards de pedidos */}
        <div
          className={`
            flex gap-4 mt-6
            flex-col
            w-full
            sm:grid sm:grid-cols-2 md:grid-cols-3
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
        </div>

        {/* Cargando más pedidos... SIEMPRE ABAJO */}
        {loading && (
          <div className="w-full flex justify-center items-center py-4 text-primary font-semibold">
            Cargando más pedidos...
          </div>
        )}

        {/* Observador para infinite scroll */}
        <div ref={observerRef} className="h-1 md:col-span-2" />
      </div>

      {/* Botón flotante para ir arriba */}
      {showScrollTop && (
        <button
          aria-label="Ir arriba"
          onClick={handleScrollTop}
          className="fixed bottom-8 right-8 z-50 bg-primary text-white rounded-full shadow-lg p-3 hover:bg-primary/90 transition-all flex items-center justify-center"
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
        >
          {scrolling ? <Spinner /> : <ArrowUpIcon />}
        </button>
      )}
    </div>
  );
};

export default PendingOrders;
