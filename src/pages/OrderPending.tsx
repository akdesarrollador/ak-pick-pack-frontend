import Calendar from "../svg/Calendar";
import LocationSVG from "../svg/LocationSVG";
import LogoutSVG from "../svg/LogoutSVG";
import MoveLeftIcon from "../svg/LeftIcon";
import CardProductPending from "../components/CardProductPending";
import Spinner from "../svg/Spinner";
import ArrowUpIcon from "../svg/ArrowUpIcon";
import useCompleteScroll from "../hooks/useCompleteScrolls";
import Input from "../components/Input";
import { useResponsiveProductPagination } from "../hooks/useResponsiveProductPagination";
import {
  fakeOrderDate,
  fakeOrderLocation,
  fakeOrderName,
  fakeProducts,
} from "../data/utils";

const OrderPending = () => {
  const { showScrollTop, scrolling, handleScrollTop } = useCompleteScroll(100);

  
  const orderName = fakeOrderName
  const orderDate = fakeOrderDate
  const orderLocation = fakeOrderLocation
  const products = fakeProducts


  // Scroll top hook
  const {
    isDesktop,
    page,
    setPage,
    totalPages,
    paginatedProducts,
    mobileProducts,
    loadingMore,
    observerRef,
  } = useResponsiveProductPagination(products);

  return (
    <div className="flex flex-col items-center px-6 sm:px-4 md:px-8 py-4 min-h-screen bg-[#F9F9F9] relative transition">
      {/* Top bar: back, title, logout */}
      <div className="w-full flex justify-between items-center mb-4 sm:mb-6">
        <button
          aria-label="Volver"
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <MoveLeftIcon stroke="#6E7191" />
        </button>
        <span className="font-semibold text-base sm:text-lg md:hidden text-[#6E7191] text-center flex-1">
          {orderName}
        </span>
        <button
          aria-label="Cerrar sesión"
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <LogoutSVG color="#6E7191" />
        </button>
      </div>

      {/* Card de pedido */}
      {/* Mobile/Tablet */}
      <div className="w-full max-w-2xl mb-4 block md:hidden">
        <div className="grid grid-cols-2 grid-rows-1 py-8 place-items-center bg-gradient-to-r from-[#8642E5] to-[#4800B3] shadow-lg rounded-xl">
          <div className="flex flex-col items-start justify-center gap-4 w-full px-4 sm:px-8">
            {/* Fecha */}
            <div className="flex gap-2 items-center">
              <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
                <Calendar />
              </div>
              <h3 className="text-white text-sm sm:text-base">{orderDate}</h3>
            </div>
            {/* Location */}
            <div className="flex gap-2 items-center">
              <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
                <LocationSVG />
              </div>
              <h3 className="text-white text-sm sm:text-base">
                {orderLocation}
              </h3>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 w-full py-4 sm:py-0">
            <span className="text-white text-4xl sm:text-6xl font-bold">
              {products.length}
            </span>
            <span className="text-white text-base sm:text-xl">Productos</span>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="w-full md:w-10/12 lg:w-8/12 mb-0 hidden md:block">
        <div className="flex flex-col bg-gradient-to-r from-[#8642E5] to-[#4800B3] shadow-lg rounded-xl py-8 px-8">
          <div className="text-white text-3xl font-bold text-center">
            {orderName}
          </div>
        </div>
      </div>
      {/* Info bajo la barra morada SOLO en desktop */}

      <div className="w-full md:w-10/12 lg:w-8/12 hidden md:flex flex-row justify-center items-center gap-4 mt-4 mb-4">
        {/* Cantidad */}
        <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2  shadow">
          <span className="bg-[#F3F0FA] w-10 h-10 rounded-full flex items-center justify-center">
            <ArrowUpIcon className="w-6 h-6 text-[#8642E5]" />
          </span>
          <div className="flex flex-col">
            <span className="text-xs text-[#6E7191]">Total de productos</span>
            <span className="text-lg font-semibold text-black">
              {products.length}
            </span>
          </div>
        </div>
        {/* Fecha */}
        <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2  shadow">
          <span className="bg-[#F3F0FA] w-10 h-10 rounded-full flex items-center justify-center">
            <Calendar />
          </span>
          <div className="flex flex-col">
            <span className="text-xs text-[#6E7191]">Fecha de solicitud</span>
            <span className="text-lg font-semibold text-black">
              {orderDate}
            </span>
          </div>
        </div>
        {/* Ubicación */}
        <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2  shadow">
          <span className="bg-[#F3F0FA] w-10 h-10 rounded-full flex items-center justify-center">
            <LocationSVG />
          </span>
          <div className="flex flex-col">
            <span className="text-xs text-[#6E7191]">Ubicación</span>
            <span className="text-lg font-semibold text-black">
              {orderLocation}
            </span>
          </div>
        </div>
      </div>

      {/* Listado de productos */}
      <div className="w-full flex flex-col md:w-10/12 lg:w-8/12">
        <div className="mb-2">
          <h2 className="md: text-center sm:text-lg font-semibold text-[#6E7191]">
            Listado de productos
          </h2>
        </div>
        {/* Searchbar solo en mobile/sm */}
        <div className="block md:hidden">
          <Input placeholder="Buscar producto..." />
        </div>
        {/* Productos */}
        <div
          className={`
            flex flex-col gap-4 mt-6
            w-full
            sm:grid sm:grid-cols-2 md:grid-cols-3
          `}
        >
          {(isDesktop ? paginatedProducts : mobileProducts).map((product) => (
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
        {/* Infinite scroll loading en mobile */}
        {!isDesktop && (
          <>
            {loadingMore && (
              <div className="w-full flex justify-center items-center py-4 text-primary font-semibold">
                Cargando más productos...
              </div>
            )}
            {/* Observador para infinite scroll */}
            <div ref={observerRef} className="h-1" />
          </>
        )}
      </div>

      {/* Paginación SOLO en desktop */}
      {/* Paginación SOLO en desktop SIEMPRE abajo */}
      <div className="hidden md:flex fixed left-0 bottom-0 w-full justify-center items-center gap-4 py-4 bg-[#F9F9F9] z-40 border-t border-[#ececec]">
        <div className="w-full md:w-10/12 lg:w-8/12 flex justify-center items-center gap-4">
          <button
            className="px-4 py-2 rounded bg-[#8642E5] text-white font-semibold disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Atrás
          </button>
          <span className="text-[#6E7191] font-semibold">
            Página {page} de {totalPages}
          </span>
          <button
            className="px-4 py-2 rounded bg-[#8642E5] text-white font-semibold disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Adelante
          </button>
        </div>
      </div>

      {/* Botón flotante para ir arriba */}
      {showScrollTop && (
        <button
          aria-label="Ir arriba"
          onClick={handleScrollTop}
          className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50 bg-primary text-white rounded-full shadow-lg p-3 hover:bg-primary/90 transition-all flex items-center justify-center"
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
        >
          {scrolling ? <Spinner /> : <ArrowUpIcon />}
        </button>
      )}
    </div>
  );
};

export default OrderPending;
