import { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import DashboardCard from "../components/DashBoard/DashBoardCard";
import {
  FileText,
  CheckCircle,
  XCircle,
  PenTool,
  Zap,
  Activity,
} from "lucide-react";
import PendientesTable from "../components/DashBoard/PendientesTable";

export default function AdminDashboard() {
  const { fetchDashboard, loading, error } = useAdmin();
  const [resumen, setResumen] = useState(null);
  const [pendientes, setPendientes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchDashboard();
      if (!result) return;

      setResumen(result.data.resumen);
      setPendientes(result.data.pendientes || []);
    };
    getData();
  }, [fetchDashboard]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-[#0a1930] font-semibold animate-pulse">
          Cargando dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  if (!resumen) return null;

  const cards = [
    {
      label: "Total de Solicitudes",
      value: resumen.total,
      Icon: FileText,
      color: "bg-[#611232]",
    },

    {
      label: "Rechazadas",
      value: resumen.rechazadas,
      Icon: XCircle,
      color: "bg-red-600",
    },
    {
      label: "Esperando Firma",
      value: resumen.esperandoFirma,
      Icon: PenTool,
      color: "bg-yellow-500",
    },
    {
      label: "Esperando Activación",
      value: resumen.esperandoActivacion,
      Icon: Zap,
      color: "bg-[#611232]",
    },
    {
      label: "Activas",
      value: resumen.activas,
      Icon: Activity,
      color: "bg-[#d4af37]",
    },
  ];

  return (
    <main className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className=" md:w-30 lg:flex flex-col lg:w-64 bg-[#611232]/90 backdrop-blur-md text-white p-6  shadow-lg">
        <h2 className="lg:text-2xl font-bold mb-8 tracking-wide drop-shadow-md">
          AdminPanel
        </h2>
        <nav className="flex flex-col gap-3">
          {["Dashboard", "Usuarios", "Esperando Activacion", "Activas"].map(
            (item) => (
              <button
                key={item}
                className="text-left p-3 rounded-lg hover:bg-[#501025]/80 transition-colors duration-200 flex items-center gap-2 shadow-sm"
              >
                <span className="font-medium">{item}</span>
              </button>
            )
          )}
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 p-6 flex flex-col gap-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-[#0a1930]">
            Dashboard Administrativo
          </h1>
          <p className="text-gray-600 mt-2 md:mt-0">
            Resumen general del sistema
          </p>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {cards.map((item, i) => (
            <DashboardCard
              key={i}
              label={item.label}
              value={item.value}
              Icon={item.Icon}
              color={item.color}
            />
          ))}
        </div>

        {/* Placeholder para gráficas */}
        {/*  <div className="bg-white rounded-xl shadow-md h-64 flex items-center justify-center">
          <p className="text-gray-400">Aquí irán las gráficas</p>
        </div> */}

        {/* Solicitudes pendientes */}
        <PendientesTable
          pendientes={pendientes}
          onFiltrar={() => console.log("Filtrar clic")}
          onExportar={() => console.log("Exportar clic")}
          title="Solicitudes Pendientes"
        />
      </div>
    </main>
  );
}
