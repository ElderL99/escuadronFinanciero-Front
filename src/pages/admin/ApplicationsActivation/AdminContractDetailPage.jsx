import { Link, useParams, useNavigate } from "react-router-dom";
import useAdminContractById from "../../../hooks/admin/useAdminContractById";
import useActivateCredit from "../../../hooks/admin/useActiveCredit";
import {
  FileText,
  ClipboardList,
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect } from "react";
import ActivateCreditSection from "../../../components/DashBoard/contractsComponents/ActivateCredutSection";
import useCancelSignedContract from "@/hooks/admin/useCancelSignedContract";

export default function AdminContractDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contract, loading, error } = useAdminContractById(id);

  const {
    activateCredit,
    loading: activating,
    error: activateError,
    success,
  } = useActivateCredit();

  const {
    cancelContract,
    loading: cancelling,
    error: cancelError,
    success: cancelSuccess,
  } = useCancelSignedContract();

  const handleActivate = async () => {
    await activateCredit(contract.requestId);
  };

  const handleCancel = async (reason) => {
    await cancelContract(id, reason);
  };

  // ✅ Navegar SOLO cuando el backend confirma éxito
  useEffect(() => {
    if (success) {
      navigate("/admin/active-credits");
    }
  }, [success, navigate]);

  useEffect(() => {
    if (cancelSuccess) {
      navigate("/admin/signed-contracts");
    }
  }, [cancelSuccess, navigate]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-[#611232]/70">
        Cargando contrato...
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 text-center py-6 font-medium">
        {error || "Error al cargar contrato"}
      </div>
    );

  if (!contract)
    return (
      <div className="text-gray-500 text-center py-6">
        No se encontró el contrato solicitado.
      </div>
    );

  return (
    <>
      <section className="p-6">
        {/* 🔙 Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#611232] tracking-wide">
            Detalle del Contrato
          </h1>
          <Link
            to="/admin/signed-contracts"
            className="flex items-center gap-2 text-[#611232]/70 hover:text-[#611232] font-medium transition-colors text-sm md:text-base"
          >
            <ArrowLeft size={18} />
            Volver a contratos
          </Link>
        </div>

        {/* 💎 Card principal */}
        <div className="bg-white rounded-3xl border border-[#e6e0da] shadow-lg max-w-4xl mx-auto p-8 flex flex-col gap-8">
          {/* ID del contrato */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#eae5df] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#611232]/10">
                <FileText className="text-[#611232]" size={24} />
              </div>
              <div>
                <p className="text-sm md:text-base text-gray-500">
                  ID del Contrato
                </p>
                <p className="font-semibold text-[#611232] text-xs md:text-lg">
                  {contract.contratoId}
                </p>
              </div>
            </div>

            <div className="mt-4 sm:mt-0">
              <p className="text-sm md:text-base text-gray-500">Estado</p>
              <p className="flex items-center gap-2 text-[#d4af37] font-semibold text-sm md:text-lg">
                <CheckCircle size={18} />
                {contract.signed ? "Firmado" : "No firmado"}
              </p>
            </div>
          </div>

          {/* Solicitud relacionada */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#eae5df] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#d4af37]/10">
                <ClipboardList className="text-[#d4af37]" size={22} />
              </div>
              <div>
                <p className="text-sm md:text-base text-gray-500">
                  Solicitud relacionada
                </p>
                <a
                  href={`/admin/applications/${contract.requestId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#611232] hover:text-[#8b204a] font-semibold text-xs md:text-base transition-colors underline"
                >
                  {contract.requestId}
                </a>
              </div>
            </div>
          </div>

          {/* Info adicional */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contract.signedAt && (
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#611232]/10">
                  <CalendarDays className="text-[#611232]" size={22} />
                </div>
                <div>
                  <p className="text-sm md:text-base text-gray-500">
                    Fecha de firma
                  </p>
                  <p className="text-gray-800 font-medium text-sm md:text-lg">
                    {new Date(contract.signedAt).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#611232]/10">
                <FileText className="text-[#611232]" size={22} />
              </div>
              <div>
                <p className="text-sm md:text-base text-gray-500">
                  Firmado por (ID Usuario)
                </p>
                <p className="text-gray-800 text-xs md:text-base font-medium">
                  {contract.signedBy}
                </p>
              </div>
            </div>
          </div>

          {/* 📄 Botón al documento firmado */}
          {contract.url && (
            <div className="pt-4 border-t border-[#eae5df]">
              <a
                href={contract.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to from-[#611232] to-[#8b204a] text-black/70 hover:opacity-90 transition-all rounded-xl py-3 font-semibold text-sm md:text-lg tracking-wide shadow-md"
              >
                Ver documento firmado
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Acciones */}
      <section className="p-4">
        {contract.signed && (
          <>
            <ActivateCreditSection
              onActivate={handleActivate}
              activating={activating}
              success={success}
              error={activateError}
            />

            <CancelContractSection
              onCancel={handleCancel}
              disabled={cancelling}
              success={cancelSuccess}
              error={cancelError}
            />
          </>
        )}
      </section>
    </>
  );
}

function CancelContractSection({ onCancel, disabled, success, error }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [localError, setLocalError] = useState(null);

  // 🔐 Cerrar modal SOLO si el backend respondió OK
  useEffect(() => {
    if (success) {
      setOpen(false);
      setReason("");
      setLocalError(null);
    }
  }, [success]);

  const handleConfirm = () => {
    if (!reason.trim()) {
      setLocalError("La razón de cancelación es obligatoria");
      return;
    }

    setLocalError(null);
    onCancel(reason); // solo dispara la petición
  };

  return (
    <>
      {/* 🔴 Sección principal */}
      <section className="max-w-4xl mx-auto p-6 border border-red-200 rounded-3xl bg-white shadow-md mt-6">
        <h2 className="text-lg font-semibold text-red-700 mb-2">
          Cancelar contrato
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          Esta acción cancelará el contrato firmado y evitará la activación del
          crédito. No se puede deshacer.
        </p>

        <button
          onClick={() => setOpen(true)}
          disabled={disabled}
          className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
        >
          <XCircle size={18} />
          Cancelar contrato
        </button>
      </section>

      {/* 🧠 Modal */}
      {open && (
        <div className="fixed inset-0 z-50 p-4 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="text-red-600" size={22} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                ¿Estás seguro?
              </h3>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Estás a punto de cancelar un contrato ya firmado. Esta acción es
              irreversible.
            </p>

            {/* ✍️ Input */}
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-red-500 text-black"
              placeholder="Describe brevemente el motivo..."
            />

            {/* 🔴 Errores */}
            {localError && (
              <p className="text-sm text-red-600 mt-2">{localError}</p>
            )}

            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => !disabled && setOpen(false)}
                disabled={disabled}
                className="flex-1 py-2 rounded-xl border border-gray-300 text-gray-700 disabled:opacity-50"
              >
                No, volver
              </button>

              <button
                onClick={handleConfirm}
                disabled={disabled}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold"
              >
                {disabled ? "Cancelando..." : "Sí, cancelar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
