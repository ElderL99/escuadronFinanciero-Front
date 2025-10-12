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
      color: "bg-[#0a1930]",
    },
    {
      label: "Aprobadas",
      value: resumen.aprobadas,
      Icon: CheckCircle,
      color: "bg-green-600",
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
      color: "bg-indigo-600",
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
      <aside className="hidden lg:flex flex-col w-64 bg-[#0a1930] text-white p-6">
        <h2 className="text-2xl font-bold mb-8">AdminPanel</h2>
        <nav className="flex flex-col gap-4">
          <button className="text-left p-2 rounded hover:bg-[#111f3f]">
            Dashboard
          </button>
          <button className="text-left p-2 rounded hover:bg-[#111f3f]">
            Solicitudes
          </button>
          <button className="text-left p-2 rounded hover:bg-[#111f3f]">
            Usuarios
          </button>
          <button className="text-left p-2 rounded hover:bg-[#111f3f]">
            Configuración
          </button>
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
        <div className="bg-white rounded-xl shadow-md h-64 flex items-center justify-center">
          <p className="text-gray-400">Aquí irán las gráficas</p>
        </div>

        {/* Solicitudes pendientes */}
        <section className="bg-white rounded-xl shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#0a1930]">
              Solicitudes Pendientes
            </h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-[#6b1d45] text-white rounded">
                Filtrar
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded flex items-center gap-1">
                <span>Exportar</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Usuario
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Tipo
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Estado
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Fecha
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pendientes.length > 0 ? (
                  pendientes.map((solicitud) => (
                    <tr key={solicitud.id}>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {solicitud.id}
                      </td>
                      <td className="px-4 py-2 flex items-center gap-2">
                        <img
                          src={
                            solicitud.usuario.avatar || "/default-avatar.png"
                          }
                          alt={solicitud.nombre}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex flex-col">
                          <span className="text-gray-700 font-semibold">
                            {solicitud.nombre}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {solicitud.usuario.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        {solicitud.tipo}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            solicitud.estado === "Esperando Firma"
                              ? "bg-yellow-100 text-yellow-800"
                              : solicitud.estado === "Esperando Activación"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {solicitud.estado}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {solicitud.fecha}
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button className="text-purple-600 hover:text-purple-800">
                          👁️
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          ✔️
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          ✖️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-2 text-gray-400 text-center"
                    >
                      No hay solicitudes pendientes
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
