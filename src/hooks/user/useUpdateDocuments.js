import { useState, useCallback } from "react";
import { updateUserApplicationDocuments } from "../../api/user";

export default function useUpdateDocuments() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateDocuments = useCallback(async (id, formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const res = await updateUserApplicationDocuments(id, formData);
      setSuccess(true);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar documentos");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateDocuments, loading, error, success };
}
