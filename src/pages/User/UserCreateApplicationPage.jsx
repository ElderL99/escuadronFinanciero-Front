import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import useUserCreateApplication from "../../hooks/user/useUserCreateApplication.js";

import {
  StepContainer,
  InputField,
  SelectField,
  FileInputField,
} from "../../components/usedashboard/createApplicationComponents/index.jsx";

export default function UserCreateApplicationPage() {
  const navigate = useNavigate();
  const { createApplication, loading } = useUserCreateApplication();

  const [step, setStep] = useState(1);
  const [documentos, setDocumentos] = useState({});
  const [calculo, setCalculo] = useState(null);
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  // 🧠 Obtener nivel real desde el token JWT
  let nivel = 1;
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp && decoded.exp < now) {
        toast.error("Tu sesión ha expirado. Inicia sesión nuevamente.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        nivel = decoded.level || 1;
      }
    }
  } catch {
    nivel = 1;
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      datosPersonales: {
        folioINE: "",
        idPersonal: "",
        matricula: "",
        empleo: "",
        grado: "",
        clienteNumberBank: "",
        nombre: "",
        unidad: "",
        zona: "",
        region: "",
        telefono: "",
      },
      datosServicio: {
        fechaAlta: "",
        ultimoAscenso: "",
        prestamoBanjercito: "",
        pensionAlimenticia: "",
        unidadEjecutoraDePago: "",
      },
      requestedAmount: "",
      paymentMode: "",
    },
  });

  const requestedAmount = watch("requestedAmount");
  const paymentMode = watch("paymentMode");

  // === 🧮 Lógica dinámica de interés, validaciones y límites ===
  const LEVEL_LIMITS = { 1: 3000, 2: 8000, 3: 20000 };

  useEffect(() => {
    if (!requestedAmount || !paymentMode) {
      setCalculo(null);
      return;
    }

    const amount = Number(requestedAmount);
    const quincenas = Number(paymentMode);

    // ✅ Reglas básicas
    if (amount < 1000) {
      toast.error("El monto mínimo permitido es $1,000.");
      setCalculo(null);
      return;
    }

    if (amount % 500 !== 0) {
      toast.error("El monto debe ser múltiplo de $500.");
      setCalculo(null);
      return;
    }

    // ✅ Límite por NIVEL del usuario (del token)
    const maxByUser = LEVEL_LIMITS[nivel] || 0;
    if (amount > maxByUser) {
      toast.error(
        `Tu nivel actual (${nivel}) permite solicitar hasta $${maxByUser.toLocaleString()}.`
      );
      setCalculo(null);
      return;
    }

    // Determinar banda POR MONTO para quincenas/tasa
    let nivelPorMonto;
    if (amount <= 3000) nivelPorMonto = 1;
    else if (amount <= 8000) nivelPorMonto = 2;
    else if (amount <= 20000) nivelPorMonto = 3;
    else {
      toast.error("El monto máximo permitido es $20,000.");
      setCalculo(null);
      return;
    }

    // Quincenas acumulativas por banda de MONTO
    const QUINCENAS_PERMITIDAS = {
      1: [1, 2, 3, 4],
      2: [1, 2, 3, 4, 5, 6],
      3: [1, 2, 3, 4, 5, 6, 7, 8],
    };

    const INTEREST_TABLE = {
      1: { 1: 0.05, 2: 0.07, 3: 0.09, 4: 0.1 },
      2: { 2: 0.05, 3: 0.06, 4: 0.07, 5: 0.08, 6: 0.08 },
      3: { 3: 0.04, 4: 0.05, 5: 0.06, 6: 0.07, 7: 0.07, 8: 0.07 },
    };

    const quincenasPermitidas = QUINCENAS_PERMITIDAS[nivelPorMonto];
    if (!quincenasPermitidas.includes(quincenas)) {
      toast.error(
        `Con $${amount.toLocaleString()} solo puedes elegir entre ${quincenasPermitidas.join(
          ", "
        )} quincenas.`
      );
      setCalculo(null);
      return;
    }

    // Cálculo
    const rate = INTEREST_TABLE[nivelPorMonto][quincenas];
    const interest = Number((amount * rate).toFixed(2));
    const total = Number((amount + interest).toFixed(2));
    const payment = Number((total / quincenas).toFixed(2));

    setCalculo({ nivelPorMonto, rate, interest, total, payment });
  }, [requestedAmount, paymentMode, nivel]);

  // 🔄 Guardar borrador
  useEffect(() => {
    const saved = sessionStorage.getItem("draftSolicitud");
    if (saved) {
      try {
        reset(JSON.parse(saved));
      } catch {
        console.warn("Error cargando borrador");
      }
    }
  }, [reset]);

  useEffect(() => {
    const handler = setInterval(() => {
      const value = watch();
      sessionStorage.setItem("draftSolicitud", JSON.stringify(value));
    }, 1000);
    return () => clearInterval(handler);
  }, [watch]);

  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    setDocumentos((prev) => ({ ...prev, [name]: file }));
  };

  const notBlank = (value) =>
    value?.toString().trim() !== "" ||
    "Campo obligatorio (no puede estar vacío)";

  const handleNextStep = async () => {
    const validSteps = {
      1: [
        "datosPersonales.nombre",
        "datosPersonales.idPersonal",
        "datosPersonales.folioINE",
        "datosPersonales.grado",
        "datosPersonales.empleo",
        "datosPersonales.matricula",
        "datosPersonales.telefono",
        "datosPersonales.clienteNumberBank",
        "datosPersonales.unidad",
        "datosPersonales.zona",
        "datosPersonales.region",
      ],
      2: [
        "datosServicio.fechaAlta",
        "datosServicio.ultimoAscenso",
        "datosServicio.prestamoBanjercito",
        "datosServicio.pensionAlimenticia",
        "datosServicio.unidadEjecutoraDePago",
      ],
      3: ["requestedAmount", "paymentMode"],
    };

    const isValid = await trigger(validSteps[step]);

    if (!isValid) {
      toast.error("Completa todos los campos requeridos antes de continuar.");
      return;
    }

    // 🧮 Validación especial para paso 3
    if (step === 3) {
      const amount = Number(watch("requestedAmount"));
      const quincenas = Number(watch("paymentMode"));
      const bandaQuincenas =
        amount <= 3000
          ? [2, 3, 4]
          : amount <= 8000
          ? [2, 3, 4, 5, 6]
          : amount <= 20000
          ? [2, 3, 4, 5, 6, 7, 8]
          : [];

      if (!bandaQuincenas.includes(quincenas)) {
        toast.error(
          `Con $${amount.toLocaleString()} solo puedes elegir entre ${bandaQuincenas.join(
            ", "
          )} quincenas.`
        );
        return; // 🚫 No avanza
      }

      if (!calculo || isNaN(calculo.total)) {
        toast.error("El monto y plazo seleccionados no son válidos.");
        return; // 🚫 No avanza
      }
    }

    // ✅ Todo bien, pasa al siguiente paso
    setStep((prev) => prev + 1);
  };

  const onSubmit = async (data) => {
    const amount = Number(data.requestedAmount);
    const quincenas = Number(data.paymentMode);

    // mismas reglas clave del efecto:
    if (amount < 1000 || amount % 500 !== 0) {
      toast.error("Verifica que el monto sea ≥ $1,000 y múltiplo de $500.");
      return;
    }

    const maxByUser = LEVEL_LIMITS[nivel] || 0;
    if (amount > maxByUser) {
      toast.error(
        `Tu nivel actual (${nivel}) permite solicitar hasta $${maxByUser.toLocaleString()}.`
      );
      return;
    }

    const bandaQuincenas =
      amount <= 3000
        ? [2, 3, 4]
        : amount <= 8000
        ? [2, 3, 4, 5, 6]
        : amount <= 20000
        ? [2, 3, 4, 5, 6, 7, 8]
        : [];

    if (!bandaQuincenas.includes(quincenas)) {
      toast.error(
        `Con $${amount.toLocaleString()} solo puedes elegir entre ${bandaQuincenas.join(
          ", "
        )} quincenas.`
      );
      return;
    }

    if (!calculo || isNaN(calculo.total)) {
      toast.error("El monto y plazo seleccionados no son válidos.");
      return;
    }

    // 🚀 Crear FormData con todo lo que espera el backend
    const formData = new FormData();

    // Datos personales
    Object.entries(data.datosPersonales).forEach(([key, value]) => {
      formData.append(`datosPersonales[${key}]`, value);
    });

    // Datos del servicio
    Object.entries(data.datosServicio).forEach(([key, value]) => {
      formData.append(`datosServicio[${key}]`, value);
    });

    // Datos generales
    formData.append("requestedAmount", amount);
    formData.append("paymentMode", quincenas);

    // ✅ Archivos (el backend los recibe como campos directos)
    Object.entries(documentos).forEach(([key, file]) => {
      formData.append(key, file);
    });

    try {
      const response = await createApplication(formData);
      if (response) {
        sessionStorage.removeItem("draftSolicitud");
        navigate("/user/solicitudes");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="min-h-screen py-12 px-4 bg-linear-to-b from-[#f9f7f5] to-[#f4f0eb]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto bg-white/95 border border-[#e8e2dc]/60 shadow-[0_0_10px_rgba(97,18,50,0.15)] 
        rounded-2xl p-8 sm:p-10 transition-shadow hover:shadow-md will-change-transform"
      >
        {/* 🟨 Progreso */}
        <div className="relative mb-10">
          <div className="h-2 bg-gray-200/70 rounded-full overflow-hidden">
            <motion.div
              className="h-2 bg-linear-to-r from-[#d4af37] to-[#611232] rounded-full will-change-[width]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-[#611232] mt-2 text-right font-medium">
            Paso {step} de {totalSteps}
          </p>
        </div>

        {/* 🔹 Nivel actual */}
        <p className="text-sm text-gray-600 mb-4">
          Nivel detectado:{" "}
          <span className="font-semibold text-[#611232]">Nivel {nivel}</span>
        </p>

        {/* 🔹 Contenido dinámico */}
        {step === 1 && (
          <StepContainer title="Datos personales">
            {Object.entries({
              nombre: "Nombre completo",
              idPersonal: "ID personal",
              folioINE: "Folio INE",
              grado: "Grado",
              empleo: "Empleo",
              matricula: "Matrícula",
              telefono: "Teléfono",
              clienteNumberBank: "Cuenta bancaria",
              unidad: "Unidad",
              zona: "Zona",
              region: "Región",
            }).map(([key, label]) => (
              <InputField
                key={key}
                label={label}
                {...register(`datosPersonales.${key}`, {
                  required: "Campo obligatorio",
                  validate: notBlank,
                })}
                error={errors?.datosPersonales?.[key]?.message}
              />
            ))}
          </StepContainer>
        )}

        {step === 2 && (
          <StepContainer title="Datos del servicio">
            <InputField
              label="Fecha de alta"
              type="date"
              {...register("datosServicio.fechaAlta", {
                required: "Campo obligatorio",
                validate: notBlank,
              })}
              error={errors?.datosServicio?.fechaAlta?.message}
            />
            <InputField
              label="Último ascenso"
              type="date"
              {...register("datosServicio.ultimoAscenso", {
                required: "Campo obligatorio",
                validate: notBlank,
              })}
              error={errors?.datosServicio?.ultimoAscenso?.message}
            />
            <SelectField
              label="Préstamo Banjercito"
              options={["true", "false"]}
              {...register("datosServicio.prestamoBanjercito", {
                required: "Campo obligatorio",
                validate: notBlank,
              })}
              error={errors?.datosServicio?.prestamoBanjercito?.message}
            />
            <SelectField
              label="Pensión alimenticia"
              options={["true", "false"]}
              {...register("datosServicio.pensionAlimenticia", {
                required: "Campo obligatorio",
                validate: notBlank,
              })}
              error={errors?.datosServicio?.pensionAlimenticia?.message}
            />
            <InputField
              label="Unidad ejecutora de pago"
              type="number"
              {...register("datosServicio.unidadEjecutoraDePago", {
                required: "Campo obligatorio",
                validate: notBlank,
              })}
              error={errors?.datosServicio?.unidadEjecutoraDePago?.message}
            />
          </StepContainer>
        )}

        {step === 3 && (
          <StepContainer title="Detalles del préstamo">
            <InputField
              label="Monto solicitado (mínimo $1,000, múltiplos de $500)"
              type="number"
              step="500"
              min="1000"
              max="20000"
              {...register("requestedAmount", {
                required: "Campo obligatorio",
                validate: notBlank,
              })}
              error={errors?.requestedAmount?.message}
            />
            <SelectField
              label="Modalidad de pago (Quincenas)"
              options={
                requestedAmount <= 3000
                  ? [2, 3, 4]
                  : requestedAmount <= 8000
                  ? [2, 3, 4, 5, 6]
                  : requestedAmount <= 20000
                  ? [2, 3, 4, 5, 6, 7, 8]
                  : []
              }
              {...register("paymentMode", {
                required: "Campo obligatorio",
                validate: notBlank,
              })}
              error={errors?.paymentMode?.message}
            />

            {calculo ? (
              isNaN(calculo.total) ? (
                <div
                  className={clsx(
                    "mt-4 p-4 rounded-xl text-sm border",
                    "bg-red-50 border-red-300 text-red-700"
                  )}
                >
                  <p className="font-medium">
                    ⚠️ No se puede calcular este préstamo: el monto seleccionado
                    no tiene una tasa válida para ese plazo.
                  </p>
                  <p className="text-xs text-red-500 mt-1">
                    Ajusta el monto o el número de quincenas e inténtalo
                    nuevamente.
                  </p>
                </div>
              ) : (
                <div
                  className={clsx(
                    "mt-4 p-4 rounded-xl text-sm border",
                    "bg-gray-50 border-gray-200 text-black"
                  )}
                >
                  <p>
                    <span className="font-medium text-[#611232]">
                      Tasa aplicada:
                    </span>{" "}
                    {(calculo.rate * 100).toFixed(1)}%
                  </p>
                  <p>
                    <span className="font-medium text-[#611232]">
                      Total a pagar:
                    </span>{" "}
                    ${calculo.total.toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium text-[#611232]">
                      Pago quincenal:
                    </span>{" "}
                    ${calculo.payment.toLocaleString()}
                  </p>
                </div>
              )
            ) : null}
          </StepContainer>
        )}

        {step === 4 && (
          <StepContainer title="Carga de documentos">
            {Object.entries({
              clabe: "Carátula de CLABE (con nombre)",
              comprobanteDomicilio: "Comprobante de domicilio",
              timCim: "TIM o CIM",
              ine: "INE (Ambos Lados)",
              selfieIne: "Selfie con INE",
              selfieMilitarId: "Selfie con Identificación Militar",
            }).map(([name, label]) => (
              <FileInputField
                key={name}
                name={name}
                label={label}
                onChange={(e) => handleFileChange(e, name)}
                file={documentos[name]}
                error={!documentos[name] ? "Archivo requerido" : ""}
              />
            ))}
          </StepContainer>
        )}

        {step === 5 && (
          <StepContainer title="Revisión final">
            <p className="text-gray-600 mb-6">
              Verifica que toda la información sea correcta antes de enviar tu
              solicitud.
            </p>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-linear-to-r from-[#611232] to-[#7a1b3a] 
              text-white font-medium py-3 rounded-full shadow-md hover:shadow-lg 
              flex items-center justify-center gap-2 transition-shadow will-change-transform"
            >
              {loading ? <Loader2 className="animate-spin" /> : <CheckCircle />}
              Guardar
            </button>
          </StepContainer>
        )}

        {/* Navegación */}
        <div className="flex justify-between mt-10 text-[#611232] font-medium">
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            type="button"
            className="disabled:opacity-40 hover:text-[#4a0f27] transition-colors"
          >
            ← Atrás
          </button>
          {step < totalSteps && (
            <button
              type="button"
              onClick={handleNextStep}
              className="hover:text-[#4a0f27] transition-colors"
            >
              Siguiente →
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
