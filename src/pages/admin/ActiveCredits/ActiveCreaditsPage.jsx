import { Loader2 } from "lucide-react";
import useAdminActiveCredits from "../../../hooks/admin/useAdminActiveCredits";
import ActiveCreditCard from "../../../components/DashBoard/ApplicationsActiveComponents/ActiveCreditCard";

export default function AdminActiveCreditsPage() {
  const { credits, loading, error } = useAdminActiveCredits();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-[#611232]/70">
        <Loader2 className="animate-spin mr-2" size={20} />
        Cargando créditos activos...
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 text-center py-6 font-medium">
        {error || "Error al cargar créditos"}
      </div>
    );

  // 🟩 Filtrar solo los créditos activos
  const activeCredits = credits.filter(
    (credito) => credito.status === "active"
  );

  if (!activeCredits.length)
    return (
      <div className="text-gray-500 text-center py-6">
        No hay créditos activos registrados.
      </div>
    );

  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-[#611232] mb-6">
        Créditos activos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {activeCredits.map((credito) => (
          <ActiveCreditCard key={credito.creditoId} credito={credito} />
        ))}
      </div>
    </section>
  );
}
