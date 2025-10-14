import { useState, useCallback } from "react";
import {
  getAdminDashboard,
  getAdminApplicationsSubmitted,
  approveUsersApplications,
  rejectUserApplication,
  activeUserCredit,
  getApplicationById,
} from "../api/admin";

export default function useAdmin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener dashboard
  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAdminDashboard();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener el dashboard");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener solicitudes enviadas
  const fetchSubmittedApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAdminApplicationsSubmitted();
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener solicitudes");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // obtener solicitudes by ID

  const fetchApplicationById = useCallback(async (applicationId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getApplicationById(applicationId);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener la solicitud");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Aprobar solicitud
  const approveApplication = useCallback(async (applicationId) => {
    try {
      setLoading(true);
      setError(null);
      const res = await approveUsersApplications({ applicationId });
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al aprobar solicitud");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Rechazar solicitud
  const rejectApplication = useCallback(async (applicationId) => {
    try {
      setLoading(true);
      setError(null);
      const res = await rejectUserApplication({ applicationId });
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al rechazar solicitud");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Activar crédito
  const activateCredit = useCallback(async (applicationId) => {
    try {
      setLoading(true);
      setError(null);
      const res = await activeUserCredit({ applicationId });
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al activar crédito");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchDashboard,
    fetchSubmittedApplications,
    fetchApplicationById,
    approveApplication,
    rejectApplication,
    activateCredit,
  };
}
