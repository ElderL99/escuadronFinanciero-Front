import { useState, useCallback } from "react";
import { activeCreditById } from "../../api/admin";

export default function useActivateCredit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const activateCredit = useCallback(async (applicationId) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await activeCreditById(applicationId);
      setSuccess(response.data.message || "Crédito activado correctamente");
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al activar el crédito");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { activateCredit, loading, error, success };
}
