import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Loader2, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { resendActivationEmail } from "../../api/auth";
import InputField from "../InputField";

export default function ResendActivationModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await resendActivationEmail({ email: data.email });
      toast.success("✅ Correo enviado. Revisa tu bandeja de entrada.");
      reset();
      onClose();
    } catch (error) {
      const msg = error.response?.data?.message || "Error al reenviar correo.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="bg-[#611232]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="text-[#611232]" size={24} />
          </div>
          <h2 className="text-xl font-bold text-[#611232]">
            Reenviar correo de activación
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Ingresa tu correo electrónico y te enviaremos un nuevo enlace para
            activar tu cuenta.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Correo electrónico"
            type="email"
            placeholder="ejemplo@correo.com"
            register={(name) =>
              register(name, {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                  message: "Correo inválido",
                },
              })
            }
            name="email"
            errors={errors}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
              loading
                ? "bg-[#611232]/70 cursor-not-allowed"
                : "bg-[#611232] hover:bg-[#7a1b3a]"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Enviando...
              </>
            ) : (
              "Enviar enlace"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
