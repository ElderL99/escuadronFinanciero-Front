import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileSignature,
  PlusCircle,
  CreditCard,
  Upload,
  Clock,
  Wallet2,
  Loader2,
} from "lucide-react";
import useUserCreditsOverview from "../../hooks/user/useUserCreditsOverview";
import useUserApplications from "../../hooks/user/useUserApplications";

export default function UserDashboard() {
  const navigate = useNavigate();

  const {
    credits,
    loading: loadingCredits,
    fetchCreditsOverview,
  } = useUserCreditsOverview();

  const {
    applications,
    loading: loadingApps,
    fetchUserApplications,
  } = useUserApplications();

  useEffect(() => {
    fetchCreditsOverview();
    fetchUserApplications();
  }, [fetchCreditsOverview, fetchUserApplications]);

  // 🧠 Obtener nombre dinámico del usuario
  const userName = useMemo(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        return parsed.name
          ? parsed.name.split(" ")[0] // solo primer nombre
          : "Usuario";
      }
    } catch {
      return "Usuario";
    }
    return "Usuario";
  }, []);

  if (loadingCredits || loadingApps)
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-[#611232]">
        <Loader2 className="animate-spin w-8 h-8 mb-2" />
        <p>Cargando tu panel...</p>
      </div>
    );

  // 📂 Clasificar solicitudes
  const pendientesFirma = applications.filter(
    (app) => app.state === "awaiting_signature"
  );

  const enProceso = applications.filter(
    (app) =>
      app.state === "submitted" ||
      app.state === "reviewing" ||
      app.state === "pending"
  );

  return (
    <section className="min-h-screen py-12 px-4 text-[#1a1a1a]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* 👋 Hero */}
        <div className="bg-white rounded-2xl p-8 border border-[#e8e2dc] flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#611232] mb-2">
              Hola, {userName} 👋
            </h1>
            <p className="text-gray-700">
              Gestiona tus préstamos y contratos fácilmente desde tu panel.
            </p>
          </div>
          <button
            onClick={() => navigate("/user/create-solicitud")}
            className="mt-5 sm:mt-0 flex items-center gap-2 bg-[#611232] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#4a0f27] transition-all"
          >
            <PlusCircle size={20} />
            Nueva solicitud
          </button>
        </div>

        {/* 📊 Resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            icon={<CreditCard className="text-[#611232]" />}
            title="Créditos activos"
            value={credits.length}
          />
          <StatCard
            icon={<FileSignature className="text-[#611232]" />}
            title="Contratos por firmar"
            value={pendientesFirma.length}
          />
          <StatCard
            icon={<Clock className="text-[#611232]" />}
            title="Solicitudes en proceso"
            value={enProceso.length}
          />
        </div>

        <div className="divide-y divide-[#e8e2dc] space-y-8">
          {/* 🔏 Contratos pendientes */}
          {pendientesFirma.length > 0 && (
            <DashboardSection title="Contratos pendientes de firma">
              {pendientesFirma.map((sol) => (
                <DashboardCard
                  key={sol._id}
                  title={`Solicitud #${sol._id.slice(-6).toUpperCase()}`}
                  subtitle={`Monto aprobado: $${sol.requestedAmount.toLocaleString()}`}
                  button={{
                    label: "Firmar contrato",
                    onClick: () => navigate(`/user/solicitud/${sol._id}`),
                    icon: <FileSignature size={16} />,
                  }}
                />
              ))}
            </DashboardSection>
          )}

          {/* 💳 Créditos activos */}
          {credits.length > 0 && (
            <DashboardSection title="Créditos activos">
              {credits.map((credito) => (
                <DashboardCard
                  key={credito._id}
                  title={`Crédito #${credito._id.slice(-6).toUpperCase()}`}
                  subtitle={`Total: $${credito.monto.toLocaleString()} · Pagos: ${
                    credito.pagosRealizados
                  }/${credito.pagosTotales}`}
                  description={`Pendientes: ${credito.pagosPendientes}`}
                  actions={[
                    {
                      label: "Subir ticket",
                      icon: <Upload size={16} />,
                      onClick: () => navigate(`/user/creditos/${credito._id}`),
                      primary: true,
                    },
                    {
                      label: "Ver detalle",
                      icon: <Wallet2 size={16} />,
                      onClick: () => navigate(`/user/creditos/${credito._id}`),
                    },
                  ]}
                />
              ))}
            </DashboardSection>
          )}

          {/* 🕒 Solicitudes en proceso */}
          {enProceso.length > 0 && (
            <DashboardSection title="Solicitudes en proceso">
              {enProceso.map((sol) => (
                <DashboardCard
                  key={sol._id}
                  title={`Solicitud #${sol._id.slice(-6).toUpperCase()}`}
                  subtitle={`Estado: ${sol.state}`}
                  description={`Monto: $${sol.requestedAmount.toLocaleString()}`}
                  button={{
                    label: "Ver detalle",
                    onClick: () => navigate(`/user/solicitud/${sol._id}`),
                    icon: <Clock size={16} />,
                  }}
                />
              ))}
            </DashboardSection>
          )}
        </div>
      </div>
    </section>
  );
}

/* 🔹 Subcomponentes reutilizados */
function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-xl border border-[#e8e2dc] p-5 text-center hover:shadow-sm transition">
      <div className="mb-3 flex justify-center">{icon}</div>
      <h3 className="text-sm text-gray-600">{title}</h3>
      <p className="text-2xl font-semibold text-[#611232]">{value}</p>
    </div>
  );
}

function DashboardSection({ title, children }) {
  return (
    <div className="pt-6">
      <h2 className="text-lg font-semibold text-[#611232] mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function DashboardCard({ title, subtitle, description, button, actions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white border border-[#e8e2dc] rounded-xl p-5 hover:shadow-sm transition">
      <div>
        <p className="font-medium text-[#1a1a1a] mb-1">{title}</p>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>

      {actions ? (
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          {actions.map((a, i) => (
            <button
              key={i}
              onClick={a.onClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
                a.primary
                  ? "bg-[#611232] text-white hover:bg-[#4a0f27]"
                  : "border border-[#611232] text-[#611232] hover:bg-[#611232]/10"
              }`}
            >
              {a.icon}
              {a.label}
            </button>
          ))}
        </div>
      ) : (
        button && (
          <button
            onClick={button.onClick}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-[#611232] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#4a0f27] transition"
          >
            {button.icon}
            {button.label}
          </button>
        )
      )}
    </div>
  );
}
