import { useEffect } from "react";
import useUserCreditsOverview from "../../../hooks/user/useUserCreditsOverview";
import { useNavigate } from "react-router-dom";
import { Loader2, Wallet2 } from "lucide-react";

export default function UserCreditsPage() {
  const navigate = useNavigate();
  const { credits, loading, error, fetchCreditsOverview } =
    useUserCreditsOverview();

  useEffect(() => {
    fetchCreditsOverview();
  }, [fetchCreditsOverview]);

  // Filtrar créditos activos
  const activeCredits = credits.filter((credito) => {
    const status = String(credito.estado).toLowerCase();
    return status !== "completed" && status !== "cancelled";
  });

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#611232]">
        <Loader2 className="animate-spin w-8 h-8 mb-2" />
        <p>Cargando tus créditos...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-gray-600 mt-10">
        <p>{error}</p>
      </div>
    );

  return (
    <section className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold text-[#611232] mb-6 text-center">
        Mis Créditos Activos
      </h1>

      {activeCredits.length === 0 ? (
        <p className="text-center text-gray-500">
          No tienes créditos activos por el momento.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {activeCredits.map((credit) => (
            <div
              key={credit._id}
              className="bg-white border border-[#e8e2dc] rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => navigate(`/user/creditos/${credit._id}`)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[#611232] mb-1">
                    Crédito #{credit._id.slice(-6).toUpperCase()}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Total: ${credit.monto.toLocaleString()} · Pagos:{" "}
                    {credit.pagosRealizados}/{credit.pagosTotales}
                  </p>
                </div>
                <Wallet2 className="text-[#611232]" size={28} />
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Pagos pendientes: {credit.pagosPendientes}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
