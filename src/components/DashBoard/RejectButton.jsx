import { useState } from "react";
import useApplicationActions from "../../hooks/admin/useApplicationActions";

export default function RejectButton({ applicationId, onRejected }) {
  const { rejectApplication, loading } = useApplicationActions();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReject = async () => {
    try {
      await rejectApplication(applicationId);
      onRejected?.();
      setShowConfirm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-2xl font-semibold shadow-md transition-colors"
      >
        Rechazar
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Confirmar rechazo
            </h2>
            <p className="mb-6 text-gray-700">
              ¿Estás seguro que quieres rechazar esta solicitud?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-xl bg-gray-300 hover:bg-gray-400 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleReject}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium"
              >
                {loading ? "Rechazando..." : "Rechazar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
