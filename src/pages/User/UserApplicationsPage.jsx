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
  } = useUserApplications();
  const {
    application,
    loading: loadingOne,
    error: errorOne,
  } = useUserApplicationById(id);

  const loading = id ? loadingOne : loadingAll;
  const error = id ? errorOne : errorAll;
  const apps = id ? (application ? [application] : []) : applications;

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#611232]">
        <Loader2 className="animate-spin w-8 h-8 mb-2" />
        <p>{id ? "Cargando solicitud..." : "Cargando tus solicitudes..."}</p>
      </div>
    );

  if (error || apps.length === 0)
    return <ApplicationEmptyState error={error} />;

  return (
    <section className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold text-[#611232] mb-6 text-center">
        {id ? "Detalle de Solicitud" : "Mis Solicitudes"}
      </h1>

      <div className={`grid grid-cols-1 gap-4`}>
        {apps.map((app) => (
          <ApplicationCard
            key={app._id}
            app={app}
            isDetail={!!id}
            onClick={() => !id && navigate(`/user/solicitudes/${app._id}`)}
          />
        ))}
      </div>
    </section>
  );
}
