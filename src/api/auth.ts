import { api } from "./axios";

interface dto {
  nombre: string;
  clave: string;
}

export const login = async (dto: dto) => {
  const response = await api.post("/auth/login", {
    nombre: dto.nombre,
    clave: dto.clave,
  });

  return response.data;
};

export const getUsuario = async () => {
  const response = await api.get("/auth/usuario");
  return response.data;
};

export const logout = async () => {
  const response = await api.delete("/auth/logout");
  return response.data;
};
