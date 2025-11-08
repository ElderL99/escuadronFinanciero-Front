import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
        setError(null);
        setDeleted(false);

        const res = await deleteUserApplication(id);

        toast.success(
          res.data?.message || "🗑️ Solicitud eliminada correctamente"
        );
        setDeleted(true);
      } catch (err) {
        const msg =
          err.response?.data?.message || "❌ Error al eliminar la solicitud";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
        setTrigger(false);
      }
    };

    deleteData();
  }, [trigger, id]);

  return { deleted, loading, error, remove };
}
