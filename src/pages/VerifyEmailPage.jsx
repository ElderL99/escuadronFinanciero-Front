import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState("loading");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      toast.error("Token inválido o ausente");
      return;
    }

    const verify = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/auth/verify-email?token=${token}`
        );

        if (res.status === 200) {
          setStatus("success");
          toast.success("Correo verificado correctamente 🎉");
          setTimeout(() => navigate("/login"), 2500);
        } else {
          setStatus("error");
          toast.error("El enlace de verificación no es válido.");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
        toast.error(
          err.response?.data?.message ||
            "Error al verificar el correo electrónico."
        );
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      {status === "loading" && (
        <>
          <Loader2 className="animate-spin text-[#611232] w-10 h-10 mb-3" />
          <p className="text-gray-600">Verificando tu correo...</p>
        </>
      )}
      {status === "success" && (
        <>
          <CheckCircle className="text-green-600 w-12 h-12 mb-3" />
          <h2 className="text-xl font-semibold text-[#611232]">
            ¡Correo verificado con éxito!
          </h2>
          <p className="text-gray-600 mt-2">Serás redirigido al login...</p>
        </>
      )}
      {status === "error" && (
        <>
          <XCircle className="text-red-600 w-12 h-12 mb-3" />
          <h2 className="text-xl font-semibold text-red-700">
            Enlace inválido o expirado
          </h2>
          <p className="text-gray-600 mt-2">
            Solicita un nuevo correo de verificación.
          </p>
        </>
      )}
    </section>
  );
}
