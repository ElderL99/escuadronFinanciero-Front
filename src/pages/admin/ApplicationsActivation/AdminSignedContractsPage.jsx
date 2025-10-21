import ContractCard from "../../../components/DashBoard/contractsComponents/ContractCard";
import useAdminSignedContracts from "../../../hooks/admin/useAdminSignedContracts";

export default function AdminSignedContractsPage() {
  const { contracts, loading, error } = useAdminSignedContracts();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-[#611232]/70">
        Cargando contratos firmados...
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 text-center py-6 font-medium">
        {error || "Error al cargar contratos"}
      </div>
    );

  // 🟣 Filtrar solo contratos firmados y pendientes de activación
  const pendingContracts = contracts.filter(
    (contrato) => contrato.status === "signed"
  );

  if (!pendingContracts.length)
    return (
      <div className="text-[#611232]/60 text-center py-6">
        No hay contratos firmados pendientes de activación.
      </div>
    );

  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#611232] mb-2">
        Contratos firmados (pendientes de activación)
      </h1>

      <div className="grid grid-cols-1 gap-4">
        {pendingContracts.map((contrato) => (
          <ContractCard key={contrato.contratoId} contrato={contrato} />
        ))}
      </div>
    </section>
  );
}
