import type { Product } from "../types";

// --- Simulación de datos ---
function generateFakeProducts(total: number): Product[] {
  return Array.from({ length: total }).map((_, i) => ({
    code: `P${i + 1}`,
    nombre: `Producto #${Math.floor(Math.random() * 1000000)}`,
    cantidad: Math.floor(Math.random() * 10) + 1,
    lote: `L${Math.floor(Math.random() * 10000)}`,
    presentacion: "Caja x 12",
    fotoUrl: undefined,
    status: Math.random() > 0.5 ? "pendiente" : "listo",
  }));
}

const fakeOrderName = "Pedido #41212";
const fakeOrderDate = "27/06/2025";
const fakeOrderLocation = "Galpon III";
const fakeProducts = generateFakeProducts(37);


export {generateFakeProducts, fakeOrderDate, fakeOrderName, fakeOrderLocation, fakeProducts}