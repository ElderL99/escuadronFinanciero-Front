import { useNavigate } from "react-router-dom";
import { Download, Filter } from "lucide-react";
import UserPicture from "../../svg/userpicture.png";

export default function PendientesTable({
  pendientes = [],
  onFiltrar,
  onExportar,
  title = "Solicitudes Pendientes",
}) {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/admin/applications/${id}`);
  };

  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 transition-all">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-[#611232] tracking-tight">
          {title}
        </h2>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={onFiltrar}
            className="flex items-center gap-2 px-4 py-2 bg-[#611232] text-white rounded-lg hover:bg-[#501025] transition-colors duration-200 shadow-sm"
          >
            <Filter className="w-4 h-4" />
            <span>Filtrar</span>
          </button>
          <button
            onClick={onExportar}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-[#611232] border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-100">
              {["Nombre", "ID", "Monto", "Estado", "Fecha"].map((head, i) => (
                <th
                  key={i}
                  className={`px-4 py-3 text-left text-sm font-semibold text-gray-700 ${
                    (head === "ID" || head === "Estado") &&
                    "hidden md:table-cell"
                  }`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pendientes.length > 0 ? (
              pendientes.map((solicitud) => (
                <tr
                  key={solicitud.id}
                  onClick={() => handleRowClick(solicitud.id)}
                  className="bg-white hover:bg-gray-50 cursor-pointer transition-colors shadow-sm rounded-lg"
                >
                  <td className="px-4 py-3 text-sm text-gray-700 flex items-center gap-3">
                    <img
                      src={UserPicture}
                      alt={solicitud.nombre}
                      className="w-9 h-9 rounded-full border border-gray-200"
                    />
                    <div>
                      <p className="font-medium">{solicitud.nombre}</p>
                      <p className="text-gray-400 text-xs hidden sm:block">
                        {solicitud.usuario.email}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">
                    {solicitud.id}
                  </td>

                  <td className="px-4 py-3 text-sm font-semibold text-gray-700">
                    ${solicitud.monto?.toLocaleString("es-MX")}
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell">
                    <span
                      className={`px-3 py-1.5 text-xs font-medium rounded-full shadow-sm ${
                        solicitud.estado === "Esperando Firma"
                          ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                          : solicitud.estado === "Esperando Activación"
                          ? "bg-[#611232]/10 text-[#611232] border border-[#611232]/30"
                          : solicitud.estado === "Rechazada"
                          ? "bg-red-100 text-red-800 border border-red-300"
                          : "bg-green-100 text-green-800 border border-green-300"
                      }`}
                    >
                      {solicitud.estado}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(solicitud.dia).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-8 text-center text-gray-400 text-sm italic"
                >
                  No hay solicitudes pendientes actualmente.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
