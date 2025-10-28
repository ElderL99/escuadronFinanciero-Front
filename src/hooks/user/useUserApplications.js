import { useEffect, useState } from "react";
import { getUserApplications } from "../../api/user";

export default function useUserApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const res = await getUserApplications();
        setApplications(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Error al obtener solicitudes");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return { applications, loading, error };
}
