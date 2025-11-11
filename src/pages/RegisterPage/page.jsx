import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "../../context/AuthContext";
import InputField from "../../components/InputField";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser, loading, error } = useAuth();
  const [password, setPassword] = useState("");
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    symbol: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const ok = await registerUser(data);
    if (ok) {
      toast.success(
        "✅ Registro completado. Revisa tu correo para validar tu cuenta.",
        {
          duration: 3500,
          style: {
            background: "#1a1a1a",
            color: "#fff",
            border: "1px solid #d4af37",
          },
        }
      );

      setTimeout(() => navigate("/login"), 1500);
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
      className="min-h-screen flex items-center justify-center px-6 
      bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] 
      from-[#fdf8f3] via-[#f9f7f5] to-[#f4f0eb]"
    >
      <div
        className="w-full max-w-md bg-white/80 backdrop-blur-md 
        border border-[#e8e2dc]/60 rounded-2xl shadow-[0_0_25px_rgba(97,18,50,0.15)] 
        p-8 sm:p-10 transition-all hover:shadow-lg text-black/80"
      >
        {/* Encabezado */}
        <h1 className="text-3xl font-bold text-center text-[#611232] mb-2">
          Crear cuenta
        </h1>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Regístrate para solicitar créditos de manera segura
        </p>

        {/* Mensaje de error */}
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-100/70 border border-red-200 py-2 rounded-lg">
            {error}
          </p>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <InputField
            label="Nombre"
            name="name"
            register={(name) =>
              register(name, { required: "El nombre es obligatorio" })
            }
            errors={errors}
          />

          <InputField
            label="Apellido"
            name="lastName"
            register={(name) =>
              register(name, { required: "El apellido es obligatorio" })
            }
            errors={errors}
          />

          <InputField
            label="Correo electrónico"
            type="email"
            name="email"
            register={(name) =>
              register(name, {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                  message: "Correo inválido. Ejemplo: usuario@correo.com",
                },
              })
            }
            errors={errors}
          />

          {/* Contraseña */}
          <div className="relative">
            <InputField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              name="password"
              register={(name) =>
                register(name, {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).+$/,
                    message: "Debe incluir mayúscula, número y símbolo",
                  },
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

          {/* Validaciones visuales */}
          <div className="mt-3 text-sm space-y-1">
            <p
              className={clsx(
                "flex items-center gap-2",
                validations.length ? "text-green-600" : "text-gray-500"
              )}
            >
              {validations.length ? "✅" : "⚪"} Al menos 6 caracteres
            </p>
            <p
              className={clsx(
                "flex items-center gap-2",
                validations.uppercase ? "text-green-600" : "text-gray-500"
              )}
            >
              {validations.uppercase ? "✅" : "⚪"} Una letra mayúscula
            </p>
            <p
              className={clsx(
                "flex items-center gap-2",
                validations.number ? "text-green-600" : "text-gray-500"
              )}
            >
              {validations.number ? "✅" : "⚪"} Un número
            </p>
            <p
              className={clsx(
                "flex items-center gap-2",
                validations.symbol ? "text-green-600" : "text-gray-500"
              )}
            >
              {validations.symbol ? "✅" : "⚪"} Un símbolo
            </p>
          </div>

          {/* Botón principal */}
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
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        {/* Redirección al login */}
        <p className="text-center text-sm text-gray-600 mt-8">
          ¿Ya tienes una cuenta?{" "}
          <button
            onClick={() => !loading && navigate("/login")}
            className={clsx(
              "text-[#611232] font-semibold hover:underline",
              loading && "cursor-not-allowed opacity-50"
            )}
            disabled={loading}
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </section>
  );
}
