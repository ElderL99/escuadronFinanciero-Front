import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios"; // ✅ Usamos tu instancia configurada

export default function VerifyEmailPage() {
  const [status, setStatus] = useState("loading");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      toast.error("Token inválido o ausente", {
        style: {
          background: "#611232",
          color: "#fff",
          border: "1px solid #d4af37",
        },
      });
      return;
    }

    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify-email?token=${token}`);

        if (res.data.success) {
          setStatus("success");
          toast.success("Correo verificado correctamente 🎉", {
            style: {
              background: "#1a1a1a",
              color: "#fff",
              border: "1px solid #d4af37",
            },
          });

          // Redirigir tras un breve delay
          setTimeout(() => navigate("/login"), 2500);
        } else {
          setStatus("error");
          toast.error("El enlace de verificación no es válido.", {
            style: {
              background: "#611232",
              color: "#fff",
              border: "1px solid #d4af37",
            },
          });
        }
      } catch (err) {
        console.error("Error al verificar el correo:", err);
        setStatus("error");
        toast.error(
          err.response?.data?.message ||
            "Error al verificar el correo electrónico.",
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

    verify();
  }, [searchParams, navigate]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#f9f7f5] text-center px-4">
      {status === "loading" && (
        <>
          <Loader2 className="animate-spin text-[#611232] w-10 h-10 mb-3" />
          <p className="text-gray-600 font-medium">Verificando tu correo...</p>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle className="text-green-600 w-12 h-12 mb-3" />
          <h2 className="text-xl font-semibold text-[#611232]">
            ¡Correo verificado con éxito!
          </h2>
          <p className="text-gray-600 mt-2">
            Serás redirigido al inicio de sesión...
          </p>
        </>
      )}

      {status === "error" && (
        <>
          <XCircle className="text-red-600 w-12 h-12 mb-3" />
          <h2 className="text-xl font-semibold text-red-700">
            Enlace inválido o expirado
          </h2>
          <p className="text-gray-600 mt-2 mb-4">
            Solicita un nuevo correo de verificación.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 rounded-full bg-[#d4af37] text-[#611232] font-semibold hover:bg-[#e2c866] transition"
          >
            Volver al registro
          </button>
        </>
      )}
    </section>
  );
}
