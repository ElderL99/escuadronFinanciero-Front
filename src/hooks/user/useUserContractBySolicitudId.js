import { useState, useCallback } from "react";
import { getUserContractBySolicitudId } from "../../api/user";

export default function useUserContractBySolicitudId() {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Obtener contrato por solicitud ID
  const fetchContract = useCallback(async (solicitudId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserContractBySolicitudId(solicitudId);

      if (response.data.success) {
        setContract(response.data.data);
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Error al obtener contrato");
      }
    } catch (err) {
      console.error("❌ Error al obtener contrato:", err);
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    contract,
    loading,
    error,
    fetchContract,
  };
}
