import { useState, useEffect } from "react";
import { getAllUsers } from "../../api/admin";

export default function useFetchUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllUsers();
        setUsers(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Error al cargar usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
}
