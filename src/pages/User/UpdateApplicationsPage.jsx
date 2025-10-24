import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUserApplicationById from "../../hooks/user/useUserApplicationById";
import useUpdateUserApplication from "../../hooks/user/useUpdateApplication";
import useUpdateDocuments from "../../hooks/user/useUpdateDocuments";
import { Loader2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import UpdateForm from "../../components/usedashboard/UpdateApplicationsPageComponents/UpdateForm";
import DocumentsUpdater from "../../components/usedashboard/UpdateApplicationsPageComponents/DocumentsUpdater";

export default function UpdateApplicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    application,
    loading,
    error: fetchError,
  } = useUserApplicationById(id);
  const {
    update,
    loading: updating,
    error: updateError,
  } = useUpdateUserApplication();
  const { updateDocuments, loading: uploading } = useUpdateDocuments();

  // Mostrar errores del backend
  useEffect(() => {
    if (fetchError) toast.error(fetchError);
  }, [fetchError]);

  useEffect(() => {
    if (updateError) toast.error(updateError);
  }, [updateError]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#611232]">
        <Loader2 className="animate-spin w-8 h-8 mb-2" />
        <p>Cargando solicitud...</p>
      </div>
    );

  if (fetchError || !application)
    return (
      <div className="text-center text-gray-500 py-20">
        <p>❌ {fetchError || "No se encontró la solicitud"}</p>
      </div>
    );

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#611232] mb-6 hover:text-[#4a0f27] transition"
      >
        <ArrowLeft size={18} /> Volver
      </button>

      <h1 className="text-2xl font-semibold text-[#611232] mb-6">
        Actualizar Solicitud
      </h1>

      <UpdateForm
        id={id}
        application={application}
        update={update}
        updating={updating}
        navigate={navigate}
      />

      <DocumentsUpdater
        id={id}
        application={application}
        updateDocuments={updateDocuments}
        uploading={uploading}
      />
    </section>
  );
}
