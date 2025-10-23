import { useState, useCallback } from "react";
import { getUserDocuments } from "../../api/user";

export default function useUserDocuments() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserDocuments = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getUserDocuments(id);
      return res.data.data || {};
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener documentos");
      return {};
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchUserDocuments, loading, error };
}
