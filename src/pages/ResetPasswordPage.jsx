import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import api from "../api/axios";

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const [validating, setValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // 👁️ para el segundo campo

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // 🧠 Validar token apenas se monta
  useEffect(() => {
    const validate = async () => {
      try {
        const res = await api.get(`/auth/validate-reset-token?token=${token}`);
        if (res.data.success) setIsValid(true);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "El enlace es inválido o ha expirado.",
          {
            style: {
              background: "#611232",
              color: "#fff",
              border: "1px solid #d4af37",
            },
          }
        );
      } finally {
        setValidating(false);
      }
    };
    validate();
  }, [token]);

  const onSubmit = async (data) => {
    try {
      const { newPassword, confirmPassword } = data;
      if (newPassword !== confirmPassword) {
        toast.error("Las contraseñas no coinciden.", {
          style: {
            background: "#611232",
            color: "#fff",
            border: "1px solid #d4af37",
          },
        });
        return;
      }

      const res = await api.post("/auth/reset-password", {
        token,
        newPassword,
      });
      toast.success(
        res.data.message || "Contraseña actualizada correctamente ✅",
        {
          style: {
            background: "#1a1a1a",
            color: "#fff",
            border: "1px solid #d4af37",
          },
        }
      );

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Error al restablecer contraseña",
        {
          style: {
            background: "#611232",
            color: "#fff",
            border: "1px solid #d4af37",
          },
        }
      );
    }
  };

  if (validating) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#f8f4f6]">
        <p className="text-[#611232] font-semibold animate-pulse">
          Validando enlace de recuperación...
        </p>
      </section>
    );
  }

  if (!isValid) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#f8f4f6]">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#611232]/20 text-center">
          <h1 className="text-xl font-semibold text-[#611232] mb-4">
            Enlace inválido o expirado
          </h1>
          <p className="text-gray-600 mb-4">
            Solicita un nuevo correo de recuperación.
          </p>
          <button
            onClick={() => navigate("/recover-password")}
            className="text-[#611232] font-medium hover:underline"
          >
            Volver a recuperar contraseña
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f8f4f6] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-[#611232]/20">
        <h1 className="text-2xl font-semibold text-center mb-6 text-[#611232]">
          Restablecer contraseña
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 text-[#1a1a1a]"
        >
          {/* Nueva contraseña */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-[#1a1a1a]">
              Nueva contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              {...register("newPassword", {
                required: "La nueva contraseña es obligatoria",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).+$/,
                  message: "Debe incluir mayúscula, número y símbolo",
                },
              })}
              className={clsx(
                "w-full border rounded-lg px-3 py-2 focus:outline-none text-[#1a1a1a]",
                errors.newPassword
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-[#d4af37]"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-[#611232]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.newPassword && (
              <p className="text-xs text-red-600 mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-[#1a1a1a]">
              Confirmar contraseña
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="********"
              {...register("confirmPassword", {
                required: "Confirma tu contraseña",
                validate: (value) =>
                  value === watch("newPassword") ||
                  "Las contraseñas no coinciden",
              })}
              className={clsx(
                "w-full border rounded-lg px-3 py-2 focus:outline-none text-[#1a1a1a]",
                errors.confirmPassword
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "border-gray-300 focus:ring-2 focus:ring-[#d4af37]"
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-[#611232]"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirmPassword && (
              <p className="text-xs text-red-600 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Botón */}
          <button
            type="submit"
            className={clsx(
              "w-full py-2 text-white font-semibold rounded-lg transition-colors mt-2",
              "bg-[#611232] hover:bg-[#7b1842]"
            )}
          >
            Cambiar contraseña
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          <button
            onClick={() => navigate("/login")}
            className="text-[#611232] font-medium hover:underline"
          >
            Volver al inicio de sesión
          </button>
        </p>
      </div>
    </section>
  );
}
