import { motion } from "framer-motion";
import { FileImage } from "lucide-react";

export default function DocumentosFirmados({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <p className="text-gray-400 text-sm">No hay documentos disponibles.</p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-lg space-y-6 border-l-8 border-[#611232]"
    >
      <h2 className="text-2xl font-semibold mb-3 text-[#611232]">Documentos</h2>

      <div className="flex flex-col gap-4">
        {Object.entries(data).map(([key, url]) => (
          <button
            key={key}
            onClick={() => window.open(url, "_blank")}
            className="flex items-center justify-between w-full px-6 py-3 rounded-2xl font-medium shadow-md bg-[#611232]/90 hover:bg-[#831d47] text-white transition-all"
          >
            <span>
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </span>
            <FileImage size={20} className="text-white" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
