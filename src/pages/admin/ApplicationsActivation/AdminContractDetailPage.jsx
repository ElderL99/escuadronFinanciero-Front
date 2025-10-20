import { Link, useParams } from "react-router-dom";
import useAdminContractById from "../../../hooks/admin/useAdminContractById";
import useActivateCredit from "../../../hooks/admin/useActiveCredit";
import {
  FileText,
  ClipboardList,
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useState } from "react";

export default function AdminContractDetailPage() {
  const { id } = useParams();
  const { contract, loading, error } = useAdminContractById(id);
  const [confirming, setConfirming] = useState(false);
  const {
    activateCredit,
    loading: activating,
    error: activateError,
    success,
  } = useActivateCredit();

  const handleActivate = async () => {
    await activateCredit(contract.requestId);
  };

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
        <div
          className="bg-white rounded-3xl border border-[#e6e0da] shadow-lg 
                     max-w-4xl mx-auto p-8 flex flex-col gap-8"
        >
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
                className="block w-full text-center bg-gradient-to-r from-[#611232] to-[#8b204a] 
                           text-white hover:opacity-90 transition-all rounded-xl py-3 font-semibold text-sm md:text-lg tracking-wide shadow-md"
              >
                Ver documento firmado
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ✅ Nueva sección: botón para activar crédito */}
      <section className="max-w-4xl mx-auto p-6 text-center">
        {/* 🟥 Mensajes */}
        {activateError && (
          <p className="text-red-600 font-medium mb-3">{activateError}</p>
        )}
        {success && (
          <p className="text-green-600 font-medium mb-3">{success}</p>
        )}

        {/* Estado de confirmación */}
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            disabled={activating}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-white shadow-md transition-all
        ${
          activating
            ? "bg-[#d4af37]/50 cursor-not-allowed"
            : "bg-[#d4af37] hover:bg-[#c6a231]"
        }`}
          >
            {activating ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                Activando crédito...
              </span>
            ) : (
              "Aprobar y activar crédito"
            )}
          </button>
        ) : (
          <div
            className="bg-white border border-[#e6e0da] rounded-2xl shadow-lg 
                 p-6 max-w-md mx-auto mt-6 text-center space-y-4"
          >
            <h2 className="text-lg md:text-xl font-semibold text-[#611232]">
              Confirmar activación del crédito
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              ¿Estás seguro de que deseas{" "}
              <span className="font-semibold text-[#611232]">
                activar este crédito
              </span>
              ? Esta acción no se puede deshacer.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
              <button
                onClick={() => setConfirming(false)}
                className="w-full sm:w-auto px-6 py-2 rounded-xl font-semibold border border-gray-300 
                     text-gray-600 hover:bg-gray-100 transition-all"
              >
                Cancelar
              </button>

              <button
                onClick={handleActivate}
                disabled={activating}
                className={`w-full sm:w-auto px-6 py-2 rounded-xl font-semibold text-white shadow-md transition-all
            ${
              activating
                ? "bg-[#d4af37]/50 cursor-not-allowed"
                : "bg-[#d4af37] hover:bg-[#c6a231]"
            }`}
              >
                {activating ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={18} />
                    Activando...
                  </span>
                ) : (
                  "Confirmar activación"
                )}
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
