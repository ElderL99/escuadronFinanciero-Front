import { AlertTriangle } from "lucide-react";

export default function ApplicationEmptyState({ error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
      <AlertTriangle className="w-8 h-8 mb-2 text-[#611232]" />
      <p>{error || "Aún no tienes solicitudes registradas."}</p>
    </div>
  );
}
