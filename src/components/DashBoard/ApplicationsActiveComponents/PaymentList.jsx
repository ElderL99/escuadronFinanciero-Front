import { CheckCircle2 } from "lucide-react";

export default function PaymentList({ pagos }) {
  if (!pagos?.length)
    return <p className="text-gray-500 text-sm">Sin pagos registrados.</p>;

  return (
    <div className="mt-3 border-t border-[#e6e0da] pt-3">
      <p className="text-sm font-medium text-gray-600 mb-2">Plan de pagos:</p>

      <ul className="text-xs text-gray-700 space-y-1 max-h-32 overflow-y-auto">
        {pagos.map((pago) => (
          <li
            key={pago.numero}
            className="flex justify-between items-center border-b border-gray-100 pb-1"
          >
            <span>
              Pago {pago.numero}:{" "}
              {new Date(pago.fecha).toLocaleDateString("es-MX", {
                day: "2-digit",
                month: "short",
              })}
            </span>
            <span
              className={`flex items-center gap-1 ${
                pago.estado === "paid" ? "text-green-600" : "text-amber-600"
              }`}
            >
              <CheckCircle2 size={14} />
              {pago.estado === "paid" ? "Pagado" : "Pendiente"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
