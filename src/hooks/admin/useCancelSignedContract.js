import { useState } from "react";
import { cancelSignedContract } from "@/api/admin";

export default function useCancelSignedContract() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const cancelContract = async (contractId, reason) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await cancelSignedContract(contractId, reason);

      setSuccess(true);
    } catch (error) {
      error.response?.data?.message || "Error al cancelar el contrato";
    } finally {
      setLoading(false);
    }
  };

  return {
    cancelContract,
    loading,
    error,
    success,
  };
}
