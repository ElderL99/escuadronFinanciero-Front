import clsx from "clsx";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // 👁️ iconos

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [Validations, setValidations] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 estado para ver/ocultar

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const user = await login(data.email, data.password);

    if (user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
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
    <section className="min-h-screen p-4 flex items-center justify-center bg-[#f8f4f6]">
      <div className="w-full  max-w-md bg-white shadow-xl rounded-2xl p-8 border border-[#611232]/20">
        <h1 className="text-2xl font-semibold text-center text-[#611232] mb-6">
          Iniciar sesión
        </h1>

        {/* Mensaje de error */}
        {error && (
          <p className="text-red-600 text-center mb-4 bg-red-100 py-2 rounded-lg">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 text-black/80"
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

          {/* Password con icono */}
          <div className="relative">
            <InputField
              label="Contraseña"
              type={showPassword ? "text" : "password"} //  alterna el  tipo
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

            {/* Botón del ojo 👁️ */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-[#611232]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Enlace de recuperación */}
          <p
            onClick={() => !loading && navigate("/recover-password")}
            className={clsx(
              "text-sm text-[#611232] hover:underline text-right cursor-pointer",
              loading && "cursor-not-allowed opacity-50"
            )}
          >
            ¿Olvidaste tu contraseña?
          </p>

          {/* Botón */}
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
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* Registro */}
        <p className="text-center text-sm text-gray-600 mt-5">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={() => !loading && navigate("/register")}
            className={clsx(
              "text-[#611232] font-medium hover:underline",
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
