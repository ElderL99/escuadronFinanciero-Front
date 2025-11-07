import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useGetApplications from "../../../hooks/admin/useGetApplications";
import useGetDocumentsById from "../../../hooks/admin/useGetDocumentsById";
import ReviewDocuments from "../../../components/DashBoard/ApplicationsComponents/ReviewDocuments";
import ApproveButton from "../../../components/DashBoard/ApproveButton";
import RejectButton from "../../../components/DashBoard/RejectButton";
import ApplicationDetailsCard from "../../../components/DashBoard/ApplicationsComponents/ApplicatinoDetailCard";
import { Loader2 } from "lucide-react";

export default function ApplicationDetailPage() {
  const { id } = useParams();

  // 🔹 Cargar datos en paralelo
  const { data: application, loading, error, refetch } = useGetApplications(id);
  const {
    data: documentos,
    loading: loadingDocs,
    error: errorDocs,
  } = useGetDocumentsById(id);

  // 🧠 Evitar cálculos repetidos
  const isLoading = loading || loadingDocs;
  const isError = error || errorDocs;
  const canReview = application?.state === "submitted";

  // 🔄 Render mínimo: no re-renderiza todo el árbol en cada hook update
  const memoizedDocs = useMemo(() => documentos || [], [documentos]);

  // 🌀 Loading UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[#611232]/80">
        <Loader2 className="w-6 h-6 animate-spin mb-2" />
        <p>Cargando información de la solicitud...</p>
      </div>
    );
  }

  // 🚫 Error UI
  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-600 font-medium">
        <p>{error || errorDocs || "Error al cargar información"}</p>
      </div>
    );
  }

  // ✅ UI principal
  return (
    <div className="min-h-screen bg-[#f9f9f9] py-10 px-4 flex justify-center">
      <div className="w-full max-w-6xl space-y-6">
        {/* --- Sección 1: Detalles de la solicitud --- */}
        <ApplicationDetailsCard data={application} />

        {/* --- Sección 2: Documentos --- */}
        <section className="bg-[#faf7f2] rounded-2xl shadow-md border border-[#e0d2c2] p-4 sm:p-6">
          <ReviewDocuments documentos={memoizedDocs} />
        </section>

        {/* --- Sección 3: Botones de acción --- */}
        {canReview && (
          <section className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <ApproveButton applicationId={id} onApproved={refetch} />
            <RejectButton applicationId={id} onRejected={refetch} />
          </section>
        )}
      </div>
    </div>
  );
}
