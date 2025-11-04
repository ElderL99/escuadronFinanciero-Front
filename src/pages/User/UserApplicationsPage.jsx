import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUserApplications from "../../hooks/user/useUserApplications";
import useUserApplicationById from "../../hooks/user/useUserApplicationById";
import ApplicationCard from "../../components/usedashboard/UserApplications/ApplicationCard";
import ApplicationEmptyState from "../../components/usedashboard/UserApplications/ApplicationsEmptyState";
import { Loader2 } from "lucide-react";

export default function UserApplicationsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    applications,
    loading: loadingAll,
    error: errorAll,
    fetchUserApplications,
  } = useUserApplications();

  const {
    application,
    loading: loadingOne,
    error: errorOne,
    fetchUserApplicationById,
  } = useUserApplicationById();

  // 🔹 Cargar solicitudes
  useEffect(() => {
    if (id) {
      fetchUserApplicationById(id);
    } else {
      fetchUserApplications();
    }
  }, [id, fetchUserApplications, fetchUserApplicationById]);

  const loading = id ? loadingOne : loadingAll;
  const error = id ? errorOne : errorAll;
  const apps = id ? (application ? [application] : []) : applications;

  // 🌀 Estado de carga
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#611232]">
        <Loader2 className="animate-spin w-8 h-8 mb-2" />
        <p>{id ? "Cargando solicitud..." : "Cargando tus solicitudes..."}</p>
      </div>
    );

  // 🚫 Sin datos o error
  if (error || apps.length === 0)
    return <ApplicationEmptyState error={error} />;

  return (
    <section className="min-h-screen bg-[#F9FAFB] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 🔹 Encabezado */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#611232] mb-2">
            {id ? "Detalle de Solicitud" : "Mis Solicitudes"}
          </h1>
          <p className="text-gray-600">
            {id
              ? "Consulta la información detallada de tu solicitud."
              : "Aquí puedes ver y dar seguimiento a todas tus solicitudes."}
          </p>
        </div>

        {/* 🔹 Lista de solicitudes */}
        <div className="grid grid-cols-1 gap-4">
          {apps.map((app) => (
            <div
              key={app._id}
              className="bg-white/80 backdrop-blur-md border border-[#e8e2dc]/60 rounded-2xl shadow-sm hover:shadow-md transition-all "
            >
              <ApplicationCard
                app={app}
                isDetail={!!id}
                onClick={() => !id && navigate(`/user/solicitud/${app._id}`)}
              />
            </div>
          ))}
        </div>

        {/* 🔹 Botón volver */}
        {id && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => navigate("/user/solicitudes")}
              className="bg-[#C5A572] text-[#611232] font-semibold px-6 py-3 rounded-full hover:bg-[#d4af37] transition-all"
            >
              Volver a Mis Solicitudes
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
