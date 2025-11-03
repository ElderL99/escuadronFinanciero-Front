import { useState, useCallback } from "react";
import { getUserCreditsOverview } from "../../api/user";

export default function useUserCredits() {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserCredits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserCreditsOverview();
      setCredits(response.data.data || []);
    } catch (err) {
      console.error("❌ Error al obtener créditos:", err);
      setError(err.response?.data?.message || "Error al obtener créditos");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    credits,
    loading,
    error,
    fetchUserCredits,
  };
}
