import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import axios from "../../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "../../usedashboard/ConfirmModal";

export default function SignaturePad() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sigCanvas = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const handleConfirm = () => {
    if (sigCanvas.current.isEmpty()) {
      toast.error("✍️ Por favor firma antes de continuar.");
      return;
    }
    setShowConfirm(true);
  };

  const handleSend = async () => {
    setShowConfirm(false);
    setIsSubmitting(true);
    setError(null);

    try {
      const firmaImage = sigCanvas.current.toDataURL("image/png");
      await axios.patch(`/user/solicitud/${id}/firma-digital`, { firmaImage });

      toast.success(
        "✅ Firma enviada correctamente. Tu contrato se regenerará con la firma."
      );
      navigate("/user/dashboard");
    } catch (err) {
      console.error("❌ Error al enviar la firma:", err);
      const backendMessage =
        err.response?.data?.message ||
        "❌ Error al enviar la firma. Intenta nuevamente.";
      setError(backendMessage);
      toast.error(backendMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#f3efea] flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center animate-[fadeIn_0.4s_ease-out_forwards]">
        <h2 className="text-xl font-bold text-[#611232] mb-2">
          ✍️ Firma Digital del Contrato
        </h2>
        <p className="text-gray-600 mb-4">
          Por favor firma en el recuadro para validar tu contrato.
        </p>

        {/* 🖋️ Área de firma */}
        <div className="border-2 border-dashed border-[#611232] rounded-xl overflow-hidden bg-gray-50 mb-4">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="#000000"
            canvasProps={{
              width: 320,
              height: 200,
              className: "bg-white",
            }}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm font-medium mb-3">{error}</p>
        )}

        {/* 🔹 Botones de acción */}
        <div className="flex gap-3 justify-center">
          <Button
            onClick={clearSignature}
            disabled={isSubmitting}
            className={`bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded-lg transition-all ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Limpiar
          </Button>

          <Button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className={`bg-[#611232] hover:bg-[#4a0f27] text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? "Enviando..." : "Enviar Firma"}
          </Button>
        </div>
      </div>

      {/* 🔹 Modal de confirmación */}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleSend}
        title="¿Deseas enviar tu firma?"
        message="Una vez enviada, se guardará tu firma digital en el contrato y no podrás modificarla."
        confirmText="Enviar Firma"
        confirmColor="bg-[#611232] hover:bg-[#4a0f27]"
      />
    </section>
  );
}
