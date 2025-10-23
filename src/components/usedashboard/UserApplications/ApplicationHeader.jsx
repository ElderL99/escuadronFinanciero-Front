import { FileText } from "lucide-react";

export default function ApplicationHeader({ app }) {
  return (
    <header className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-[#611232]/15 rounded-full text-[#611232]">
        <FileText size={18} />
      </div>
      <h2 className="font-semibold text-[#611232]/90 text-sm">
        Solicitud #{app._id.slice(-6).toUpperCase()}
      </h2>
    </header>
  );
}
