import { useState } from "react";
import { rejectPayment } from "../../api/admin";

export default function useRejectPayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const reject = async (creditId, paymentNumber, reason = "Sin motivo") => {
    try {
      setLoading(true);
      setError(null);
      const res = await rejectPayment(creditId, paymentNumber, reason);
      setSuccess(res.data.message);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al rechazar pago");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { reject, loading, error, success };
}
