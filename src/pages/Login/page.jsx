import { useEffect, useState } from "react";
import clsx from "clsx";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import ResendActivationModal from "../../components/auth/ResendActivationModal";
import bandera from "../../public/bandera.jpg";
import logo from "../../public/logo.jpeg";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 🧠 Mostrar error solo cuando cambie el error
  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 3000,
        style: {
          background: "#1a1a1a",
          color: "#fff",
          border: "1px solid #d4af37",
        },
      });
    }
  }, [error]);

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

  const validatePassword = (value) => setPassword(value);

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-[#F9FAFB]
  bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))]
  from-[#fdf8f3] via-[#f9f7f5] to-[#f4f0eb]
  p-6 bg-no-repeat bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bandera})` }}
    >
      {/* 👉 Capa oscura ligera */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div
        className="relative z-10 w-full max-w-md bg-white/80
    border border-[#e8e2dc]/60 shadow-[0_0_20px_rgba(97,18,50,0.15)]
    rounded-2xl p-8 sm:p-10 transition-shadow hover:shadow-lg"
      >
        <div className="flex flex-col items-center mb-6">
          <Link to="/" className="mb-4 hover:opacity-90 transition">
            <img src={logo} alt="Logo" className="h-16 w-auto rounded-2xl" />
          </Link>

          <h1 className="text-2xl font-bold text-center text-[#611232]">
            Inicia sesión en tu cuenta
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 text-gray-900"
        >
          {/* Email */}
          <InputField
            label="Correo electrónico"
            type="email"
            placeholder="ejemplo@correo.com"
            className="text-gray-900 placeholder:text-gray-500"
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

          {/* Contraseña */}
          <div className="relative">
            <InputField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="text-gray-900 placeholder:text-gray-500"
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

          <p
            onClick={() => !loading && navigate("/recover-password")}
            className={clsx(
              "text-sm text-[#611232] font-medium hover:underline text-right cursor-pointer",
              loading && "cursor-not-allowed opacity-50",
            )}
          >
            ¿Olvidaste tu contraseña?
          </p>

          <p
            onClick={() => !loading && setIsModalOpen(true)}
            className={clsx(
              "text-sm text-gray-600 font-medium hover:text-[#611232] hover:underline text-right cursor-pointer mt-1",
              loading && "cursor-not-allowed opacity-50",
            )}
          >
            ¿No recibiste el correo de activación?
          </p>

          <button
            type="submit"
            disabled={loading}
            className={clsx(
              "w-full py-3 text-white font-semibold rounded-full shadow-md transition-colors",
              loading
                ? "bg-[#611232]/70 cursor-not-allowed"
                : "bg-[#611232] hover:bg-[#7a1b3a]",
            )}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-8">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={() => !loading && navigate("/register")}
            className={clsx(
              "text-[#611232] font-semibold hover:underline underline-offset-2",
              loading && "cursor-not-allowed opacity-50",
            )}
            disabled={loading}
          >
            Regístrate aquí
          </button>
        </p>
      </div>

      <ResendActivationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
