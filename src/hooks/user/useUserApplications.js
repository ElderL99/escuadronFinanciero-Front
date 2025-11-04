import { useState, useCallback } from "react";
import { getUserApplications } from "../../api/user";

export default function useUserApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getUserApplications();
      setApplications(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener solicitudes");
    } finally {
      setLoading(false);
    }
  }, []);

  return { applications, loading, error, fetchUserApplications };
}
