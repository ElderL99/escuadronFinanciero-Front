import { useState } from "react";
import toast from "react-hot-toast";
import { getUserCreditContract } from "../../api/user.js";

export default function useUserContract() {
  const [contractUrl, setContractUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchContractUrl = async (creditId) => {
    try {
      setLoading(true);

      const response = await getUserCreditContract(creditId);
      const url = response.data.data.url;

      setContractUrl(url);
      toast.success("Contrato listo para descargar");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo obtener el contrato");
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
