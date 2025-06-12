import React, { useState } from "react";
import LogoLaLider from "../assets/la_lider_1.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import FondoLoginSVG from "../svg/FondoLoginSVG";
import { useMobilePortrait } from "../hooks/useMobilePortrait";
import useAuthStore from "../stores/useAuthStore";
import Loader from "../components/Loader";
import { useGlobalStore } from "../stores/useGlobalStore";
import { useNavigate } from "react-router";

// Custom hook para detectar mobile y portrait

const Login = () => {
  const showSVG = useMobilePortrait();
  const { onLogin } = useAuthStore();
  const { openSnackbar } = useGlobalStore();

  // Estados locales para los inputs y loading
  const [nombre, setNombre] = useState("");
  const [clave, setClave] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  // Manejar submit de login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !clave) {
      openSnackbar("Por favor ingresa usuario y contraseña", "error");
      return;
    }
    setLoading(true);
    try {
      const response = await onLogin({ nombre, clave }, navigate);
      if (response?.codigo === 201 && response?.token) {
        openSnackbar("¡Bienvenido!", "success");
        // window.location.href = "/"; // Redirige al home o dashboard
      } else {
        openSnackbar(response?.mensaje || "Credenciales incorrectas", "error");
      }
    } catch (err) {
      console.log(err)
      openSnackbar("Error al iniciar sesión", "error");
    } finally {
      setLoading(false);
    }
  };

  // Inputs reutilizables
  const renderInputs = () => (
    <>
      <Input
        placeholder="Usuario"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        disabled={loading}
        autoFocus
        // icon={<UserSVG/>}
      />
      <Input
        type="password"
        placeholder="Contraseña"
        value={clave}
        onChange={e => setClave(e.target.value)}
        disabled={loading}
        // icon={<PassSVG/>}
      />
      <div className="mt-4 w-full">
        <Button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center"
        >
          Iniciar sesión
        </Button>
      </div>
    </>
  );

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white md:bg-[#DEDEDE]">
      {/* Loader pantalla completa */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
          <Loader />
        </div>
      )}

      {/* SVG fondo SOLO en mobile y portrait */}
      {showSVG && (
        <FondoLoginSVG
          className="
            absolute top-0 right-0 z-0 pointer-events-none
            w-full
            [@media(min-width:430px)]:w-[100vw]
            [@media(min-width:430px)]:min-w-[430px]
            [@media(min-width:430px)]:max-w-[750px]
            max-h-[334px]
            transition-all
          "
          aria-hidden="true"
        />
      )}

      {/* MOBILE: login centrado */}
      <div className="relative z-10 w-10/12 h-full items-center justify-center flex flex-col -mt-24 sm:-mt-72 md:hidden">
        {/* HEADER */}
        <div className="flex flex-col gap-3 justify-start">
          <div className="mx-auto flex items-center justify-center">
            <img src={LogoLaLider} className="w-48" />
          </div>
          <h1 className="text-3xl font-semibold text-center mt-6 text-fonts">
            Inicio de Sesión
          </h1>
        </div>
        {/* INPUTS Y BOTONES */}
        <form
          className="mx-auto flex flex-col items-center justify-center gap-3 mt-8 w-full"
          onSubmit={handleLogin}
        >
          {renderInputs()}
        </form>
      </div>

      {/* TABLET/DESKTOP: Card con dos columnas */}
      <div className="hidden md:flex relative z-10 w-[70vw] h-[70vh] bg-white rounded-[16px] shadow-xl overflow-hidden p-0">
        {/* Columna izquierda */}
        <div className="flex flex-col justify-center items-center w-[70%] h-full px-12 py-12 bg-white">
          {/* HEADER */}
          <div className="flex flex-col gap-3 justify-start w-full max-w-md">
            <h1 className="text-3xl font-semibold text-center text-fonts">
              Inicio de Sesión
            </h1>
          </div>
          {/* INPUTS Y BOTONES */}
          <form
            className="mx-auto flex flex-col items-center justify-center gap-3 mt-8 w-full max-w-md"
            onSubmit={handleLogin}
          >
            {renderInputs()}
          </form>
        </div>
        {/* Columna derecha */}
        <div className="flex flex-col items-center justify-center w-[40%] h-full bg-primary rounded-l-none rounded-r-[16px] p-10">
          <img src={LogoLaLider} className="w-48 mb-8" />
          <div className="w-full text-center text-white text-xl font-semibold">
            ¡Bienvenido!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;