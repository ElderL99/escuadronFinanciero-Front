import { useState, useCallback } from "react";
import { uploadUserPaymentTicket } from "../../api/user";
import toast from "react-hot-toast";

export default function useUploadPayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadTicket = useCallback(async (creditId, paymentNumber, file) => {
    try {
      setLoading(true);
      setError(null);

      const res = await uploadUserPaymentTicket(creditId, paymentNumber, file);

      toast.success("✅ Ticket subido correctamente");
      return res.data;
    } catch (err) {
      console.error("❌ Error al subir ticket:", err);
      const msg =
        err.response?.data?.message || "Error al subir el comprobante de pago.";
      setError(msg);
      toast.error(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    uploadTicket,
    loading,
    error,
  };
}
