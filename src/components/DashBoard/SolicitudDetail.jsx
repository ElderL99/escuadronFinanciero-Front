import { Link, useParams } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DocumentosFirmados from "./DocumentsFirmados";
import ApproveButton from "./ApproveButton";
import RejectButton from "./RejectButton";

export default function SolicitudDetail() {
  const { id } = useParams();
  const [solicitud, setSolicitud] = useState(null);
  const [documentosFirmados, setDocumentosFirmados] = useState({});
  const admin = useAdmin();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await admin.fetchApplicationById(id);
        setSolicitud(res.data);

        const docs = await admin.fetchDocuments(id);
        setDocumentosFirmados(docs || []);
      } catch (error) {
        console.error("Error cargando solicitud o documentos:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!solicitud)
    return (
      <p className="text-center mt-10 text-gray-400">Cargando solicitud...</p>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#611232] via-[#3e0d21] to-[#1b0510] flex flex-col justify-center items-center p-6">
      <div className="bg-white/10 backdrop-blur-md text-white rounded-3xl shadow-2xl p-8 max-w-6xl w-full border border-white/10">
        {/* ===================== TÍTULO + BOTONES ===================== */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-white/10 pb-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide mb-4 md:mb-0">
            {solicitud.nombre}
          </h1>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              solicitud.state === "approved"
                ? "bg-green-600/80"
                : solicitud.state === "rejected"
                ? "bg-red-600/80"
                : "bg-yellow-600/80"
            }`}
          >
            Estado: {solicitud.state}
          </span>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ===================== DATOS PERSONALES ===================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/10 p-6 rounded-2xl shadow-inner border border-white/10 space-y-6"
          >
            <h2 className="text-2xl font-semibold text-[#ffcedd] mb-3 border-b border-white/10 pb-2">
              Información Personal
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-200">
              <p>
                <strong>ID Personal:</strong> {solicitud.idPersonal}
              </p>
              <p>
                <strong>Matrícula:</strong> {solicitud.matricula}
              </p>
              <p>
                <strong>Empleo:</strong> {solicitud.empleo}
              </p>
              <p>
                <strong>Grado:</strong> {solicitud.grado}
              </p>
              <p>
                <strong>Unidad:</strong> {solicitud.unidad}
              </p>
              <p>
                <strong>Zona:</strong> {solicitud.zona}
              </p>
              <p>
                <strong>Región:</strong> {solicitud.region}
              </p>
              <p>
                <strong>Teléfono:</strong> {solicitud.telefono}
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-[#ffcedd] mt-6 mb-3 border-b border-white/10 pb-2">
              Datos del Servicio
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-200">
              <p>
                <strong>Fecha de Alta:</strong>{" "}
                {new Date(solicitud.fechaAlta).toLocaleDateString()}
              </p>
              <p>
                <strong>Último Ascenso:</strong>{" "}
                {new Date(solicitud.ultimoAscenso).toLocaleDateString()}
              </p>
              <p>
                <strong>Préstamo Banjercito:</strong>{" "}
                {solicitud.prestamoBanjercito ? "Sí" : "No"}
              </p>
              <p>
                <strong>Pensión Alimenticia:</strong>{" "}
                {solicitud.pensionAlimenticia ? "Sí" : "No"}
              </p>
              <p>
                <strong>Monto solicitado:</strong> ${solicitud.requestedAmount}
              </p>
              <p>
                <strong>Modalidad de pago:</strong> {solicitud.paymentMode}
              </p>
              <p>
                <strong>Estado:</strong>{" "}
                <span className="capitalize">{solicitud.state}</span>
              </p>
            </div>
          </motion.div>

          {/* ===================== DOCUMENTOS ===================== */}
          <div className="rounded-2xl shadow-inner ">
            <DocumentosFirmados data={documentosFirmados.data} />
          </div>
        </div>

        {/* ===================== BOTONES DE ACCIÓN ===================== */}
        <section className="mt-10 flex justify-center items-center">
          {solicitud.state === "submitted" && (
            <div className="flex gap-4">
              <ApproveButton
                applicationId={id}
                admin={admin}
                onApproved={() =>
                  setSolicitud((prev) => ({ ...prev, state: "approved" }))
                }
              />
              <RejectButton
                applicationId={id}
                admin={admin}
                onRejected={() =>
                  setSolicitud((prev) => ({ ...prev, state: "rejected" }))
                }
              />
            </div>
          )}
        </section>

        {/* ===================== BOTÓN VOLVER ===================== */}
        <div className="mt-10 text-center">
          <Link
            to="/admin/dashboard"
            className="inline-block bg-[#611232] hover:bg-[#501025] text-white px-8 py-3 rounded-2xl font-semibold shadow-md transition-all hover:shadow-lg"
          >
            Volver al Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
