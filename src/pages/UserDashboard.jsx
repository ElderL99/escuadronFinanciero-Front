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

  // Simulados
  const pendientesFirma = [{ id: "002", monto: 4000 }];
  const creditosActivos = [
    { id: "CR123", monto: 5000, pagado: 2500, proximoPago: "05 Nov 2025" },
  ];
  const enProceso = [{ id: "001", estado: "En revisión", monto: 3000 }];

  return (
    <section className="min-h-screen bg-[#f3efea] py-12 px-4 text-[#1a1a1a]">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* 💎 Hero moderno */}
        <div className="relative bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(97,18,50,0.05)] rounded-3xl p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#611232] mb-2">
              Hola, Adán 👋
            </h1>
            <p className="text-gray-700">
              Gestiona tus préstamos, firma contratos y mantén tu historial al
              día.
            </p>
          </div>
          <button
            onClick={() => navigate("/user/solicitudes")}
            className="mt-5 sm:mt-0 flex items-center gap-2 bg-[#611232] text-white font-medium px-6 py-3 rounded-xl shadow-sm hover:scale-[1.02] transition-transform duration-200"
          >
            <PlusCircle size={20} />
            Nueva solicitud
          </button>
        </div>

        {/* 📊 Resumen rápido */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

        {/* 🔏 Contratos pendientes */}
        {pendientesFirma.length > 0 && (
          <ModernSection title="Contratos pendientes de firma">
            {pendientesFirma.map((sol) => (
              <ModernCard
                key={sol.id}
                title={`Solicitud #${sol.id}`}
                subtitle={`Monto aprobado: $${sol.monto.toLocaleString()}`}
                actionLabel="Firmar contrato"
                icon={<FileSignature size={18} />}
                onAction={() => navigate(`/user/contrato/${sol.id}`)}
              />
            ))}
          </ModernSection>
        )}

        {/* 💳 Créditos activos */}
        {creditosActivos.length > 0 && (
          <ModernSection title="Créditos activos">
            {creditosActivos.map((credito) => (
              <ModernCard
                key={credito.id}
                title={`Crédito #${credito.id}`}
                subtitle={`Monto total: $${credito.monto.toLocaleString()} · Pagado: $${credito.pagado.toLocaleString()}`}
                description={`Próximo pago: ${credito.proximoPago}`}
                actions={[
                  {
                    label: "Subir ticket",
                    icon: <Upload size={16} />,
                    primary: true,
                    onClick: () => navigate("/user/tickets"),
                  },
                  {
                    label: "Ver detalle",
                    icon: <Wallet2 size={16} />,
                    onClick: () => navigate(`/user/creditos/${credito.id}`),
                  },
                ]}
              />
            ))}
          </ModernSection>
        )}

        {/* 🕒 Solicitudes en proceso */}
        {enProceso.length > 0 && (
          <ModernSection title="Solicitudes en proceso">
            {enProceso.map((sol) => (
              <ModernCard
                key={sol.id}
                title={`Solicitud #${sol.id}`}
                subtitle={`Estado: ${sol.estado}`}
                description={`Monto: $${sol.monto.toLocaleString()}`}
                actionLabel="Ver detalle"
                icon={<Clock size={16} />}
                onAction={() => navigate(`/user/solicitud/${sol.id}`)}
              />
            ))}
          </ModernSection>
        )}
      </div>
    </section>
  );
}

/* 🔹 Componentes modernos reutilizables */
function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-[#611232]/10 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center hover:shadow-md transition">
      <div className="mb-3">{icon}</div>
      <h3 className="text-sm text-gray-600">{title}</h3>
      <p className="text-2xl font-semibold text-[#611232]">{value}</p>
    </div>
  );
}

function ModernSection({ title, children }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-[#611232]/10 rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-[#611232] mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ModernCard({
  title,
  subtitle,
  description,
  icon,
  actionLabel,
  onAction,
  actions,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white border border-[#611232]/10 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div>
        <p className="font-medium text-[#1a1a1a] flex items-center gap-2 mb-1">
          {icon && <span className="text-[#611232]">{icon}</span>}
          {title}
        </p>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>

      {actions ? (
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          {actions.map((btn, i) => (
            <button
              key={i}
              onClick={btn.onClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
                btn.primary
                  ? "bg-[#611232] text-white hover:bg-[#4a0f27]"
                  : "border border-[#611232] text-[#611232] hover:bg-[#611232]/10"
              }`}
            >
              {btn.icon}
              {btn.label}
            </button>
          ))}
        </div>
      ) : (
        actionLabel && (
          <button
            onClick={onAction}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-[#611232] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#4a0f27] transition"
          >
            {icon}
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
}
