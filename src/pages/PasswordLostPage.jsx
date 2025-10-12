import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import InputField from "../components/InputField";
import useAuth from "../hooks/useAuth";

export default function PasswordLostPage() {
  const { recoverPassword, loading, error } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await recoverPassword({ email: data.email });
    if (result) {
      setSuccess("✅ Se envió un correo para restablecer tu contraseña.");
      setTimeout(() => navigate("/login"), 3000); // redirige después de 3s
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f8f4f6] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-[#611232]/20">
        <h1
          className="text-2xl font-semibold text-center mb-6"
          style={{ color: "#611232" }}
        >
          Recuperar contraseña
        </h1>

        {/* Mensajes */}
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-100 py-2 rounded-lg">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 text-center mb-4 bg-green-100 py-2 rounded-lg">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputField
            label="Correo electrónico"
            type="email"
            placeholder="ejemplo@correo.com"
            name="email"
            register={(name) =>
              register(name, {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                  message: "Correo inválido",
                },
              })
            }
            errors={errors}
          />

          <button
            type="submit"
            disabled={loading}
            className={clsx(
              "w-full py-2 text-white font-semibold rounded-lg transition-colors",
              loading
                ? "bg-[#611232]/70 cursor-not-allowed"
                : "bg-[#611232] hover:bg-[#7b1842]"
            )}
          >
            {loading ? "Enviando..." : "Enviar correo"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          <button
            onClick={() => navigate("/login")}
            className={clsx(
              "text-[#611232] font-medium hover:underline",
              loading && "cursor-not-allowed opacity-50"
            )}
            disabled={loading}
          >
            Volver al inicio de sesión
          </button>
        </p>
      </div>
    </section>
  );
}
