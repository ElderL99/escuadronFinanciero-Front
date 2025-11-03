import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import InputField from "../components/InputField";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function PasswordLostPage() {
  const { recoverPassword, loading, error } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await recoverPassword({ email: data.email });
    if (result) {
      toast.success("✅ Se envió un correo para restablecer tu contraseña.", {
        duration: 3000,
        style: {
          background: "#1a1a1a",
          color: "#fff",
          border: "1px solid #d4af37",
        },
      });

      setTimeout(() => navigate("/login"), 2000);
    } else {
      toast.error("❌ No se pudo enviar el correo. Intenta de nuevo.", {
        duration: 3000,
        style: {
          background: "#611232",
          color: "#fff",
          border: "1px solid #d4af37",
        },
      });
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

        {/* Error directo (por si el backend devuelve algo genérico) */}
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-100 py-2 rounded-lg">
            {error}
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
