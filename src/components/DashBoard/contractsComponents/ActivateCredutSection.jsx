import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

export default function ActivateCreditSection({
  onActivate,
  activating,
  success,
  error,
}) {
  const [confirming, setConfirming] = useState(false);

  return (
    <section className="max-w-4xl mx-auto p-6 text-center">
      {/* 🟥 Mensajes */}
      {error && <p className="text-red-600 font-medium mb-3">{error}</p>}
      {success && <p className="text-green-600 font-medium mb-3">{success}</p>}

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
              onClick={() => {
                setConfirming(false);
                onActivate();
                Navigate("/admin/signed-contracts");
              }}
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
  );
}
