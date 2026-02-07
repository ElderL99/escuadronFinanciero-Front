import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import clsx from "clsx";
import InputField from "../../components/InputField";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import logo from "../../public/logo.jpeg";
import bandera from "../../public/bandera.jpg";

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
    <section
      className="min-h-screen flex items-center justify-center px-6 
      bg-no-repeat bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bandera})` }}
    >
      {/* Overlay + blur */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/40" />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-md 
        border border-[#e8e2dc]/60 rounded-2xl 
        shadow-[0_0_25px_rgba(97,18,50,0.15)] 
        p-8 sm:p-10 transition-all hover:shadow-lg"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Link to="/" aria-label="Ir al inicio">
            <img
              src={logo}
              alt="Logo"
              className="h-16 object-contain rounded-2xl hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* Encabezado */}
        <h1 className="text-3xl font-bold text-center text-[#611232] mb-2">
          Recuperar contraseña
        </h1>
        <p className="text-center text-gray-600 mb-8 text-sm">
          Ingresa tu correo electrónico y te enviaremos un enlace de
          recuperación
        </p>

        {/* Error backend */}
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-100/70 border border-red-200 py-2 rounded-lg">
            {error}
          </p>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  message: "Correo inválido. Ejemplo: usuario@correo.com",
                },
              })
            }
            errors={errors}
          />

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className={clsx(
              "w-full py-3 text-white font-semibold rounded-full shadow-md transition-all",
              loading
                ? "bg-[#611232]/70 cursor-not-allowed"
                : "bg-[#611232] hover:bg-[#7a1b3a]",
            )}
          >
            {loading ? "Enviando..." : "Enviar correo"}
          </button>
        </form>

        {/* Volver */}
        <p className="text-center text-sm text-gray-600 mt-8">
          ¿Recordaste tu contraseña?{" "}
          <button
            onClick={() => navigate("/login")}
            className={clsx(
              "text-[#611232] font-semibold hover:underline",
              loading && "cursor-not-allowed opacity-50",
            )}
            disabled={loading}
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </section>
  );
}
