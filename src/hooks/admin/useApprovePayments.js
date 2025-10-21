import { useState } from "react";
import { approvePayment } from "../../api/admin";

export default function useApprovePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const approve = async (creditId, paymentNumber) => {
    try {
      setLoading(true);
      setError(null);
      const res = await approvePayment(creditId, paymentNumber);
      setSuccess(res.data.message);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al aprobar pago");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { approve, loading, error, success };
}
