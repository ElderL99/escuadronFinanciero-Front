import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { sendUserApplications } from "../../api/user";

export default function useSendUserApplication() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendApplication = useCallback(async (applicationId) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const res = await sendUserApplications(applicationId);

      toast.success(res.data?.message || "✅ Solicitud enviada correctamente");

      setSuccess(true);
      return res.data;
    } catch (err) {
      const msg =
        err.response?.data?.message || "❌ Error al enviar la solicitud";
      setError(msg);
      toast.error(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendApplication, loading, error, success };
}
