import { useState } from "react";
import { createPaymentSession } from "../../api/user";
import toast from "react-hot-toast";

export default function useStripePayment() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (creditId, paymentNumber) => {
    try {
      setLoading(true);
      const res = await createPaymentSession(creditId, paymentNumber);

      if (res.data && res.data.url) {
        // Redirigir a Stripe
        window.location.href = res.data.url;
      } else {
        toast.error("Error al iniciar el pago: No se recibió URL de Stripe");
      }
    } catch (error) {
      console.error("Error Stripe:", error);
      toast.error(
        error.response?.data?.message || "Error al conectar con Stripe"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    handlePayment,
    loading,
  };
}
