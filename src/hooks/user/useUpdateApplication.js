import { useState, useEffect } from "react";
import { updateUserApplication } from "../../api/user";

export default function useUpdateUserApplication(id, formData) {
  const [updated, setUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(false);

  // Llama a esta función desde el componente para ejecutar el update
  const update = (data) => {
    setTrigger(true);
    if (data) Object.assign(formData, data);
  };

  useEffect(() => {
    if (!trigger || !id) return;

    const updateData = async () => {
      try {
        setLoading(true);
        const res = await updateUserApplication(id, formData);
        setUpdated(res.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Error al actualizar solicitud"
        );
      } finally {
        setLoading(false);
        setTrigger(false);
      }
    };

    updateData();
  }, [trigger, id]);

  return { updated, loading, error, update };
}
