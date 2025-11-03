import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUserCreditById from "../../../../hooks/user/useUserCreditById";
import useUploadPayment from "../../../../hooks/user/useUploadPayment";
import {
  Upload,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

export default function UserCreditDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { credit, fetchCreditById, loading, error } = useUserCreditById();
  const { uploadTicket, loading: uploading } = useUploadPayment();

  useEffect(() => {
    if (id) fetchCreditById(id);
  }, [id, fetchCreditById]);

  const handleUpload = async (paymentNumber, file) => {
    if (!file) return;
    await uploadTicket(id, paymentNumber, file);
    await fetchCreditById(id); // refrescar datos
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#611232]">
        <Loader2 className="animate-spin w-8 h-8 mb-2" />
        <p>Cargando detalle del crédito...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-gray-600 mt-10">
        <p>{error}</p>
      </div>
    );

  if (!credit)
    return (
      <div className="text-center text-gray-600 mt-10">
        <p>No se encontró la información del crédito.</p>
      </div>
    );

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      {/* 🔙 Botón Volver */}
      <button
        onClick={() => navigate("/user/creditos")}
        className="flex items-center gap-2 text-[#611232] mb-6 hover:text-[#4a0f27] transition"
      >
        <ArrowLeft size={18} /> Volver a mis créditos
      </button>

      <h1 className="text-2xl font-semibold text-[#611232] mb-6 text-center">
        Detalle del Crédito #{credit._id.slice(-6).toUpperCase()}
      </h1>

      <div className="bg-white border border-[#e8e2dc] rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-[#611232] mb-2">
          Plan de Pagos
        </h2>

        <div className="space-y-4">
          {credit.planPagos.map((pago) => (
            <div
              key={pago.numero}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#e8e2dc] pb-3"
            >
              <div>
                <p className="text-sm font-medium text-[#1a1a1a]">
                  Pago #{pago.numero} — ${pago.monto.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  Fecha: {new Date(pago.fecha).toLocaleDateString("es-MX")}
                </p>

                {/* 🔹 Si fue rechazado, mostrar motivo */}
                {pago.estado === "rejected" && pago.rechazo && (
                  <div className="mt-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-start gap-2">
                    <AlertTriangle className="text-red-600 w-4 h-4 mt-0.5" />
                    <div>
                      <p className="text-sm text-red-700 font-medium">
                        Comprobante rechazado
                      </p>
                      <p className="text-xs text-red-600 italic">
                        Motivo: {pago.rechazo}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 🔹 Acciones según estado */}
              <div className="flex items-center gap-3 mt-3 sm:mt-0">
                {pago.estado === "paid" || pago.estado === "approved" ? (
                  <span className="flex items-center gap-1 text-green-600 text-sm">
                    <CheckCircle size={16} /> Pagado
                  </span>
                ) : pago.estado === "submitted" ? (
                  <span className="flex items-center gap-1 text-amber-600 text-sm">
                    <Clock size={16} /> En revisión
                  </span>
                ) : (
                  <>
                    <input
                      type="file"
                      id={`file-${pago.numero}`}
                      className="hidden"
                      onChange={(e) =>
                        handleUpload(pago.numero, e.target.files[0])
                      }
                    />
                    <label
                      htmlFor={`file-${pago.numero}`}
                      className={`flex items-center gap-2 cursor-pointer bg-[#611232] text-white text-xs px-3 py-2 rounded-lg hover:bg-[#4a0f27] transition ${
                        uploading ? "opacity-60" : ""
                      }`}
                    >
                      <Upload size={14} />
                      {uploading
                        ? "Subiendo..."
                        : pago.estado === "rejected"
                        ? "Reenviar ticket"
                        : "Subir ticket"}
                    </label>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
