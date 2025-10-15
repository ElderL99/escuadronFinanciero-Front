import { Link, useParams } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DocumentosFirmados from "./DocumentsFirmados";
import ApproveButton from "./ApproveButton";
import RejectButton from "./RejectButton";
import { Check, X } from "lucide-react";

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

        const docs = await admin.fetchApplicationDocumentsById(id);
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
    <main className="p-6 max-w-7xl mx-auto">
      {/* ===================== TÍTULO + BOTONES ===================== */}
      <div className="relative mb-8 bg-gradient-to-r from-[#fef3f3] to-[#fff] rounded-2xl p-6 shadow-lg flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-[#611232]">
          {solicitud.nombre}
        </h1>

        {solicitud.state === "submitted" && (
          <div className="flex gap-3 absolute top-4 right-4">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ===================== DATOS PERSONALES ===================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#611232] space-y-6"
        >
          <h2 className="text-xl font-semibold text-[#611232] mb-3 border-b border-gray-200 pb-2">
            Información Personal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
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

          <h2 className="text-xl font-semibold text-[#611232] mt-6 mb-3 border-b border-gray-200 pb-2">
            Datos del Servicio
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
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
        <DocumentosFirmados data={documentosFirmados.data} />
      </div>

      {/* ===================== BOTÓN VOLVER ===================== */}
      <div className="mt-8 text-center">
        <Link
          to="/admin/dashboard"
          className="inline-block bg-[#611232] hover:bg-[#501025] text-white px-6 py-3 rounded-2xl font-semibold shadow-md transition-colors"
        >
          Volver al Dashboard
        </Link>
      </div>
    </main>
  );
}
