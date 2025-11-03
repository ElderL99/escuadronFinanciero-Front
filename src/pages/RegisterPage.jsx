import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "../context/AuthContext";
import InputField from "../components/InputField";
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
        "Registro completado ✅. Revisa tu correo para validar tu cuenta.",
        {
          duration: 3500,
          style: {
            background: "#1a1a1a",
            color: "#fff",
            border: "1px solid #d4af37",
          },
        }
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
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
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md text-black/70">
        <h1
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "#611232" }}
        >
          Crear cuenta
        </h1>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  message: "Correo inválido",
                },
              })
            }
            errors={errors}
          />

          {/* Contraseña con icono 👁️ */}
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
          <div className="mt-2 text-sm space-y-1">
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

          <button
            type="submit"
            disabled={loading}
            className={clsx(
              "w-full text-white py-2 rounded-md transition font-medium",
              loading ? "bg-[#611232]/70" : "bg-[#611232] hover:bg-[#7b1643]"
            )}
          >
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        {/* Redirección al login */}
        <p className="text-center text-sm mt-4">
          <button
            onClick={() => !loading && navigate("/login")}
            className={clsx(
              "text-[#611232] font-medium hover:underline",
              loading && "cursor-not-allowed opacity-50"
            )}
            disabled={loading}
          >
            ¿Ya tienes una cuenta?
          </button>
        </p>
      </div>
    </section>
  );
}
