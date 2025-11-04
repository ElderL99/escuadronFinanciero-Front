export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "¿Estás seguro?",
  message = "Confirma esta acción antes de continuar.",
  confirmText = "Confirmar",
  confirmColor = "bg-[#611232] hover:bg-[#4a0f27]",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-xl rounded-xl p-6 max-w-md w-[90%] shadow-2xl border border-[#611232]/20 text-center">
        <h2 className="text-lg font-semibold text-[#611232] mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white font-medium transition ${confirmColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
