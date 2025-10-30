import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
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
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  // 📋 useForm
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

  /* Restaurar borrador */
  useEffect(() => {
    const saved = sessionStorage.getItem("draftSolicitud");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        reset(parsed);
      } catch (err) {
        console.error("Error cargando borrador:", err);
      }
    }
  }, [reset]);

  /* Guardar borrador automáticamente */
  useEffect(() => {
    const subscription = watch((value) => {
      sessionStorage.setItem("draftSolicitud", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  /* Maneja archivos */
  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    setDocumentos((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  // Valida espaciois vacios
  const notBlank = (value) =>
    value?.trim() !== "" || "Campo obligatorio (no puede estar vacío)";

  /*  Validar antes de avanzar de paso */
  const handleNextStep = async () => {
    const validSteps = {
      1: Object.keys({
        nombre: "",
        idPersonal: "",
        folioINE: "",
        grado: "",
        empleo: "",
        matricula: "",
        telefono: "",
        clienteNumberBank: "",
        unidad: "",
        zona: "",
        region: "",
      }).map((key) => `datosPersonales.${key}`),
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
    if (isValid) {
      setStep((prev) => prev + 1);
    } else {
      toast.error("Completa todos los campos requeridos antes de continuar.");
    }
  };

  /* 📤 Enviar solicitud */
  const onSubmit = async (data) => {
    try {
      // Verificar que todos los archivos requeridos existan
      const requiredFiles = [
        "clabe",
        "comprobanteDomicilio",
        "timCim",
        "ine",
        "selfieIne",
        "selfieMilitarId",
      ];

      const missing = requiredFiles.filter((name) => !documentos[name]);
      if (missing.length > 0) {
        toast.error("Faltan documentos por subir.");
        return;
      }

      const formData = new FormData();

      // Datos personales
      Object.entries(data.datosPersonales).forEach(([k, v]) =>
        formData.append(`datosPersonales[${k}]`, v)
      );

      // Datos del servicio
      Object.entries(data.datosServicio).forEach(([k, v]) =>
        formData.append(`datosServicio[${k}]`, v)
      );

      // Préstamo
      formData.append("requestedAmount", data.requestedAmount);
      formData.append("paymentMode", data.paymentMode);

      // Documentos (exactos a Multer)
      Object.entries(documentos || {}).forEach(([key, file]) => {
        if (file) formData.set(key, file);
      });

      const result = await createApplication(formData);
      if (result) {
        sessionStorage.removeItem("draftSolicitud");
        setDocumentos({});
        reset();
        navigate("/user/solicitudes");
      }
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
    }
  };

  return (
    <section className="min-h-screen bg-[#f3efea] py-10 px-4 text-[#1a1a1a]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6"
      >
        {/*  Barra de progreso */}
        <div className="relative mb-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <motion.div
              className="h-2 bg-[#d4af37] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2 text-right">
            Paso {step} de {totalSteps}
          </p>
        </div>

        {/* === Secciones === */}
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
              clienteNumberBank: "Número de cuenta bancaria",
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
              label="Monto solicitado"
              type="number"
              {...register("requestedAmount", {
                required: "Campo obligatorio",
                validate: notBlank,
              })}
              error={errors?.requestedAmount?.message}
            />
            <SelectField
              label="Modalidad de pago"
              options={["1m", "2m", "3m", "4m", "5m", "6m"]}
              {...register("paymentMode", {
                required: "Campo obligatorio",
                validate: notBlank,
              })}
              error={errors?.paymentMode?.message}
            />
          </StepContainer>
        )}

        {step === 4 && (
          <StepContainer title="Carga de documentos">
            {Object.entries({
              clabe: "Carátula de CLABE (con nombre)",
              comprobanteDomicilio: "Comprobante de domicilio",
              timCim: "TIM o CIM",
              ine: "INE",
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
              className="w-full bg-[#611232] text-white font-medium py-3 rounded-lg hover:bg-[#4a0f27] flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <CheckCircle />}
              Guardar y Verificar
            </button>
          </StepContainer>
        )}

        {/*Navegación */}
        <div className="flex justify-between mt-8">
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            type="button"
            className="text-[#611232] font-medium disabled:opacity-40"
          >
            ← Atrás
          </button>
          {step < totalSteps && (
            <button
              type="button"
              onClick={handleNextStep}
              className="text-[#611232] font-semibold hover:text-[#4a0f27]"
            >
              Siguiente →
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
