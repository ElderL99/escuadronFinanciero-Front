import { useState, useCallback } from "react";
import { getAdminDashboard } from "../../api/admin.js";

export default function useAdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener datos del dashboard
  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAdminDashboard();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener el dashboard");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchDashboard,
  };
}
