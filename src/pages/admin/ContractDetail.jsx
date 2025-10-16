import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import { FileText, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function ContractDetail() {
  const { contractId } = useParams();
  const admin = useAdmin();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContract = async () => {
      try {
        setLoading(true);
        const response = await admin.fetchContractById(contractId);
        setContract(response?.data || null);
      } catch (err) {
        console.error("Error cargando contrato:", err);
      } finally {
        setLoading(false);
      }
    };

    loadContract();
  }, [contractId]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400">Cargando contrato...</p>
    );

  if (!contract)
    return (
      <p className="text-center mt-10 text-gray-400">
        No se encontró el contrato.
      </p>
    );

  const { contratoId, requestId, signed, signedAt, signedBy, url } = contract;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#611232] via-[#3e0d21] to-[#1b0510] flex justify-center items-center p-6">
      <div className="bg-white/10 backdrop-blur-md text-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full border border-white/10">
        {/* Encabezado */}
        <header className="mb-8 text-center">
          <FileText size={48} className="mx-auto mb-3 text-[#ffcedd]" />
          <h1 className="text-3xl font-bold tracking-wide mb-1">
            Detalle del Contrato
          </h1>
          <p className="text-gray-300 text-sm">
            Información completa del contrato #{contratoId}
          </p>
        </header>

        {/* Información */}
        <section className="space-y-4">
          <div className="flex justify-between items-center bg-white/10 p-4 rounded-xl">
            <span className="font-semibold">ID de Solicitud:</span>
            <Link
              to={`/admin/applications/${requestId}`}
              className="text-[#ffcedd] underline hover:text-white transition"
            >
              {requestId}
            </Link>
          </div>

          <div className="flex justify-between items-center bg-white/10 p-4 rounded-xl">
            <span className="font-semibold">Firmado:</span>
            <span
              className={`flex items-center gap-2 font-semibold ${
                signed ? "text-green-400" : "text-red-400"
              }`}
            >
              {signed ? (
                <>
                  <CheckCircle2 size={18} /> Sí
                </>
              ) : (
                <>
                  <XCircle size={18} /> No
                </>
              )}
            </span>
          </div>

          <div className="flex justify-between items-center bg-white/10 p-4 rounded-xl">
            <span className="font-semibold">Firmado por:</span>
            <span className="text-gray-200">{signedBy}</span>
          </div>

          <div className="flex justify-between items-center bg-white/10 p-4 rounded-xl">
            <span className="font-semibold flex items-center gap-2">
              <Clock size={16} /> Fecha de firma:
            </span>
            <span className="text-gray-300">
              {signedAt
                ? new Date(signedAt).toLocaleString("es-MX", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "—"}
            </span>
          </div>
        </section>

        {/* Acción */}
        <div className="mt-8 flex justify-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#611232] hover:bg-[#501025] text-white px-8 py-3 rounded-xl font-semibold shadow-md transition-all hover:shadow-lg"
          >
            Ver Contrato Firmado
          </a>
        </div>
      </div>
    </main>
  );
}
