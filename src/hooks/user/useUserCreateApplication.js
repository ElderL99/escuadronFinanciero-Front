import { useState, useCallback } from "react";
import { createUserApplication } from "@/api/user";
import toast from "react-hot-toast";

export default function useUserCreateApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createApplication = useCallback(async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await createUserApplication(formData);

      toast.success(
        response.data.message || "✅ Solicitud creada exitosamente"
      );
      return response.data;
    } catch (err) {
      console.error("Error al crear solicitud:", err);
      const msg =
        err.response?.data?.message ||
        "❌ Error al crear la solicitud. Inténtalo nuevamente.";
      setError(msg);
      toast.error(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createApplication, loading, error };
}
