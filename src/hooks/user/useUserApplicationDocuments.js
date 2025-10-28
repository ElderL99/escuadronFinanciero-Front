import { useEffect, useState } from "react";
import { getUserApplicationDocuments } from "../../api/user";

export default function useUserApplicationDocuments(id) {
  const [documents, setDocuments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const res = await getUserApplicationDocuments(id);
        setDocuments(res.data.data || {});
      } catch (err) {
        setError(err.response?.data?.message || "Error al obtener documentos");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [id]);

  return { documents, loading, error };
}
