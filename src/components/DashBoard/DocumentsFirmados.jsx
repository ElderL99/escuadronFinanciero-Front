import { motion } from "framer-motion";
import { FileImage } from "lucide-react";

export default function DocumentosFirmados({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
        <p className="text-gray-400 text-sm">No hay documentos disponibles.</p>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-lg p-6"
    >
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-[#611232] border-b border-gray-200 pb-2">
          Documentos Firmados
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Archivos cargados y firmados por el solicitante
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {Object.entries(data).map(([key, url], i) => (
          <motion.button
            key={key}
            onClick={() => window.open(url, "_blank")}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between w-full px-5 py-3 rounded-xl font-medium shadow-sm border border-gray-200 bg-gradient-to-r from-[#611232]/90 to-[#831d47] hover:from-[#831d47] hover:to-[#611232] text-white transition-all"
          >
            <span className="truncate text-left">
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </span>
            <FileImage size={22} className="text-white opacity-90" />
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}
