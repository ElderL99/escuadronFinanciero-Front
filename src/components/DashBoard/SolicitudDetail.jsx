import { Link, useParams } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DocumentosFirmados from "./DocumentsFirmados";
import ApproveButton from "./ApproveButton";

export default function SolicitudDetail() {
  const { id } = useParams();
  const [solicitud, setSolicitud] = useState(null);
  const [documentosFirmados, setDocumentosFirmados] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const admin = useAdmin();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Traer solicitud principal
        const res = await admin.fetchApplicationById(id);
        setSolicitud(res.data);

        // Traer documentos firmados
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
    <main className="p-6 max-w-6xl mx-auto">
      {/* ===================== TÍTULO + BOTÓN ===================== */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-[#611232]">
          {solicitud.nombre}
        </h1>
        {solicitud.state === "submitted" && (
          <ApproveButton
            applicationId={id}
            admin={admin}
            onApproved={() =>
              setSolicitud((prev) => ({ ...prev, state: "approved" }))
            }
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ===================== DATOS PERSONALES ===================== */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-lg space-y-5 border-l-8 border-[#611232]"
        >
          <h2 className="text-2xl font-semibold mb-3 text-[#611232]">
            Información Personal
          </h2>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
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

          <h2 className="text-2xl font-semibold mt-6 mb-3 text-[#611232]">
            Datos del Servicio
          </h2>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
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
          className="inline-block bg-[#611232]/90 hover:bg-[#501025] text-white px-6 py-3 rounded-2xl font-semibold shadow-md transition-colors"
        >
          Volver al Dashboard
        </Link>
      </div>
    </main>
  );
}
