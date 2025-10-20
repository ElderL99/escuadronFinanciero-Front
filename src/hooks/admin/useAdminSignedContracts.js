import { useState, useEffect, useCallback } from "react";
import { getAllContractsSigned } from "../../api/admin";

export default function useAdminSignedContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔁 Obtener todos los contratos firmados
  const fetchSignedContracts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getAllContractsSigned();

      // ✅ Solo usamos la propiedad `data`
      if (res?.data?.data && Array.isArray(res.data.data)) {
        setContracts(res.data.data);
      } else {
        setContracts([]);
      }
    } catch (error) {
      console.error("Error al obtener contratos firmados:", error);
      setError(
        error.response?.data?.message ||
          "Error al cargar los contratos firmados"
      );
      setContracts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔁 Ejecutar al montar el hook
  useEffect(() => {
    fetchSignedContracts();
  }, [fetchSignedContracts]);

  return { contracts, loading, error, refetch: fetchSignedContracts };
}
