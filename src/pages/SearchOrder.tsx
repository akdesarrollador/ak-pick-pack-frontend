import Input from "../components/Input";
import Button from "../components/Button";
import LogoutSVG from "../svg/LogoutSVG";
import Fondo from "../assets/logo_caja_2.svg";

const SearchOrder = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white md:bg-[#DEDEDE]">
      {/* Botón logout arriba a la derecha */}
      <div className="absolute top-6 right-8 z-20">
        <button
          aria-label="Cerrar sesión"
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <LogoutSVG color="#8642E5" />
        </button>
      </div>

      {/* MOBILE: Card centrado */}
      <div className="relative z-10 w-10/12 flex flex-col items-center justify-center md:hidden">
        {/* HEADER */}
        <div className="flex flex-col gap-3 justify-start w-full">
          <div className="mx-auto flex items-center justify-center">
          <img src={Fondo} className="w-48 mb-8" />

          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-center mt-6 text-fonts">
            Ingrese el código del pedido
          </h1>
        </div>
        {/* INPUT Y BOTON */}
        <div className="mx-auto flex flex-col items-center justify-center gap-3 mt-8 w-full">
          <Input placeholder="000121312121" />
          <div className="mt-4 w-full">
            <Button>Buscar pedidos</Button>
          </div>
        </div>
      </div>

      {/* TABLET/DESKTOP: Card con dos columnas */}
      <div className="hidden md:flex relative z-10 w-[70vw] h-[70vh] bg-white rounded-[16px] shadow-xl overflow-hidden p-0 items-center justify-center">
        {/* Columna izquierda */}
        <div className="flex flex-col justify-center items-center w-[70%] h-full px-12 py-12 bg-white">
          <div className="flex flex-col gap-3 justify-start w-full max-w-md">
            <h1 className="text-3xl font-semibold text-center text-fonts">
              Ingrese el código del pedido
            </h1>
          </div>
          <div className="mx-auto flex flex-col items-center justify-center gap-3 mt-8 w-full max-w-md">
            <Input placeholder="000121312121" />
            <div className="mt-4 w-full">
              <Button>Buscar pedidos</Button>
            </div>
          </div>
        </div>
        {/* Columna derecha */}
        <div className="flex flex-col items-center justify-center w-[40%] h-full rounded-l-none rounded-r-[16px] p-10">
          <img src={Fondo} className="w-48 mb-8" />

          <div className="w-full text-center text-black text-xl font-semibold">
            ¡Bienvenido!
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOrder;