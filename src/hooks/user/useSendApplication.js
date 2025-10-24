import { useState, useCallback } from "react";
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
      setSuccess(true);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al enviar la solicitud");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendApplication, loading, error, success };
}
