import { useState, useCallback } from "react";
import { getAllCreditsActive, activeCreditById } from "../../api/admin";

export default function useAdminCredits() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener créditos activos
  const fetchActiveCredits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllCreditsActive();
      return response.data;
    } catch (err) {
      setError(
        err.response?.data?.message || "Error al obtener créditos activos"
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Activar crédito manualmente (si aplica)
  const activateCredit = useCallback(async (applicationId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await activeCreditById(applicationId);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al activar crédito");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchActiveCredits,
    activateCredit,
  };
}
