import { useNavigate } from "react-router-dom";
import UserPicture from "../../svg/userpicture.png";

export default function PendientesTable({
  pendientes = [],
  onFiltrar,
  onExportar,
  title = "Solicitudes Pendientes",
}) {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/admin/applications/${id}`); // Navega al detalle de la solicitud
  };

  return (
    <section className="bg-white rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-bold text-[#611232]">{title}</h2>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={onFiltrar}
            className="px-3 py-1 bg-[#611232] text-white rounded hover:bg-[#501025]"
          >
            Filtrar
          </button>
          <button
            onClick={onExportar}
            className="px-3 py-1 bg-gray-100 text-[#611232] rounded flex items-center gap-1 hover:bg-gray-200"
          >
            <span>Exportar</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Nombre
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 hidden md:table-cell">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Monto
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 hidden md:table-cell">
                Estado
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pendientes.length > 0 ? (
              pendientes.map((solicitud) => (
                <tr
                  key={solicitud.id}
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleRowClick(solicitud.id)}
                >
                  <td className="px-4 py-2 text-sm text-gray-700 flex items-center gap-2">
                    <img
                      src={UserPicture}
                      alt={solicitud.nombre}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">{solicitud.nombre}</span>
                      <span className="text-gray-400 text-sm hidden sm:block">
                        {solicitud.usuario.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500 hidden md:table-cell">
                    {solicitud.id}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {solicitud.monto}
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        solicitud.estado === "Esperando Firma"
                          ? "bg-yellow-100 text-yellow-800"
                          : solicitud.estado === "Esperando Activación"
                          ? "bg-[#611232] text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {solicitud.estado}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    {new Date(solicitud.dia).toLocaleDateString("es-MX", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-gray-400 text-center">
                  No hay solicitudes pendientes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
