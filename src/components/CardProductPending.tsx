import React from "react";

interface CardProductPendingProps {
  fotoUrl?: string;
  nombre: string;
  cantidad: number;
  lote: string;
  presentacion: string;
  maxHeight?: number | string;
}

const CardProductPending: React.FC<CardProductPendingProps> = ({
  fotoUrl,
  nombre,
  cantidad,
  lote,
  presentacion,
  maxHeight = 100,
}) => (
  <div
    className="w-full cursor-pointer hover:opacity-90 hover:scale-105 transition-all bg-white rounded-[16px] shadow-md flex px-4 py-3 items-stretch"
    style={{ maxHeight, minHeight: 80 }}
  >
    {/* Foto producto */}
    <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 shrink-0">
      {fotoUrl ? (
        <img src={fotoUrl} alt={nombre} className="object-cover w-full h-full" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
          <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 17l4.5-4.5a2 2 0 012.8 0L17 17" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
          </svg>
        </div>
      )}
    </div>
    {/* Info producto */}
    <div className="flex flex-col justify-between flex-1">
      <div className="font-bold text-sm text-zinc-800">{nombre}</div>
      <div className="text-[11px] text-[#6E7191] mt-1">
        <span>Cantidad: {cantidad}</span>
        <span className="mx-2 text-gray-300">|</span>
        <span>Lote: {lote}</span>
      </div>
      <div className="text-[11px] text-[#6E7191]">
        <span>Presentación: {presentacion}</span>
      </div>
    </div>
  </div>
);

export default CardProductPending;