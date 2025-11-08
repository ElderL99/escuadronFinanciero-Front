import { useAdminDashboard } from "../../hooks/admin/useAdminDashborad";
import DashboardCards from "../../components/DashBoard/DashBoardCards";
import PendientesTable from "../../components/DashBoard/PendientesTable";
import {
  Users,
  CheckCircle,
  XCircle,
  PenTool,
  Zap,
  FileText,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { data, loading, error, refetch } = useAdminDashboard();

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-[#611232]">
        Cargando dashboard...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 mt-10 font-semibold">
        {error}
      </div>
    );

  if (!data) return null;

  const { resumen, pendientes } = data;

  return (
    <main className="p-4 md:p-6 lg:p-8 bg-linear-to-b from-[#f9f8f6] to-[#f4f1ec] min-h-[90vh] text-[#1a1a1a]">
      {/* === HEADER === */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[#611232] tracking-tight">
          Panel de Administración
        </h1>
      </header>

      {/* === CARDS === */}
      <section className="grid grid-cols-2  gap-2 sm:grid-cols-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5 will-change-transform ">
        <DashboardCards
          label="Total"
          value={resumen?.total ?? 0}
          Icon={Users}
          color="bg-[#611232]"
        />
        <DashboardCards
          label="Rechazadas"
          value={resumen?.rechazadas ?? 0}
          Icon={XCircle}
          color="bg-red-500"
        />
        <DashboardCards
          label="Esperando Firma"
          value={resumen?.esperandoFirma ?? 0}
          Icon={PenTool}
          color="bg-yellow-500"
        />
        <DashboardCards
          label="Esperando Activación"
          value={resumen?.esperandoActivacion ?? 0}
          Icon={FileText}
          color="bg-blue-500"
        />
        <DashboardCards
          label="Activas"
          value={resumen?.activas ?? 0}
          Icon={Zap}
          color="bg-emerald-600"
        />
      </section>

      {/* === BOTÓN REFRESH === */}
      <div className="flex justify-end mt-6 mb-4">
        <button
          onClick={refetch}
          className="px-5 py-2 bg-[#611232] text-white rounded-lg hover:bg-[#4d0e28] transition-colors shadow-[0_1px_4px_rgba(0,0,0,0.15)] active:scale-[0.98] will-change-transform"
        >
          Recargar datos
        </button>
      </div>

      {/* === PENDIENTES === */}
      <PendientesTable
        pendientes={pendientes}
        title="Solicitudes Pendientes"
        onFiltrar={() => console.log("Abrir filtros")}
        onExportar={() => console.log("Exportar a Excel o PDF")}
      />
    </main>
  );
}
