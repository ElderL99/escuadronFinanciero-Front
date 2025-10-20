import { PiggyBank } from "lucide-react";
import PaymentList from "./PaymentList";

export default function ActiveCreditCard({ credito }) {
  const total = Number(credito.monto) + Number(credito.interes);

  return (
    <div
      className="bg-white border border-[#e6e0da] rounded-2xl shadow-md 
                 p-5 hover:shadow-lg transition-all duration-300 flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#611232]/10">
            <PiggyBank className="text-[#611232]" size={20} />
          </div>
          <p className="font-semibold text-[#611232] text-sm md:text-base">
            {credito.usuario.nombre}
          </p>
        </div>
        <span className="text-[#d4af37] text-xs font-medium">
          {credito.modalidad.toUpperCase()}
        </span>
      </div>

      {/* 💰 Datos financieros */}
      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-semibold text-[#611232]">Monto: </span>
          {Number(credito.monto).toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          })}
        </p>

        <p>
          <span className="font-semibold text-[#611232]">Interés: </span>
          {Number(credito.interes).toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN",
          })}
        </p>

        <p>
          <span className="font-semibold text-[#611232]">Total a pagar: </span>
          <span className="text-[#d4af37] font-semibold">
            {total.toLocaleString("es-MX", {
              style: "currency",
              currency: "MXN",
            })}
          </span>
        </p>
      </div>

      {/* 📅 Plan de pagos */}
      <PaymentList pagos={credito.pagos} />
    </div>
  );
}
