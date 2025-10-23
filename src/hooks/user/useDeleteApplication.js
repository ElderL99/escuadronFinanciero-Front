import { useEffect, useState } from "react";
import { deleteUserApplication } from "../../api/user";

export default function useDeleteUserApplication(id) {
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(false);

  const remove = () => setTrigger(true);

  useEffect(() => {
    if (!trigger || !id) return;

    const deleteData = async () => {
      try {
        setLoading(true);
        await deleteUserApplication(id);
        setDeleted(true);
      } catch (err) {
        setError(err.response?.data?.message || "Error al eliminar solicitud");
      } finally {
        setLoading(false);
        setTrigger(false);
      }
    };

    deleteData();
  }, [trigger, id]);

  return { deleted, loading, error, remove };
}
