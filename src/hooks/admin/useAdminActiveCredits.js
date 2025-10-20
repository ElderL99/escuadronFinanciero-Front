import { useState, useCallback, useEffect } from "react";
import { getAllCreditsActive } from "../../api/admin";

export default function useAdminActiveCredits() {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActiveCredits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllCreditsActive();
      setCredits(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Error al obtener créditos activos"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveCredits();
  }, [fetchActiveCredits]);

  return { credits, loading, error, fetchActiveCredits };
}
