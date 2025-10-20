import { Link } from "react-router-dom";
import { FileText, CalendarDays, User } from "lucide-react";

export default function ContractCard({ contrato }) {
  return (
    <div
      className="relative flex flex-col bg-white rounded-2xl border border-[#e7e2dc]
                 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5"
    >
      {/* Header: Nombre y usuario */}
      <div className="flex flex-col items-center text-center gap-2">
        <div className="p-3 rounded-full bg-[#611232]/10">
          <User className="text-[#611232]" size={22} />
        </div>
        <h3 className="text-[#611232] font-semibold text-lg leading-tight">
          {contrato.usuario.nombre}
        </h3>
        <p className="text-sm text-gray-500">{contrato.usuario.email}</p>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#e2dcd5] to-transparent" />

      {/* Body info */}
      <div className="flex flex-col items-center gap-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <CalendarDays className="text-[#611232]" size={16} />
          <span>
            {new Date(contrato.firmadoEn).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <p className="text-gray-500">
          Estado:{" "}
          <span className="text-[#d4af37] font-semibold capitalize">
            {contrato.estadoSolicitud}
          </span>
        </p>
      </div>

      {/* Footer con botones */}
      <div className="mt-5 flex flex-col sm:flex-row justify-center items-center gap-3">
        <Link
          to={`/admin/signed-contracts/${contrato.contratoId}`}
          className="px-4 py-2 bg-[#611232] text-white rounded-lg text-sm font-medium 
                     hover:bg-[#4c0e27] transition-colors"
        >
          Ver contrato
        </Link>
      </div>
    </div>
  );
}
