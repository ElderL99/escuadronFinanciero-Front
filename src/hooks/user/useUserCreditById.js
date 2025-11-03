import { useState, useCallback } from "react";
import { getUserCreditById } from "../../api/user";

export default function useUserCreditById() {
  const [credit, setCredit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCreditById = useCallback(async (creditId) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getUserCreditById(creditId);
      setCredit(res.data.data || null);
    } catch (err) {
      console.error("❌ Error en useUserCreditById:", err);
      setError(err.response?.data?.message || "Error al obtener crédito");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    credit,
    loading,
    error,
    fetchCreditById,
  };
}
