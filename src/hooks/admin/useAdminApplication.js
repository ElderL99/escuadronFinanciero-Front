import { useState, useCallback } from "react";
import {
  getAdminApplicationsSubmitted,
  getApplicationById,
  approveUsersApplicationsById,
  rejectUserApplication,
  getDocumentsByApplicationId,
} from "../../api/admin.js";

export default function useAdminApplications() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSubmittedApplications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAdminApplicationsSubmitted();
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener solicitudes");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchApplicationById = useCallback(async (id) => {
    try {
      setLoading(true);
      const res = await getApplicationById(id);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener solicitud");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const approveApplication = useCallback(async (id) => {
    try {
      setLoading(true);
      const res = await approveUsersApplicationsById(id);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al aprobar");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const rejectApplication = useCallback(async (id) => {
    try {
      setLoading(true);
      const res = await rejectUserApplication(id);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al rechazar");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDocuments = useCallback(async (id) => {
    try {
      setLoading(true);
      const res = await getDocumentsByApplicationId(id);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener documentos");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchSubmittedApplications,
    fetchApplicationById,
    approveApplication,
    rejectApplication,
    fetchDocuments,
  };
}
