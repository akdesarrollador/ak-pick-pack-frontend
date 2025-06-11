import React from "react";

interface CardOrderProps {
  code: string;
  numeroPedido: string;
  cantidad: number;
  status: "por empacar" | "empacado";
  maxHeight?: number | string;
}

const statusStyles = {
  "por empacar": "bg-gray-200 text-primary",
  empacado: "bg-gray-200 text-green-600",
};

const CardOrder: React.FC<CardOrderProps> = ({
  code,
  numeroPedido,
  cantidad,
  status,
  maxHeight = 100,
}) => (
  <div
    className={`w-full cursor-pointer hover:opacity-90 hover:scale-105 transition-all bg-white rounded-[16px] shadow-md flex px-4 py-3 items-stretch`}
    style={{ maxHeight, minHeight: 80 }}
  >
    {/* Columna izquierda */}
    <div className="flex flex-col justify-between w-[60%]">
      <div className="text-[#6E7191] text-[11px] font-semibold bg-[#EFF0F6] rounded-md px-2 py-1 w-fit mb-1">
        {code}
      </div>
      <div className="font-bold text-sm text-zinc-800">{numeroPedido}</div>
      <div className="text-[11px] text-[#6E7191] mt-1">
        <span className="font-semibold">Cantidad: </span>
        <span>{cantidad}</span>
      </div>
    </div>
    {/* Columna derecha */}
    <div className="flex flex-col w-[40%] items-end justify-between">
      <div
        className={`rounded-full px-2 py-1 text-[9px] font-semibold mt-1 ${statusStyles[status]}`}
      >
        {status === "por empacar" ? "Por empacar" : "Empacado"}
      </div>
      {/* Espacio vacío para alinear el chip arriba */}
      <div />
    </div>
  </div>
);

export default CardOrder;