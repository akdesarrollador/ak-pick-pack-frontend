import axios from "axios";
import { apiUrl } from "../utils/config.ts";
import useAuthStore from "../stores/useAuthStore.ts";
import { useGlobalStore } from "../stores/useGlobalStore.ts";

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (config?.headers && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log("Respuesta de la API:", response);
    return response;
  },
  async (error) => {
    const { openSnackbar } = useGlobalStore.getState();
    const { onLogout, clean } = useAuthStore.getState();
    const msj =
      error?.response?.data?.mensaje && error?.response?.data?.codigo != 429
        ? error?.response?.data?.mensaje
        : "Error de conexión. Por favor, intente de nuevo en unos segundos.";
    // mostrar mensaje de error
    openSnackbar(msj, "error");
    if (!import.meta.env.PROD) {
      console.error("Error en la petición:", msj);
    }
    // si el error está relacionado con una carencia de autenticación, se redirige a la página principal y se borran los datos del usuario
    if (error?.response?.status == 401) {
      clean();
      window.location.href = "/";
    }
    // si el error está relacionado con una carencia de autorización, se redirige a la página principal y se cierra sesión
    if (error?.response?.status == 403) {
      await onLogout();
      window.location.href = "/";
    }
  }
);