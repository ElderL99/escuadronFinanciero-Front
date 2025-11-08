import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Save } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { Input, Select } from "./FormElements";

export default function UpdateForm({
  id,
  application,
  update,
  updating,
  navigate,
}) {
  const { register, handleSubmit, reset, watch } = useForm();
  const [allowedQuincenas, setAllowedQuincenas] = useState([]);
  const [nivel, setNivel] = useState(1);
  const [maxMonto, setMaxMonto] = useState(3000);

  // 🧠 Obtener nivel del usuario desde el token JWT
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const userLevel = decoded?.level || 1;
        setNivel(userLevel);
      }
    } catch (error) {
      console.warn("No se pudo decodificar el token:", error);
      setNivel(1);
    }
  }, []);

  // 🧩 Limitar quincenas y montos por nivel
  useEffect(() => {
    const QUINCENAS_PERMITIDAS = {
      1: [1, 2, 3, 4],
      2: [2, 3, 4, 5, 6],
      3: [3, 4, 5, 6, 7, 8],
    };
    const LIMITES = { 1: 3000, 2: 8000, 3: 20000 };

    setAllowedQuincenas(QUINCENAS_PERMITIDAS[nivel] || [1, 2, 3, 4]);
    setMaxMonto(LIMITES[nivel] || 3000);
  }, [nivel]);

  console.log("Hola");

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

  const requestedAmount = watch("requestedAmount");

  // ⚠️ Validar monto cada vez que cambie
  useEffect(() => {
    if (!requestedAmount) return;
    const monto = Number(requestedAmount);

    if (monto < 1000) {
      toast.error("El monto mínimo permitido es $1,000.");
    } else if (monto % 500 !== 0) {
      toast.error("El monto debe ser múltiplo de $500.");
    } else if (monto > maxMonto) {
      toast.error(
        `Tu nivel actual (${nivel}) solo permite solicitar hasta $${maxMonto.toLocaleString()}`
      );
    }
  }, [requestedAmount, maxMonto, nivel]);

  const onSubmit = async (data) => {
    const monto = Number(data.requestedAmount);
    const quincenas = Number(data.paymentMode);

    // Validaciones finales antes de enviar
    if (monto < 1000 || monto % 500 !== 0 || monto > maxMonto) {
      toast.error("Verifica que el monto cumpla con las reglas.");
      return;
    }

    if (!allowedQuincenas.includes(quincenas)) {
      toast.error(
        `No se permiten ${quincenas} quincenas para tu nivel actual (${nivel}).`
      );
      return;
    }

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
        <Input
          label="Número de cuenta bancaria"
          name="clienteNumberBank"
          register={register}
        />

        {/* ⚙️ Datos del servicio */}
        <Input label="Unidad" name="unidad" register={register} />
        <Input label="Zona" name="zona" register={register} />
        <Input label="Región" name="region" register={register} />
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
          label={`Monto Solicitado (mínimo $1,000, múltiplos de $500, máximo $${maxMonto.toLocaleString()})`}
          type="number"
          name="requestedAmount"
          register={register}
        />

        {/* ✅ Modalidad según nivel */}
        <Select
          label="Modalidad de Pago (Quincenal)"
          name="paymentMode"
          register={register}
          options={allowedQuincenas.map((num) => ({
            value: num,
            label: `${num} quincenas`,
          }))}
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
