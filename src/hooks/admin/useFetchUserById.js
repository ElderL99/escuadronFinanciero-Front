import { useState, useEffect } from "react";
import { getUserById } from "../../api/admin";

export default function useFetchUserById(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getUserById(userId);
        setUser(response.data.data || null);
      } catch (err) {
        setError(err.response?.data?.message || "Error al cargar usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
}
