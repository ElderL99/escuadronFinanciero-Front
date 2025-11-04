import clsx from "clsx";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [Validations, setValidations] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const user = await login(data.email, data.password);

    if (user) {
      toast.success(`Bienvenido ${user.name || "de nuevo"} 👋`, {
        duration: 2500,
        style: {
          background: "#1a1a1a",
          color: "#fff",
          border: "1px solid #d4af37",
        },
      });

      setTimeout(() => {
        if (user.role === "admin") navigate("/admin/dashboard");
        else navigate("/user/dashboard");
      }, 800);
    }
  };

  const validatePassword = (value) => {
    setPassword(value);
    setValidations({
      length: value.length >= 6,
      uppercase: /[A-Z]/.test(value),
      number: /\d/.test(value),
      symbol: /[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]/.test(value),
    });
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-[#F9FAFB] 
      bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] 
      from-[#fdf8f3] via-[#f9f7f5] to-[#f4f0eb] p-6"
    >
      <div
        className="w-full max-w-md bg-white/80 backdrop-blur-md border border-[#e8e2dc]/60 
        shadow-[0_0_20px_rgba(97,18,50,0.15)] rounded-2xl p-8 sm:p-10 transition-all hover:shadow-lg"
      >
        {/* Título */}
        <h1 className="text-2xl font-bold text-center text-[#611232] mb-10">
          Inicia sesión en tu cuenta
        </h1>

        {/* Mensaje de error */}
        {error &&
          toast.error(error, {
            duration: 3000,
            style: {
              background: "#1a1a1a",
              color: "#fff",
              border: "1px solid #d4af37",
            },
          })}

        {/* Formulario */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 text-black/80"
        >
          {/* Email */}
          <InputField
            label="Correo electrónico"
            type="email"
            placeholder="ejemplo@correo.com"
            register={(name) =>
              register(name, {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                  message: "Correo inválido. Ejemplo: usuario@correo.com",
                },
              })
            }
            name="email"
            errors={errors}
          />

          {/* Contraseña con icono 👁️ */}
          <div className="relative">
            <InputField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              name="password"
              register={(name) =>
                register(name, {
                  required: "La contraseña es obligatoria",
                  onChange: (e) => validatePassword(e.target.value),
                })
              }
              errors={errors}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-[#611232]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Recuperación */}
          <p
            onClick={() => !loading && navigate("/recover-password")}
            className={clsx(
              "text-sm text-[#611232] hover:underline text-right cursor-pointer",
              loading && "cursor-not-allowed opacity-50"
            )}
          >
            ¿Olvidaste tu contraseña?
          </p>

          {/* Botón Ingresar */}
          <button
            type="submit"
            disabled={loading}
            className={clsx(
              "w-full py-3 text-white font-semibold rounded-full shadow-md transition-all",
              loading
                ? "bg-[#611232]/70 cursor-not-allowed"
                : "bg-[#611232] hover:bg-[#7a1b3a]"
            )}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* Registro */}
        <p className="text-center text-sm text-gray-600 mt-8">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={() => !loading && navigate("/register")}
            className={clsx(
              "text-[#611232] font-semibold hover:underline",
              loading && "cursor-not-allowed opacity-50"
            )}
            disabled={loading}
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </section>
  );
}
