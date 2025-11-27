import { useParams, Link } from "react-router-dom";
import {
  Loader2,
  ArrowLeft,
  User,
  Mail,
  Shield,
  Calendar,
  CheckCircle,
  XCircle,
  FileText,
  CreditCard,
} from "lucide-react";
import useFetchUserById from "../../../hooks/admin/useFetchUserById";

function getStatusColor(status) {
  const s = status?.toLowerCase();

  if (s === "approved" || s === "active" || s === "completed")
    return "text-green-700";
  if (s === "rejected") return "text-red-700";

  // pending, waiting, submitted, draft, cualquier otro
  return "text-yellow-700";
}

function getStatusBg(status) {
  const s = status?.toLowerCase();

  if (s === "approved" || s === "active" || s === "completed")
    return "bg-green-100";
  if (s === "rejected") return "bg-red-100";

  return "bg-yellow-100";
}

export default function AdminUserDetailPage() {
  const { id } = useParams();
  const { user, loading, error } = useFetchUserById(id);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-[#611232]/70">
        <Loader2 className="animate-spin mr-2" size={20} />
        Cargando usuario...
      </div>
    );

  if (error) return <p className="text-center text-red-600 py-6">{error}</p>;

  if (!user)
    return (
      <p className="text-center text-gray-600 py-6">Usuario no encontrado.</p>
    );

  return (
    <section className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#611232]">
          Detalle del Usuario
        </h1>
        <Link
          to="/admin/users"
          className="flex items-center gap-2 text-[#611232]/70 hover:text-[#611232] font-medium"
        >
          <ArrowLeft size={18} />
          Volver
        </Link>
      </div>

      {/* Información básica */}
      <BasicInfo user={user} />

      {/* Solicitudes */}
      <ApplicationsSection applications={user.applications} />

      {/* Créditos */}
      <CreditsSection credits={user.credits} />
    </section>
  );
}

/* ============================================================
   COMPONENTE: Información Básica
============================================================ */
function BasicInfo({ user }) {
  return (
    <div className="bg-white border border-[#e6e0da] rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-[#611232] mb-4 flex items-center gap-2">
        <User size={20} />
        Información Básica
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Info label="Nombre completo" value={`${user.name} ${user.lastName}`} />

        <Info label="Correo electrónico" icon={Mail} value={user.email} />

        <Info label="Nivel" icon={Shield} value={user.level} />

        <Info label="role" icon={User} value={user.role} />
        <Info
          label="Creditos Completados"
          icon={CreditCard}
          value={user.creditStatusSummary.completed || 0}
        />

        <div>
          <p className="text-sm text-gray-600">Estado de verificación</p>
          <p
            className={`font-medium flex items-center gap-1 ${
              user.emailVerified ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {user.emailVerified ? (
              <>
                <CheckCircle size={16} /> Verificado
              </>
            ) : (
              <>
                <XCircle size={16} /> No verificado
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   COMPONENTE: Solicitudes
============================================================ */
function ApplicationsSection({ applications }) {
  return (
    <div className="bg-white border border-[#e6e0da] rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-[#611232] mb-4 flex items-center gap-2">
        <FileText size={20} />
        Solicitudes ({applications?.length || 0})
      </h2>

      {applications && applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((app) => (
            <Link
              key={app._id}
              to={`/admin/applications/${app._id}`}
              className="block border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
            >
              <p className="font-semibold text-[#611232]">
                Solicitud #{app._id.slice(-6).toUpperCase()}
              </p>

              <p className="text-sm">
                <span className="font-medium text-[#611232]">
                  Monto solicitado:
                </span>{" "}
                $
                <span className="font-semibold text-green-600">
                  {app.requestedAmount}
                </span>
              </p>

              <p className="text-sm flex items-center gap-2">
                <span className="font-medium text-[#611232]">Estado:</span>

                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusBg(
                    app.state
                  )} ${getStatusColor(app.state)}`}
                >
                  {app.state}
                </span>
              </p>

              {/* SOLO mostrar si existe */}
              {app.activatedAt && (
                <p className="text-sm text-green-700">
                  Activada:{" "}
                  {new Date(app.activatedAt).toLocaleDateString("es-MX")}
                </p>
              )}

              {app.rejectedAt && (
                <p className="text-sm text-red-700">
                  Rechazada:{" "}
                  {new Date(app.rejectedAt).toLocaleDateString("es-MX")}
                </p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No tiene solicitudes registradas.</p>
      )}
    </div>
  );
}

/* ============================================================
   COMPONENTE: Créditos
============================================================ */
function CreditsSection({ credits }) {
  return (
    <div className="bg-white border border-[#e6e0da] rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-[#611232] mb-4 flex items-center gap-2">
        <CreditCard size={20} />
        Créditos ({credits?.length || 0})
      </h2>

      {credits && credits.length > 0 ? (
        <div className="space-y-4">
          {credits.map((credit) => (
            <Link
              key={credit._id}
              to={`/admin/active-credits/${credit._id}`}
              className="block border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
            >
              <p className="font-semibold text-[#611232]">
                Crédito #{credit._id.slice(-12).toUpperCase()}
              </p>

              <p className="text-sm flex items-center gap-2">
                <span className="font-medium text-[#611232]">Estado:</span>

                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusBg(
                    credit.status
                  )} ${getStatusColor(credit.status)}`}
                >
                  {credit.status}
                </span>
              </p>

              <p className="text-sm">
                <span className="font-medium text-[#611232]">Creado:</span>{" "}
                <span className="font-semibold text-[#611232]">
                  {new Date(credit.createdAt).toLocaleDateString("es-MX")}
                </span>
              </p>

              <p className="text-sm">
                <span className="font-medium text-[#611232]">Monto:</span>{" "}
                <span className="font-semibold text-yellow-600">
                  {credit.amount}
                </span>
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No tiene créditos registrados.</p>
      )}
    </div>
  );
}

/* ============================================================
   COMPONENTE REUTILIZABLE
============================================================ */
function Info({ label, value, icon: Icon }) {
  return (
    <div>
      <p className="text-sm text-gray-600 flex items-center gap-1">
        {Icon && <Icon size={14} />}
        {label}
      </p>
      <p className="font-medium text-[#1a1a1a]">{value}</p>
    </div>
  );
}
