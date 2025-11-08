import { memo, useMemo } from "react";
import { FileImage } from "lucide-react";

function ReviewDocuments({ documentos = {} }) {
  // 🧠 Evita recalcular si no cambian los documentos
  const documentosArray = useMemo(
    () => Object.entries(documentos || {}),
    [documentos]
  );

  if (!documentosArray.length) {
    return (
      <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
        <p className="text-gray-400 text-sm">No hay documentos disponibles</p>
      </div>
    );
  }

  return (
    <section className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-md p-5 mt-4 transition-all duration-300">
      <header className="mb-6">
        <h3 className="text-2xl font-bold text-[#611232] border-b border-gray-200 pb-2">
          Documentos
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          Haz clic en cada documento para abrirlo en una nueva pestaña
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {documentosArray.map(([nombre, url]) => (
          <button
            key={nombre}
            onClick={() => window.open(url, "_blank")}
            className="flex items-center justify-between w-full px-5 py-3 rounded-xl font-medium 
                       border border-[#611232] bg-linear-to-r from-[#611232]/90 to-[#831d47] 
                       hover:scale-[1.02] hover:shadow-md active:scale-[0.99]
                       text-white transition-all duration-200 ease-out"
          >
            <span className="truncate text-left">
              {nombre
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </span>
            <FileImage size={22} className="text-white opacity-90" />
          </button>
        ))}
      </div>
    </section>
  );
}

export default memo(ReviewDocuments);
