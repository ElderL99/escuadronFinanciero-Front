import useGetApplications from "../../../hooks/admin/useGetApplications";
import useGetDocumentsById from "../../../hooks/admin/useGetDocumentsById";
import ReviewDocuments from "../../../components/DashBoard/ApplicationsComponents/ReviewDocuments";
import ApproveButton from "../../../components/DashBoard/ApproveButton";
import RejectButton from "../../../components/DashBoard/RejectButton";
import { useParams } from "react-router-dom";
import ApplicationDetailsCard from "../../../components/DashBoard/ApplicationsComponents/ApplicatinoDetailCard";

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const { data, loading, error, refetch } = useGetApplications(id);
  const {
    data: documentos,
    loading: loadingDocs,
    error: errorDocs,
  } = useGetDocumentsById(id);

  if (loading || loadingDocs)
    return <p className="text-[#611232]">Cargando aplicación...</p>;

  if (error || errorDocs)
    return (
      <p className="text-red-500">
        {error || errorDocs || "Error al cargar información"}
      </p>
    );

  return (
    <div className="min-h-screen flex justify-center items-start bg-[#f9f9f9] py-10 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 gap-6">
        {/* --- Sección 1: Detalles de la solicitud --- */}
        <ApplicationDetailsCard data={data} />
        {/* --- Sección 2: Documentos --- */}
        <section className="bg-[#faf7f2]  rounded-2xl shadow-md border border-[#e0d2c2]">
          <ReviewDocuments documentos={documentos} />
        </section>

        {/* --- Sección 3: Botones de acción --- */}
        {data?.state === "submitted" && (
          <section className="flex flex-col sm:flex-row justify-center items-center gap-4  mt-6">
            <ApproveButton applicationId={id} onApproved={refetch} />
            <RejectButton applicationId={id} onRejected={refetch} />
          </section>
        )}
      </div>
    </div>
  );
}
