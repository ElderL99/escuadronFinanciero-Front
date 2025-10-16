import { useState, useCallback } from "react";
import { getAllContractsSigned, getContractById } from "../../api/admin";

export default function useAdminContracts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todos los contratos firmados
  const fetchAllContracts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllContractsSigned();
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener contratos");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener contrato por ID
  const fetchContractById = useCallback(async (contractId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getContractById(contractId);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener contrato");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchAllContracts,
    fetchContractById,
  };
}
