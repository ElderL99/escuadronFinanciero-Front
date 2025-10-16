import { useState } from "react";

export default function ApproveButton({ applicationId, onApproved, admin }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    try {
      await admin.approveApplication(applicationId);
      onApproved();
      setShowConfirm(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-2xl font-semibold shadow-md transition-colors"
      >
        Aprobar
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#611232]/50 via-[#3e0d21] to-[#1b0510]/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#611232]">
              Confirmar aprobación
            </h2>
            <p className="mb-6 text-gray-700">
              ¿Estás seguro que quieres aprobar esta solicitud?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleApprove}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium"
              >
                {loading ? "Aprobando..." : "Aprobar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
