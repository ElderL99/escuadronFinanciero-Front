import { useCallback, useEffect, useState } from "react";
import { getDocumentsByApplicationId } from "../../api/admin";

export default function useGetDocumentsById(applicationId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDocuments = useCallback(async () => {
    if (!applicationId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getDocumentsByApplicationId(applicationId);
      const docs = response?.data?.data || [];
      setData(docs);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Error al cargar documentos");
    } finally {
      setLoading(false);
    }
  }, [applicationId]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return {
    data,
    loading,
    error,
    refetch: fetchDocuments,
  };
}
