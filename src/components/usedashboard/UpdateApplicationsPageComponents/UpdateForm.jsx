import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Save } from "lucide-react";
import toast from "react-hot-toast";
import { Input, Select } from "./FormElements";

export default function UpdateForm({
  id,
  application,
  update,
  updating,
  navigate,
}) {
  const { register, handleSubmit, reset } = useForm();

  // ✅ Prellenar formulario con formato correcto para fechas
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white/80 backdrop-blur-xl p-6 rounded-xl border border-[#611232]/10 shadow-sm"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 💼 Datos personales */}
        <Input label="Nombre" name="nombre" register={register} />
        <Input label="Grado" name="grado" register={register} />
        <Input label="Empleo" name="empleo" register={register} />
        <Input label="Matrícula" name="matricula" register={register} />
        <Input label="ID Personal" name="idPersonal" register={register} />
        <Input label="Teléfono" name="telefono" register={register} />
        {/* 💳 Nuevo campo */}
        <Input
          label="Número de cuenta bancaria"
          name="clienteNumberBank"
          register={register}
        />

        {/* ⚙️ Datos del servicio */}
        <Input label="Unidad" name="unidad" register={register} />
        <Input label="Zona" name="zona" register={register} />
        <Input label="Región" name="region" register={register} />
        {/* 🏛️ Nuevo campo */}
        <Input
          label="Unidad Ejecutora de Pago"
          name="unidadEjecutoraDePago"
          type="number"
          register={register}
        />

        {/* Fechas */}
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

        {/* 💰 Información del préstamo */}
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

      {/* 🔘 Botón Guardar */}
      <button
        disabled={updating}
        className="flex items-center justify-center gap-2 bg-[#611232] text-white px-6 py-2 rounded-lg hover:bg-[#4a0f27] transition disabled:opacity-60"
      >
        {updating ? (
          <Save className="animate-spin w-4 h-4" />
        ) : (
          <Save size={18} />
        )}
        Guardar Cambios
      </button>
    </form>
  );
}
