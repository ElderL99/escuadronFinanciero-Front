import { useCallback, useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/admin";

export const useAdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAdminDashboard();
      const info = response?.data?.data;

      if (info) {
        setData({
          resumen: info.resumen,
          pendientes: info.pendientes,
        });
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Error al cargar dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    data,
    loading,
    error,
    refetch: fetchDashboard,
  };
};
