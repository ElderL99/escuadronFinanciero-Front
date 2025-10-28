import { useEffect, useState } from "react";
import { getUserApplicationById } from "../../api/user";

export default function useUserApplicationById(id) {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchApplication = async () => {
      try {
        setLoading(true);
        const res = await getUserApplicationById(id);
        setApplication(res.data.data || null);
      } catch (err) {
        setError(
          err.response?.data?.message || "Error al obtener la solicitud"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  return { application, loading, error };
}
