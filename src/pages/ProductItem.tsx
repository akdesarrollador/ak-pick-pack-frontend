import React, { useState } from "react";
import Box from "../svg/Box";
import MoveLeftIcon from "../svg/LeftIcon";
import LogoutSVG from "../svg/LogoutSVG";
import Button from "../components/Button";

const ProductItem = () => {
  // Estado para el contador
  const [cantidad, setCantidad] = useState(0);

  // Datos de ejemplo (puedes reemplazar por props o datos reales)
  const nombreProducto = "Nombre del producto";
  const imagenProducto = ""; // URL de la imagen
  const cantidadRequerida = 6;

  const handleRestar = () => {
    setCantidad((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleSumar = () => {
    setCantidad((prev) => prev + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) setCantidad(value);
    if (e.target.value === "") setCantidad(0);
  };

  return (
    <div className="min-h-screen w-full bg-[#DEDEDE] flex flex-col items-center justify-center">
      {/* MOBILE: Todo igual que antes */}
      <div className="w-full flex md:hidden flex-col flex-1 bg-[#F9F9F9]">
        {/* NAVBAR ICONOS */}
        <div className="w-full flex justify-between items-center px-6 pt-4 z-20">
          <button
            aria-label="Volver"
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <MoveLeftIcon stroke="#6E7191" />
          </button>
          <button
            aria-label="Cerrar sesión"
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <LogoutSVG color="#6E7191" />
          </button>
        </div>

        {/* Contenido principal */}
        <section className="flex-1 w-full flex flex-col items-center justify-around gap-2">
          {/* Imagen principal con nombre */}
          <div className="flex flex-col items-center mt-2">
            <div className="w-32 h-32 rounded-xl flex items-center justify-center overflow-hidden mb-2">
              {imagenProducto ? (
                <img
                  src={imagenProducto}
                  alt={nombreProducto}
                  className="object-cover w-full h-full"
                />
              ) : (
                <Box width={64} height={64} color="#C7C7C7" />
              )}
            </div>
            <h1 className="text-2xl font-normal text-[#6E7191] text-center">
              {nombreProducto}
            </h1>
            <div className="w-full flex flex-col gap-1 mt-3">
              <h2 className="text-[#6E7191] font-semibold text-md text-start">
                Lote:
              </h2>
              <h2 className="text-[#6E7191] font-semibold text-md text-start">
                Presentación:
              </h2>
            </div>
          </div>

          {/* Cantidad requerida */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center bg-primary rounded-full h-10 w-10">
              <Box />
            </div>
            <div className="flex flex-col">
              <span className="text-[#6E7191] text-lg">Cantidad requerida</span>
              <span className="text-[#6E7191] text-xl font-bold text-start">
                {cantidadRequerida} Unidades
              </span>
            </div>
          </div>

          {/* Cantidad disponible (contador) */}
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-[#6E7191] text-lg font-semibold mb-1">
              Cantidad disponible
            </h2>
            <div className="flex items-center gap-3">
              {/* Botón menos */}
              <button
                onClick={handleRestar}
                className="bg-primary rounded-full w-10 h-10 flex items-center justify-center"
                type="button"
              >
                <span className="text-white text-2xl font-semibold">-</span>
              </button>
              {/* Input */}
              <input
                type="text"
                value={cantidad}
                onChange={handleInputChange}
                className="w-16 h-10 text-center  border-gray-300 rounded-md text-lg font-semibold text-[#6E7191] bg-transparent outline-primary"
                inputMode="numeric"
                pattern="[0-9]*"
              />
              {/* Botón más */}
              <button
                onClick={handleSumar}
                className="bg-primary  rounded-full w-10 h-10 flex items-center justify-center"
                type="button"
              >
                <span className="text-white text-2xl font-semibold">+</span>
              </button>
            </div>
          </div>

          {/* Botones de atras o siguiente */}
          <div className="flex items-center justify-between gap-5 w-full px-10 mt-8 mb-4">
            <Button variant="outline">Atrás</Button>
            <Button variant="fill">Siguiente</Button>
          </div>
        </section>
      </div>

      {/* DESKTOP: Card centrada 70vw x 70vh */}
      <div className="hidden md:flex w-[70vw] h-[70vh] bg-white rounded-[16px] shadow-xl items-stretch justify-center">
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full px-16 ">
          {/* Imagen principal con nombre */}
          <div className="flex flex-row items-center justify-center gap-8 mt-2 w-full max-w-2xl ">
            {/* Imagen */}
            <div className="w-1/3 rounded-xl flex items-center justify-end overflow-hidden ">
              {imagenProducto ? (
                <img
                  src={imagenProducto}
                  alt={nombreProducto}
                  className="object-cover w-full h-full"
                />
              ) : (
                <Box width={64} height={64} color="#C7C7C7" />
              )}
            </div>
            {/* Info */}
            <div className="flex flex-col justify-center gap-2 flex-1  h-full w-2/3">
              <h1 className="text-2xl font-bold text-[#6E7191] text-left">
                {nombreProducto}
              </h1>
              <div className="flex flex-col gap-1 mt-1">
                <h2 className="text-[#6E7191] font-semibold text-md text-left">
                  Lote: <span className="font-normal">L12345</span>
                </h2>
                <h2 className="text-[#6E7191] font-semibold text-md text-left">
                  Presentación: <span className="font-normal">Caja x 12</span>
                </h2>
              </div>
            </div>
          </div>

          {/* Cantidad requerida */}
          <div className="flex items-center justify-center gap-3 mt-6  ">
            <div className="flex items-center justify-center bg-primary rounded-full h-12 w-12">
              <Box />
            </div>
            <div className="flex flex-col">
              <span className="text-[#6E7191] text-lg">Cantidad requerida</span>
              <span className="text-[#6E7191] text-xl font-bold text-start">
                {cantidadRequerida} Unidades
              </span>
            </div>
          </div>

          {/* Cantidad disponible (contador) */}
          <div className="flex flex-col items-center gap-2 mt-6">
            <h2 className="text-[#6E7191] text-lg font-semibold mb-1">
              Cantidad disponible
            </h2>
            <div className="flex items-center gap-3">
              {/* Botón menos */}
              <button
                onClick={handleRestar}
                className="bg-primary rounded-full w-10 h-10 flex items-center justify-center"
                type="button"
              >
                <span className="text-white text-2xl font-semibold">-</span>
              </button>
              {/* Input */}
              <input
                type="text"
                value={cantidad}
                onChange={handleInputChange}
                className="w-16 h-10 text-center  rounded-md text-lg font-semibold text-[#6E7191] bg-white outline-primary"
                inputMode="numeric"
                pattern="[0-9]*"
              />
              {/* Botón más */}
              <button
                onClick={handleSumar}
                className="bg-primary rounded-full w-10 h-10 flex items-center justify-center"
                type="button"
              >
                <span className="text-white text-2xl font-semibold">+</span>
              </button>
            </div>
          </div>

          {/* Botones de atras o siguiente */}
          <div className="flex items-center justify-between gap-5 w-full px-10 mt-8 mb-4">
            <Button variant="outline">Atrás</Button>
            <Button variant="fill">Siguiente</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
