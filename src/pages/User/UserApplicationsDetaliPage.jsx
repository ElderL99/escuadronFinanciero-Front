import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, FileText, Trash2, Edit, Send } from "lucide-react";
import toast from "react-hot-toast";
import useUserApplicationById from "../../hooks/user/useUserApplicationById";
import useSendUserApplication from "../../hooks/user/useSendApplication";
import useDeleteUserApplication from "../../hooks/user/useDeleteApplication";
import useUpdateUserApplication from "../../hooks/user/useUpdateApplication";
import useUserContractBySolicitudId from "../../hooks/user/useUserContractBySolicitudId";
import ConfirmModal from "../../components/usedashboard/ConfirmModal";

export default function UserApplicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { application, loading, error } = useUserApplicationById(id);
  const { sendApplication, loading: sending } = useSendUserApplication();
  const { remove, loading: deleting, deleted } = useDeleteUserApplication(id);
  const { update, loading: updating } = useUpdateUserApplication(id, {});
  const [showSendModal, setShowSendModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSend = async () => {
    const res = await sendApplication(id);
    if (res) {
      setShowSendModal(false);
      navigate("/user/solicitudes");
    }
  };

  const handleDelete = async () => {
    remove();
    setShowDeleteModal(false);
  };

  const handleUpdate = () => {
    navigate(`/user/solicitud/${id}/editar`);
  };

  if (deleted) {
    navigate("/user/solicitudes");
    return null;
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#611232]">
        <Loader2 className="animate-spin w-8 h-8 mb-2" />
        <p>Cargando información de la solicitud...</p>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <p className="text-[#611232] font-semibold mb-2">❌ Error</p>
        <p>{error || "No se encontró la solicitud."}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm px-4 py-2 rounded-lg bg-[#611232] text-white hover:bg-[#4a0f27] transition"
        >
          Volver
        </button>
      </div>
    );
  }

  const app = application;

  // 🔹 Traducción de estados
  const estados = {
    draft: "Borrador",
    pending: "Pendiente",
    approved: "Aprobada",
    rejected: "Rechazada",
    awaiting_signature: "En espera de firma",
    signed: "Firmada",
    active: "Activa",
    completed: "Completada",
  };

  const estadoTraducido = estados[app.state] || app.state;

  return (
    <section className="max-w-5xl mx-auto py-10 px-4">
      {/* 🔙 Volver */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#611232] mb-6 hover:text-[#4a0f27] transition"
      >
        <ArrowLeft size={18} /> Volver a mis solicitudes
      </button>

      {/* 🧾 Encabezado */}
      <h1 className="text-2xl font-semibold text-[#611232] mb-2">
        Solicitud #{app._id.slice(-6).toUpperCase()}
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Creada el{" "}
        {new Date(app.createdAt).toLocaleDateString("es-MX", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}{" "}
        • Estado:{" "}
        <span
          className={`font-semibold ${
            app.state === "active"
              ? "text-[#0066cc]"
              : app.state === "completed"
              ? "text-[#0c7a43]"
              : app.state === "awaiting_signature"
              ? "text-[#d4af37]"
              : app.state === "rejected"
              ? "text-[#b91c1c]"
              : "text-[#611232]"
          }`}
        >
          {estadoTraducido}
        </span>
      </p>

      {/* 🔹 Botones de acción */}
      {app.state === "draft" && (
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <ActionButton
            icon={<Edit size={18} />}
            text="Actualizar"
            onClick={handleUpdate}
            loading={updating}
            color="bg-amber-600 hover:bg-amber-700"
          />
          <ActionButton
            icon={<Trash2 size={18} />}
            text="Eliminar"
            onClick={() => setShowDeleteModal(true)}
            loading={deleting}
            color="bg-gray-400/50 hover:bg-red-700"
          />
          <ActionButton
            icon={<Send size={18} />}
            text="Enviar solicitud"
            onClick={() => setShowSendModal(true)}
            loading={sending}
            color="bg-[#611232] hover:bg-[#4a0f27]"
          />
        </div>
      )}

      {/* 📑 Contrato y firma */}
      {app.state === "awaiting_signature" && (
        <div className="bg-[#fff8e6] border border-[#d4af37]/40 rounded-xl p-5 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold text-[#611232] mb-2">
            Contrato de préstamo pendiente de firma ✍️
          </h2>
          <p className="text-gray-700 mb-4">
            Tu solicitud ha sido aprobada ✅. Revisa el contrato generado y
            fírmalo digitalmente para continuar el proceso.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <ViewContractButton solicitudId={app._id} />
            <button
              onClick={() => navigate(`/user/solicitud/${app._id}/firma`)}
              className="flex items-center justify-center gap-2 border border-[#611232] text-[#611232] hover:bg-[#611232]/10 font-medium px-4 py-2 rounded-lg transition w-full sm:w-auto"
            >
              <FileText size={18} />
              Firmar contrato
            </button>
          </div>
        </div>
      )}

      {/* 💼 Datos Personales */}
      <Section title="Datos Personales">
        <Grid>
          <Field label="Nombre" value={app.nombre} />
          <Field label="Grado" value={app.grado} />
          <Field label="Empleo" value={app.empleo} />
          <Field label="Matrícula" value={app.matricula} />
          <Field label="ID Personal" value={app.idPersonal} />
          <Field label="Teléfono" value={app.telefono} />
          <Field
            label="Número de cuenta bancaria"
            value={app.clienteNumberBank}
          />
        </Grid>
      </Section>

      {/* ⚙️ Datos del Servicio */}
      <Section title="Datos del Servicio">
        <Grid>
          <Field label="Unidad" value={app.unidad} />
          <Field label="Zona" value={app.zona} />
          <Field label="Región" value={app.region} />
          <Field
            label="Unidad Ejecutora de Pago"
            value={app.unidadEjecutoraDePago}
          />
          <Field
            label="Fecha de alta"
            value={new Date(app.fechaAlta).toLocaleDateString("es-MX")}
          />
          <Field
            label="Último ascenso"
            value={new Date(app.ultimoAscenso).toLocaleDateString("es-MX")}
          />
          <Field
            label="Préstamo Banjercito"
            value={app.prestamoBanjercito ? "Sí" : "No"}
          />
          <Field
            label="Pensión Alimenticia"
            value={app.pensionAlimenticia ? "Sí" : "No"}
          />
        </Grid>
      </Section>

      {/* 💰 Información del préstamo */}
      <Section title="Información del préstamo">
        <Grid>
          <Field
            label="Monto solicitado"
            value={`$${app.requestedAmount?.toLocaleString("es-MX")}`}
          />
          <Field
            label="Modalidad de pago"
            value={app.paymentMode?.toUpperCase()}
          />
          <Field
            label="Última actualización"
            value={new Date(app.updatedAt).toLocaleDateString("es-MX")}
          />
        </Grid>
      </Section>

      {/* 📄 Documentos */}
      <Section title="Documentos subidos">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.keys(app.documentos || {}).map((key) => (
            <button
              key={key}
              className="flex items-center gap-2 px-4 py-3 bg-[#611232]/10 text-[#611232] border border-[#611232]/20 rounded-lg hover:bg-[#611232]/15 transition"
            >
              <FileText size={18} />
              <span className="capitalize">{key}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* 🔹 Modales */}
      <ConfirmModal
        isOpen={showSendModal}
        onClose={() => setShowSendModal(false)}
        onConfirm={handleSend}
        title="Enviar solicitud"
        message="Una vez enviada, no podrás editarla. ¿Deseas continuar?"
        confirmText="Enviar"
        confirmColor="bg-[#611232] hover:bg-[#4a0f27]"
      />

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Eliminar solicitud"
        message="¿Seguro que deseas eliminar esta solicitud? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        confirmColor="bg-red-600 hover:bg-red-700"
      />
    </section>
  );
}

/* 🔹 Subcomponentes */
function Section({ title, children }) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-[#611232]/10 shadow-sm mb-8">
      <h2 className="text-lg font-semibold text-[#611232] mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Grid({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
  );
}

function Field({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="font-medium text-[#611232]/90 break-all">
        {value || "—"}
      </span>
    </div>
  );
}

function ActionButton({ icon, text, onClick, loading, color }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition w-full sm:w-auto ${color} disabled:opacity-60`}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin w-4 h-4" /> Procesando...
        </>
      ) : (
        <>
          {icon}
          {text}
        </>
      )}
    </button>
  );
}

/* 🔹 Ver contrato */
function ViewContractButton({ solicitudId }) {
  const { fetchContract, loading } = useUserContractBySolicitudId();

  const handleViewContract = async () => {
    try {
      const data = await fetchContract(solicitudId);
      if (data?.url) {
        window.open(data.url, "_blank");
      } else {
        toast.error("No se encontró el contrato generado.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al cargar el contrato.");
    }
  };

  return (
    <button
      onClick={handleViewContract}
      disabled={loading}
      className="flex items-center justify-center gap-2 bg-[#611232] hover:bg-[#4a0f27] text-white font-medium px-4 py-2 rounded-lg transition w-full sm:w-auto disabled:opacity-60"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Cargando...
        </>
      ) : (
        <>
          <FileText size={18} />
          Ver contrato
        </>
      )}
    </button>
  );
}
