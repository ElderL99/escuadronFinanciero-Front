import { useState, useCallback } from "react";
import { updateUserApplication } from "../../api/user";

export default function useUpdateUserApplication() {
  const [updated, setUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = useCallback(async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const res = await updateUserApplication(id, data);
      setUpdated(res.data.data);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar solicitud");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updated, loading, error, update };
}
