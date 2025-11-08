import ContractCard from "../../../components/DashBoard/contractsComponents/ContractCard";
import useAdminSignedContracts from "../../../hooks/admin/useAdminSignedContracts";

export default function AdminSignedContractsPage() {
  const { contracts, loading, error } = useAdminSignedContracts();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[70vh] text-[#611232]/70">
        Cargando contratos firmados...
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 text-center py-6 font-medium">
        {error || "Error al cargar contratos"}
      </div>
    );

  // 🟣 Filtrar contratos firmados pendientes de activación
  const pendingContracts = contracts.filter(
    (contrato) => contrato.estadoSolicitud === "signed"
  );

  if (!pendingContracts.length)
    return (
      <div className="text-[#611232]/60 text-center py-6">
        No hay contratos firmados pendientes de activación.
      </div>
    );

  return (
    <section className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#611232] tracking-tight">
          Contratos firmados (pendientes de activación)
        </h1>
        <p className="text-sm text-gray-500">
          Administra los contratos listos para activar el crédito
          correspondiente.
        </p>
      </header>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 
        opacity-0 animate-[fadeIn_0.4s_ease-out_forwards] will-change-transform"
      >
        {pendingContracts.map((contrato) => (
          <ContractCard key={contrato.contratoId} contrato={contrato} />
        ))}
      </div>
    </section>
  );
}
