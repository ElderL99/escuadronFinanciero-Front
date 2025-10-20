import { useState, useEffect, useCallback } from "react";
import { getContractById } from "../../api/admin";

export default function useAdminContractById(contractId) {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContract = useCallback(async () => {
    if (!contractId) return;
    try {
      setLoading(true);
      setError(null);

      const res = await getContractById(contractId);

      if (res?.data?.data) {
        setContract(res.data.data);
      } else {
        setContract(null);
      }
    } catch (err) {
      console.error("Error al obtener contrato:", err);
      setError(err.response?.data?.message || "Error al cargar el contrato");
      setContract(null);
    } finally {
      setLoading(false);
    }
  }, [contractId]);

  useEffect(() => {
    fetchContract();
  }, [fetchContract]);

  return { contract, loading, error, refetch: fetchContract };
}
