import { useState, useCallback } from "react";
import { sendContactForm } from "../api/contact";
import toast from "react-hot-toast";

export default function useSendContact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const sendContact = useCallback(async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const res = await sendContactForm(formData);

      toast.success(
        res.data?.message || "✅ Tu mensaje ha sido enviado correctamente."
      );
      setSuccess(true);
      return res.data;
    } catch (err) {
      console.error("Error al enviar contacto:", err);
      const msg =
        err.response?.data?.message ||
        "❌ No se pudo enviar el mensaje. Inténtalo más tarde.";
      setError(msg);
      toast.error(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendContact, loading, error, success };
}
