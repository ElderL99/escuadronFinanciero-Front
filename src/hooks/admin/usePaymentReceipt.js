import { useEffect, useState } from "react";
import { getPaymentReceipt } from "../../api/admin";

export default function usePaymentReceipt(creditId, paymentNumber) {
  const [receiptUrl, setReceiptUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!creditId || !paymentNumber) return;

    const fetchReceipt = async () => {
      try {
        setLoading(true);
        const res = await getPaymentReceipt(creditId, paymentNumber);
        setReceiptUrl(res.data.data.signUrl);
      } catch (err) {
        setError(err.response?.data?.message || "Error al obtener comprobante");
      } finally {
        setLoading(false);
      }
    };

    fetchReceipt();
  }, [creditId, paymentNumber]);

  return { receiptUrl, loading, error };
}
