import MoveLeftIcon from "../svg/LeftIcon";
import LogoutSVG from "../svg/LogoutSVG";
import CardProductPending from "../components/CardProductPending";
import Spinner from "../svg/Spinner";
import useCompleteScroll from "../hooks/useCompleteScrolls";
import { useResponsiveProductList } from "../hooks/useResponsiveProductList";
import { fakeProducts, fakeOrderName } from "../data/utils";
import Button from "../components/Button";
import DesktopPagination from "../components/DesktopPagination";
import ScrollTopButton from "../components/ScrollTopButton";

const TotalItems = () => {
  // Scroll top hook
  const { showScrollTop, scrolling, handleScrollTop } = useCompleteScroll(100);

  // Productos y paginación/infinite scroll
  const products = fakeProducts;
  const {
    isDesktop,
    mobileProducts,
    loadingMore,
    observerRef,
    paginatedProducts,
    page,
    totalPages,
    goToPrevPage,
    goToNextPage,
  } = useResponsiveProductList(products);

  // Ejemplo de conteo de completos/incompletos (ajusta según tu lógica)
  const completos = products.filter((p) => p.status === "completo").length;
  const incompletos = products.filter((p) => p.status === "incompleto").length;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-[#F9F9F9] px-4 py-4 relative">
      {/* Top bar */}
      <div className="w-full flex justify-between items-center mb-4">
        <button
          aria-label="Volver"
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <MoveLeftIcon stroke="#6E7191" />
        </button>
        <span className="font-semibold text-base sm:text-lg md:hidden text-[#6E7191] text-center flex-1">
          {fakeOrderName}
        </span>
        <button
          aria-label="Cerrar sesión"
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <LogoutSVG color="#6E7191" />
        </button>
      </div>

      {/* Resumen */}
      <section className="w-full max-w-2xl grid grid-cols-2 gap-4 mb-6">
        {/* Productos */}
        <div className="flex flex-col items-center justify-center bg-primary rounded-xl py-3">
          <span className="text-5xl font-bold text-white">
            {products.length}
          </span>
          <span className="text-white text-base">Productos</span>
        </div>
        {/* Completos e incompletos */}
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <div className="w-full flex bg-[#60D25D] flex-col items-center justify-center text-white px-2 py-2 rounded-xl">
            <span className="text-3xl font-bold">{completos}</span>
            <span>Completo(s)</span>
          </div>
          <div className="w-full flex bg-[#DA5D64] flex-col items-center justify-center text-white px-2 py-2 rounded-xl">
            <span className="text-3xl font-bold">{incompletos}</span>
            <span>Incompleto(s)</span>
          </div>
        </div>
      </section>

      {/* Listado de productos */}
      <div className="w-full md:w-9/12 max-w-4xl flex flex-col">
        <div className="mb-2">
          <h2 className="text-center text-xl font-semibold text-[#6E7191]">
            Listado de productos
          </h2>
        </div>

        {/* Productos */}
        <div
          className={`
    flex flex-col gap-4 mt-2
    w-full
    sm:grid sm:grid-cols-2 md:grid-cols-3
    ${!isDesktop ? "mb-[96px]" : ""}
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
          {/* Infinite scroll loading en mobile: SIEMPRE visible al final del listado */}
          {!isDesktop && loadingMore && (
            <div className="w-full col-span-full flex justify-center items-center py-4 text-primary font-semibold bg-[#F9F9F9]">
              <Spinner />
              Cargando más productos...
            </div>
          )}
          {/* El observer debe ir después del loading para que siempre funcione */}
          {!isDesktop && <div ref={observerRef} className="h-1" />}
        </div>

        {/* Paginación SOLO en desktop, ahora dentro del flujo */}
        {isDesktop && (
          <DesktopPagination
            page={page}
            totalPages={totalPages}
            goToPrevPage={goToPrevPage}
            goToNextPage={goToNextPage}
          />
        )}
      </div>

      {/* Botón flotante para ir arriba */}
    <ScrollTopButton
  show={showScrollTop}
  scrolling={scrolling}
  onClick={handleScrollTop}
  isDesktop={isDesktop}
/>

      {/* Botones de acción abajo sticky en mobile, estático en desktop */}
      <div
        className={`
    w-full max-w-2xl flex justify-between items-center gap-4
    ${
      isDesktop
        ? ""
        : "fixed left-0 right-0 bottom-0 z-40 bg-[#F9F9F9] px-4 pb-3 pt-4 shadow-[0_-2px_16px_rgba(0,0,0,0.07)]"
    }
  `}
      >
        <Button variant="outline">Atras</Button>
        <Button>Confirmar</Button>
      </div>
    </div>
  );
};

export default TotalItems;
