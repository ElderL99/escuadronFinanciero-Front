import { FileUp } from "lucide-react";
import toast from "react-hot-toast";

export default function DocumentsUpdater({
  id,
  application,
  updateDocuments,
  uploading,
}) {
  const documentKeys = [
    "clabe",
    "comprobanteDomicilio",
    "timCim",
    "ine",
    "selfieIne",
    "selfieMilitarId",
  ];

  return (
    <div className="mt-8 bg-white/80 backdrop-blur-xl p-6 rounded-xl border border-[#611232]/10 shadow-sm">
      <h2 className="text-lg font-semibold text-[#611232] mb-4">
        Actualizar Documentos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {documentKeys.map((docKey) => {
          const doc = application.documentos?.[docKey];
          const hasFile = !!doc?.url;

          return (
            <div
              key={docKey}
              className="flex flex-col border border-[#611232]/20 rounded-lg p-3 bg-white/70"
            >
              <span className="capitalize text-sm text-[#611232] font-medium mb-2">
                {docKey}
              </span>

              <label
                htmlFor={docKey}
                className="flex items-center justify-center gap-2 text-xs text-white bg-[#611232] hover:bg-[#4a0f27] transition rounded-md px-3 py-2 cursor-pointer"
              >
                <FileUp size={14} />
                Subir nuevo archivo
                <input
                  id={docKey}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const formData = new FormData();
                    formData.append(docKey, file);
                    await updateDocuments(id, formData);
                    toast.success(`✅ ${docKey} actualizado correctamente`);
                  }}
                />
              </label>
            </div>
          );
        })}
      </div>

      {uploading && (
        <p className="text-sm text-[#611232] mt-3 animate-pulse">
          Subiendo documentos...
        </p>
      )}
    </div>
  );
}
