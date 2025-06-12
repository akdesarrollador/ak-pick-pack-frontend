/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthStoreType, LoginType } from "../types";
import { login, logout } from "../api/auth";
import type { NavigateFunction } from "react-router";
import Routes from "../data/enums/routes";

export interface LoginResponse {
  codigo?: number | string;
  token?: string;
  nombre?: string;
  usuario?: number;
  perfil?: number;
  descripcion?: string;
  identificacion?: string;
  codigoU?: string;
  permisos?: Array<{
    id: number;
    descripcion: string;
  }>;
  administrador?: boolean;
  carrito?: any[];
  mensaje?: string; // Por si el backend envía mensaje de error
}

const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      nombre: null,
      identificacion: null,
      token: null,
      isLoggedIn: false,
      permisos: [],
      perfil: null,
      onLogin: async (
        data: LoginType,
        navigate?: NavigateFunction
      ): Promise<LoginResponse> => {
        const response: LoginResponse = await login(data);
        const { codigo, nombre, identificacion, token, permisos, perfil } =
          response;
        if (codigo === 201 && token) {
          set({
            nombre,
            identificacion,
            token,
            isLoggedIn: true,
            permisos: permisos || [],
            perfil: perfil ?? null,
          });
          // Redirección según perfil usando navigate
          if (navigate) {
            if (perfil === 5) {
              navigate(Routes.PendingProducts, { replace: true });
            } else if (perfil === 6) {
              navigate(Routes.SearchOrders, { replace: true });
            }
          }
        }
        return response;
      },
      onLogout: async (): Promise<void> => {
        try {
          await logout();
        } finally {
          set({
            nombre: null,
            identificacion: null,
            token: null,
            isLoggedIn: false,
            permisos: [],
            perfil: null,
          });
        }
      },
      clean: (): void => {
        set({
          nombre: null,
          identificacion: null,
          token: null,
          isLoggedIn: false,
          permisos: [],
          perfil: null,
        });
      },
    }),
    { name: "auth-storage-dll" }
  )
);

export default useAuthStore;
