/* eslint-disable @typescript-eslint/no-explicit-any */
export type Product = {
  code: string;
  nombre: string;
  cantidad: number;
  lote: string;
  presentacion: string;
  fotoUrl?: string;
  status: string;
};

export type OrderPendingProps = {
  orderName: string;
  orderDate: string;
  orderLocation: string;
  products: Product[];
};

export interface AuthStoreType {
  nombre: string | null;
  identificacion: string | null;
  token: string | null;
  isLoggedIn: boolean;
  permisos: Array<{ id: number; descripcion: string }>;
  perfil: number | null;
  onLogin: (data: LoginType, navigate?: import("react-router-dom").NavigateFunction) => Promise<LoginResponse>;
  onLogout: () => Promise<void>;
  clean: () => void;
}

export interface LoginType {
    nombre: string | any,
    clave: string | any
}