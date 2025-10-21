import { useEffect, useState } from "react";
import { getAllPaymentsByCreditId } from "../../api/admin";

export default function useFetchPayments(creditId) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!creditId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllPaymentsByCreditId(creditId);
        setPayments(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Error al cargar los pagos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [creditId]);

  return { payments, loading, error, setPayments };
}
