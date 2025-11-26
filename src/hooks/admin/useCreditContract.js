import { useState } from "react";
import toast from "react-hot-toast";
import { getAdminCreditContract } from "../../api/admin.js";

export default function useCreditContract() {
  const [contractUrl, setContractUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchContractUrl = async (creditId) => {
    try {
      setLoading(true);

      const response = await getAdminCreditContract(creditId);
      const url = response.data.data.url;

      setContractUrl(url);
      toast.success("Contrato listo para descargar");
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener el contrato");
    } finally {
      setLoading(false);
    }
  };

  return {
    contractUrl,
    loading,
    fetchContractUrl,
  };
}
