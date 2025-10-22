import { Link } from "react-router-dom";
import { PiggyBank, FileText, User } from "lucide-react";

export default function ActiveCreditCard({ credito }) {
  const total = Number(credito.monto) + Number(credito.interes);
  const requestId = credito.application?.request?._id;
  const userId = credito.application?.request?.user;

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
        <span className="text-[#d4af37] text-xs font-medium uppercase">
          {credito.modalidad}
        </span>
      </div>

      {/* Detalles del crédito */}
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

      {/* IDs */}
      <div className="text-xs text-gray-500 mt-2 space-y-1 break-all">
        {/* 🔗 Request ID (linkeado en nueva pestaña) */}
        <p className="flex items-center gap-1">
          <FileText size={12} className="text-[#611232]" />
          <span className="font-medium">Request ID:</span>{" "}
          {requestId ? (
            <a
              href={`/admin/applications/${requestId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#611232] font-semibold hover:underline hover:text-[#8b204a] truncate max-w-[170px] sm:max-w-none"
            >
              {requestId}
            </a>
          ) : (
            <span className="italic text-gray-400">N/A</span>
          )}
        </p>

        {/* 🧍 User ID (solo texto por ahora) */}
        <p className="flex items-center gap-1">
          <User size={12} className="text-[#611232]" />
          <span className="font-medium">User ID:</span>{" "}
          <span className="truncate max-w-[170px] sm:max-w-none">
            {userId || "N/A"}
          </span>
        </p>
      </div>

      {/* Enlace a pagos */}
      <div className="pt-3 border-t border-[#e6e0da] text-right">
        <Link
          to={`/admin/active-credits/${credito.creditoId}`}
          className="text-sm font-semibold text-[#d4af37] hover:text-[#b7950b] hover:underline transition-colors"
        >
          Ver pagos →
        </Link>
      </div>
    </div>
  );
}
