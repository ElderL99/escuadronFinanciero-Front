import { useState, useEffect, useCallback } from "react";
import { getApplicationById } from "../../api/admin";

export default function useGetApplications(applicationId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApplication = useCallback(async () => {
    if (!applicationId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await getApplicationById(applicationId);
      const appData = response?.data?.data;

      if (appData) {
        setData(appData);
      } else {
        setError("No se encontró información de la aplicación.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Error al obtener la aplicación."
      );
    } finally {
      setLoading(false);
    }
  }, [applicationId]);

  useEffect(() => {
    fetchApplication();
  }, [fetchApplication]);

  return { data, loading, error, refetch: fetchApplication };
}
