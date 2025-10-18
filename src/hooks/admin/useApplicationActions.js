import { useState, useCallback } from "react";
import {
  approveUsersApplicationsById,
  rejectUserApplication,
} from "../../api/admin";

export default function useApplicationActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // ✅ Aprobar solicitud
  const approveApplication = useCallback(async (applicationId) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await approveUsersApplicationsById(applicationId);
      setSuccess("Solicitud aprobada con éxito");
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al aprobar la solicitud");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ❌ Rechazar solicitud
  const rejectApplication = useCallback(async (applicationId) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await rejectUserApplication(applicationId);
      setSuccess("Solicitud rechazada con éxito");
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al rechazar la solicitud");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    success,
    approveApplication,
    rejectApplication,
  };
}
