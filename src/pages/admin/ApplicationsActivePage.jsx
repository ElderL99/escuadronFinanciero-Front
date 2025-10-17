import { useEffect, useState } from "react";
import useAdmin from "../../hooks/useAdmin";

import ApplicationsActiveCreditDetail from "../../components/DashBoard/ApplicationsActives/ApplicationActiveCreditDetail";

export default function ApplicationsActivePage() {
  const [activeContracts, setActiveContracts] = useState(null);
  const [loading, setLoading] = useState(true);
  const admin = useAdmin();

  useEffect(() => {
    const contracts = async () => {
      try {
        const data = await admin.fetchActiveCredits();
        setActiveContracts(data || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    contracts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#faf7f2] text-[#611232]">
        <p className="font-semibold text-lg">Cargando contratos activos...</p>
      </div>
    );
  }

  if (!activeContracts?.data || activeContracts.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#faf7f2] text-center px-4 text-[#611232]">
        <h2 className="text-2xl font-bold mb-2">No hay contratos activos</h2>
        <p className="text-gray-600 text-sm max-w-sm">
          Aún no se han registrado créditos activos en el sistema
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9F9F9]  p-6 text-gray-900">
      {/* Header */}
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-bold mb-2 tracking-wide text-[#611232]">
          Créditos Activos
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Listado de todos los créditos actualmente activos
        </p>
      </header>

      {/* Lista de contratos */}
      <ul className="grid grid-cols-1 gap-5">
        {activeContracts.data.map((contract) => (
          <ApplicationsActiveCreditDetail
            key={contract.creditoId}
            contract={contract}
          />
        ))}
      </ul>
    </main>
  );
}
