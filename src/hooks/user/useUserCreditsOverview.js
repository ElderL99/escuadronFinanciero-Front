import { useState, useCallback } from "react";
import { getUserCreditsOverview } from "../../api/user";

export default function useUserCreditsOverview() {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCreditsOverview = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getUserCreditsOverview();
      setCredits(res.data.data || []);
    } catch (err) {
      console.error("❌ Error en useUserCreditsOverview:", err);
      setError(err.response?.data?.message || "Error al cargar los créditos");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    credits,
    loading,
    error,
    fetchCreditsOverview,
  };
}
