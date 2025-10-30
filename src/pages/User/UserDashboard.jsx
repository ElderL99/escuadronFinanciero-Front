import { useNavigate } from "react-router-dom";
import {
  FileSignature,
  PlusCircle,
  CreditCard,
  Upload,
  Clock,
  Wallet2,
} from "lucide-react";

export default function UserDashboard() {
  const navigate = useNavigate();

  const pendientesFirma = [{ id: "002", monto: 4000 }];
  const creditosActivos = [
    { id: "CR123", monto: 5000, pagado: 2500, proximoPago: "05 Nov 2025" },
  ];
  const enProceso = [{ id: "001", estado: "En revisión", monto: 3000 }];

  return (
    <section className="min-h-screen  py-12 px-4 text-[#1a1a1a]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* 👋 Hero */}
        <div className="bg-white rounded-2xl p-8 border border-[#e8e2dc] flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#611232] mb-2">
              Hola, Adán 👋
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
            value={creditosActivos.length}
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
                  key={sol.id}
                  title={`Solicitud #${sol.id}`}
                  subtitle={`Monto aprobado: $${sol.monto.toLocaleString()}`}
                  button={{
                    label: "Firmar contrato",
                    onClick: () => navigate(`/user/contrato/${sol.id}`),
                    icon: <FileSignature size={16} />,
                  }}
                />
              ))}
            </DashboardSection>
          )}

          {/* 💳 Créditos activos */}
          {creditosActivos.length > 0 && (
            <DashboardSection title="Créditos activos">
              {creditosActivos.map((credito) => (
                <DashboardCard
                  key={credito.id}
                  title={`Crédito #${credito.id}`}
                  subtitle={`Total: $${credito.monto.toLocaleString()} · Pagado: $${credito.pagado.toLocaleString()}`}
                  description={`Próximo pago: ${credito.proximoPago}`}
                  actions={[
                    {
                      label: "Subir ticket",
                      icon: <Upload size={16} />,
                      onClick: () => navigate("/user/tickets"),
                      primary: true,
                    },
                    {
                      label: "Ver detalle",
                      icon: <Wallet2 size={16} />,
                      onClick: () => navigate(`/user/creditos/${credito.id}`),
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
                  key={sol.id}
                  title={`Solicitud #${sol.id}`}
                  subtitle={`Estado: ${sol.estado}`}
                  description={`Monto: $${sol.monto.toLocaleString()}`}
                  button={{
                    label: "Ver detalle",
                    onClick: () => navigate(`/user/solicitud/${sol.id}`),
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

/* 🔹 Subcomponentes simplificados */
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
