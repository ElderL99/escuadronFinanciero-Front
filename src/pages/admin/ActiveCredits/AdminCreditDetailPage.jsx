import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  X,
  FileDown,
  Loader2,
} from "lucide-react";
import useFetchPayments from "../../../hooks/admin/useFetchpayments";
import useApprovePayment from "../../../hooks/admin/useApprovePayments";
import useRejectPayment from "../../../hooks/admin/useRejectPayments";
import useCreditContract from "../../../hooks/admin/useCreditContract";

export default function AdminCreditDetailPage() {
  const { creditId } = useParams();
  const { payments, loading, error, setPayments } = useFetchPayments(creditId);
  const { approve, loading: approving } = useApprovePayment();
  const { reject, loading: rejecting } = useRejectPayment();

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [reason, setReason] = useState("");

  const {
    contractUrl,
    loading: loadingContract,
    fetchContractUrl,
  } = useCreditContract();

  const handleApprove = async (num) => {
    await approve(creditId, num);
    setPayments((prev) =>
      prev.map((p) => (p.number === num ? { ...p, status: "paid" } : p))
    );
  };

  const handleRejectSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) return alert("Debes ingresar un motivo de rechazo.");
    await reject(creditId, selectedPayment, reason);
    setPayments((prev) =>
      prev.map((p) =>
        p.number === selectedPayment
          ? { ...p, status: "rejected", rejectionReason: reason }
          : p
      )
    );
    setReason("");
    setShowRejectModal(false);
  };

  const handleDownloadContract = async () => {
    try {
      const response = await getAdminCreditContract(creditId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `contrato_${creditId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Contrato descargado exitosamente");
    } catch (error) {
      toast.error("Error al descargar el contrato");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-[#611232]/70">
        <Loader2 className="animate-spin mr-2" size={20} />
        Cargando pagos...
      </div>
    );

  if (error) return <p className="text-center text-red-600 py-6">{error}</p>;

  return (
    <section className="p-6 max-w-4xl mx-auto space-y-6">
      {/* 🔙 Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#611232]">
          Pagos del crédito
        </h1>
        <Link
          to="/admin/active-credits"
          className="flex items-center gap-2 text-[#611232]/70 hover:text-[#611232] font-medium"
        >
          <ArrowLeft size={18} />
          Volver
        </Link>
      </div>

      {/* 📄 Botón Descargar Contrato */}
      <div className="flex justify-center mb-6">
        {!contractUrl ? (
          <button
            onClick={() => fetchContractUrl(creditId)}
            className="flex items-center gap-2 bg-[#611232] text-white px-4 py-2 rounded-lg hover:bg-[#4a0f27] transition shadow-md"
            disabled={loadingContract}
          >
            {loadingContract ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <FileDown size={18} />
            )}
            Obtener enlace del contrato
          </button>
        ) : (
          <a
            href={contractUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#d4af37] text-white px-4 py-2 rounded-lg hover:bg-[#c39e31] transition shadow-md"
          >
            <FileDown size={18} />
            Descargar contrato
          </a>
        )}
      </div>

      {/* 💰 Lista de pagos */}
      {payments.map((pago) => (
        <div
          key={pago.number}
          className="bg-white border border-[#e6e0da] rounded-2xl shadow-sm hover:shadow-md 
                     transition-all duration-300 p-5 flex flex-col sm:flex-row justify-between 
                     items-start sm:items-center gap-4"
        >
          <div className="flex flex-col gap-1">
            <p className="text-[#611232] font-semibold text-lg">
              Pago #{pago.number}
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-medium text-[#611232]">Monto:</span>{" "}
              {Number(pago.amount).toLocaleString("es-MX", {
                style: "currency",
                currency: "MXN",
              })}
            </p>

            {/* 🗓️ Fecha de pago */}
            {pago.date && (
              <p
                className={`text-sm font-medium ${
                  pago.status === "paid"
                    ? "text-green-600"
                    : new Date(pago.date) >= new Date()
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Fecha de pago:{" "}
                {new Date(pago.date).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                {pago.status !== "paid" && (
                  <span
                    className={`ml-2 text-xs font-semibold ${
                      new Date(pago.date) < new Date()
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {new Date(pago.date) < new Date() ? "Vencido" : "En tiempo"}
                  </span>
                )}
              </p>
            )}

            {/* Estado con color */}
            <p className="flex items-center gap-1 text-sm mt-1">
              {pago.status === "paid" && (
                <>
                  <CheckCircle2 className="text-green-600" size={16} />
                  <span className="text-green-600 font-medium">Pagado</span>
                </>
              )}
              {pago.status === "pending" && (
                <>
                  <Clock className="text-amber-500" size={16} />
                  <span className="text-amber-600 font-medium">Pendiente</span>
                </>
              )}
              {pago.status === "rejected" && (
                <>
                  <XCircle className="text-red-500" size={16} />
                  <span className="text-red-600 font-medium">Rechazado</span>
                </>
              )}
              {pago.status === "submitted" && (
                <>
                  <Clock className="text-blue-500" size={16} />
                  <span className="text-blue-600 font-medium">En revisión</span>
                </>
              )}
            </p>

            {pago.rejectionReason && (
              <p className="text-xs text-red-500 mt-1 italic">
                Motivo: {pago.rejectionReason}
              </p>
            )}
          </div>

          {/* 🔘 Acciones */}
          <div className="flex flex-wrap items-center gap-2">
            {pago.signedUrl && (
              <a
                href={pago.signedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#611232] hover:text-[#8b204a] underline"
              >
                Ver comprobante
              </a>
            )}

            {pago.status === "submitted" && (
              <>
                <button
                  onClick={() => handleApprove(pago.number)}
                  disabled={approving}
                  className="bg-[#d4af37] hover:bg-[#c39e31] text-white text-sm px-3 py-1 rounded-md shadow-sm transition-all"
                >
                  {approving ? "Aprobando..." : "Aprobar"}
                </button>

                <button
                  onClick={() => {
                    setSelectedPayment(pago.number);
                    setShowRejectModal(true);
                  }}
                  disabled={rejecting}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-md shadow-sm transition-all"
                >
                  Rechazar
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {/* 🟥 Modal de rechazo */}
      {showRejectModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowRejectModal(false)}
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold text-[#611232] mb-4">
              Rechazar pago #{selectedPayment}
            </h2>
            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Motivo del rechazo
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  className="w-full border text-black border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#611232]/50"
                  placeholder="Escribe el motivo aquí..."
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowRejectModal(false)}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={rejecting}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium shadow-sm"
                >
                  {rejecting ? "Rechazando..." : "Confirmar rechazo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
