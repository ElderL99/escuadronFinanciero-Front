import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useUserApplicationById from "../../hooks/user/useUserApplicationById";
import useUpdateUserApplication from "../../hooks/user/useUpdateApplication";
import useUpdateDocuments from "../../hooks/user/useUpdateDocuments";
import { Loader2, Save, ArrowLeft, FileUp } from "lucide-react";
import toast from "react-hot-toast";

export default function UpdateApplicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔹 Hooks
  const {
    application,
    loading,
    error: fetchError,
  } = useUserApplicationById(id);
  const {
    update,
    loading: updating,
    error: updateError,
  } = useUpdateUserApplication();
  const { updateDocuments, loading: uploading } = useUpdateDocuments();

  const { register, handleSubmit, reset } = useForm();

  // ✅ Prellenar formulario con los datos existentes
  useEffect(() => {
    if (application) {
      const fixedData = {
        ...application,
        fechaAlta: application.fechaAlta?.split("T")[0],
        ultimoAscenso: application.ultimoAscenso?.split("T")[0],
      };
      reset(fixedData);
    }
  }, [application, reset]);

  const onSubmit = async (data) => {
    const res = await update(id, data);
    if (res) {
      toast.success("✅ Solicitud actualizada correctamente");
      navigate(`/user/solicitud/${id}`);
    }
  };

  // 🧩 Mostrar errores del backend
  useEffect(() => {
    if (fetchError) toast.error(fetchError);
  }, [fetchError]);

  useEffect(() => {
    if (updateError) toast.error(updateError);
  }, [updateError]);

  const handleDocumentsUpdate = async (e) => {
    const formData = new FormData();
    const files = e.target.files;
    for (const file of files) {
      formData.append(file.name, file); // nombre exacto (ej: clabe, ine)
    }
    await updateDocuments(id, formData);
  };

  // 🌀 Cargando
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#611232]">
        <Loader2 className="animate-spin w-8 h-8 mb-2" />
        <p>Cargando solicitud...</p>
      </div>
    );

  if (fetchError || !application)
    return (
      <div className="text-center text-gray-500 py-20">
        <p>❌ {fetchError || "No se encontró la solicitud"}</p>
      </div>
    );

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#611232] mb-6 hover:text-[#4a0f27] transition"
      >
        <ArrowLeft size={18} /> Volver
      </button>

      <h1 className="text-2xl font-semibold text-[#611232] mb-6">
        Actualizar Solicitud
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white/80 backdrop-blur-xl p-6 rounded-xl border border-[#611232]/10 shadow-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Nombre" name="nombre" register={register} />
          <Input label="Grado" name="grado" register={register} />
          <Input label="Empleo" name="empleo" register={register} />
          <Input label="Matrícula" name="matricula" register={register} />
          <Input label="ID Personal" name="idPersonal" register={register} />
          <Input label="Teléfono" name="telefono" register={register} />
          <Input label="Unidad" name="unidad" register={register} />
          <Input label="Zona" name="zona" register={register} />
          <Input label="Región" name="region" register={register} />
          <Input
            label="Fecha de Alta"
            type="date"
            name="fechaAlta"
            register={register}
          />
          <Input
            label="Último Ascenso"
            type="date"
            name="ultimoAscenso"
            register={register}
          />
          <Input
            label="Monto Solicitado"
            type="number"
            name="requestedAmount"
            register={register}
          />
          <Select
            label="Modalidad de Pago"
            name="paymentMode"
            register={register}
            options={["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m"]}
          />
        </div>

        <button
          disabled={updating}
          className="flex items-center justify-center gap-2 bg-[#611232] text-white px-6 py-2 rounded-lg hover:bg-[#4a0f27] transition disabled:opacity-60"
        >
          {updating ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <Save size={18} />
          )}
          Guardar Cambios
        </button>
      </form>

      <div className="mt-8 bg-white/80 backdrop-blur-xl p-6 rounded-xl border border-[#611232]/10 shadow-sm">
        <h2 className="text-lg font-semibold text-[#611232] mb-4">
          Actualizar Documentos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "clabe",
            "comprobanteDomicilio",
            "timCim",
            "ine",
            "selfieIne",
            "selfieMilitarId",
          ].map((docKey) => {
            const doc = application.documentos?.[docKey];
            const hasFile = !!doc?.url;

            return (
              <div
                key={docKey}
                className="flex flex-col border border-[#611232]/20 rounded-lg p-3 bg-white/70"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="capitalize text-sm text-[#611232] font-medium">
                    {docKey}
                  </span>
                </div>

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
    </section>
  );
}

/* 🔹 Subcomponentes */
function Input({ label, name, register, type = "text" }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs text-gray-600 mb-1">{label}</label>
      <input
        {...register(name)}
        type={type}
        className="border border-[#611232]/20 rounded-lg px-3 py-2 text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#611232]/40 placeholder-gray-400"
      />
    </div>
  );
}

function Select({ label, name, register, options }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs text-gray-600 mb-1">{label}</label>
      <select
        {...register(name)}
        className="border border-[#611232]/20 rounded-lg px-3 py-2 text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#611232]/40"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
