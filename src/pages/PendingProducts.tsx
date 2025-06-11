/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import FondoPendingOrders from "../svg/FondoPendingOrders";
import LogoutSVG from "../svg/LogoutSVG";
import Input from "../components/Input";
import MoveLeftIcon from "../svg/LeftIcon";
import { useResponsiveMarginTop } from "../hooks/useResponsiveMarginTop";
import BoxTime from "../svg/BoxTime";
import useShowScrollTop from "../hooks/useShowScrollTop";
import useInfiniteOrders from "../hooks/useInfiniteOrders";
import CardProductPending from "../components/CardProductPending";
import useSmoothScrollTop from "../hooks/useSmoothScrollTop";
import { mtByHeight } from "../data/constants";
import ArrowUpIcon from "../svg/ArrowUpIcon";
import Spinner from "../svg/Spinner";

// Simulación de API (remplaza por fetch real)
async function fetchProductsFromAPI(page: number) {
  return new Promise<
    {
      code: string;
      nombre: string;
      cantidad: number;
      lote: string;
      presentacion: string;
      fotoUrl?: string;
      status: string;
    }[]
  >((resolve) => {
    setTimeout(() => {
      const more = Array.from({ length: 10 }).map((_, i) => ({
        code: `P${page}-${i + 1}`,
        nombre: `Producto #${Math.floor(Math.random() * 1000000)}`,
        cantidad: Math.floor(Math.random() * 10) + 1,
        lote: `L${Math.floor(Math.random() * 10000)}`,
        presentacion: "Caja x 12",
        fotoUrl: undefined, // Puedes poner una url si tienes
        status: Math.random() > 0.5 ? "pendiente" : "listo",
      }));
      resolve(more);
    }, 1000);
  });
}

const PendingProducts = () => {
  const mtClass = useResponsiveMarginTop(mtByHeight);

  const {
    orders: products,
    loading,
    observerRef,
  } = useInfiniteOrders(fetchProductsFromAPI);

  const showScrollTop = useShowScrollTop(100);
  const handleScrollTop = () => {
    setScrolling(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [scrolling, setScrolling] = useState(false);
  useSmoothScrollTop(scrolling, setScrolling);

  return (
    <div className="relative w-full min-h-screen flex items-start justify-center bg-[#F9F9F9]">
      {/* NAVBAR ICONOS */}
      <div className="absolute w-full md:w-8/12 mx-auto mt-2 flex justify-between items-center px-6 z-20">
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
          Listado de productos
        </span>
        <span className="block md:hidden text-white text-6xl font-bold drop-shadow-md mt-2">
          {products.length}
        </span>
        {/* SOLO EN TABLET/DESKTOP: solo título, más grande y con icono */}
        <div className="hidden md:flex items-center gap-4">
          <BoxTime width={100} height={100} />
          <span className="text-white text-4xl font-semibold drop-shadow-md">
            Listado de productos
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div
        className={`relative z-10 md:w-8/12 flex flex-col items-center justify-center ${mtClass}`}
      >
        <span className="text-[#6E7191] text-lg font-semibold mb-3 w-full text-left sm:hidden">
          Selecciona un producto
        </span>
        <span className="text-[#6E7191] text-lg font-semibold mb-3 w-full text-center hidden sm:block">
          Selecciona un producto ({products.length})
        </span>
        <Input placeholder="Buscar producto..." />

        {/* Cards de productos */}
        <div
          className={`
            flex gap-4 mt-6
            flex-col
            w-full
            sm:grid sm:grid-cols-2 md:grid-cols-3
          `}
        >
          {products.map((product) => (
            <CardProductPending
              key={product.code + product.nombre}
              fotoUrl={product.fotoUrl}
              nombre={product.nombre}
              cantidad={product.cantidad}
              lote={product.lote}
              presentacion={product.presentacion}
            />
          ))}
        </div>

        {/* Cargando mas productos */}
        {loading && (
          <div className="w-full flex justify-center items-center py-4 text-primary font-semibold">
            Cargando más productos...
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

export default PendingProducts;
