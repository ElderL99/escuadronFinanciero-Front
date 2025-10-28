export default function ApplicationDetailsCard({ data }) {
  if (!data)
    return (
      <section className="bg-[#f9f9f9] p-6 rounded-2xl text-center text-gray-500 shadow-inner">
        No se encontró información de la solicitud.
      </section>
    );

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const infoLeft = [
    { label: "ID", value: data._id },
    { label: "Nombre", value: data.nombre },
    { label: "Grado", value: data.grado },
    { label: "Empleo", value: data.empleo },
    { label: "Unidad", value: data.unidad },
    { label: "Zona", value: data.zona },
    { label: "Teléfono", value: data.telefono },
    // 💳 Nuevo campo
    {
      label: "Número de cuenta bancaria",
      value: data.clienteNumberBank || "—",
    },
  ];

  const infoRight = [
    {
      label: "Monto solicitado",
      value: `$${data.requestedAmount?.toLocaleString("es-MX")}`,
      type: "highlight",
    },
    { label: "Modalidad", value: data.paymentMode },
    {
      label: "Estado",
      value: data.state,
      type: "state",
    },
    { label: "Fecha Alta", value: formatDate(data.fechaAlta) },
    { label: "Último Ascenso", value: formatDate(data.ultimoAscenso) },
    {
      label: "Préstamo Banjercito",
      value: data.prestamoBanjercito ? "Sí" : "No",
    },
    {
      label: "Pensión Alimenticia",
      value: data.pensionAlimenticia ? "Sí" : "No",
    },
    // 🏛️ Nuevo campo
    {
      label: "Unidad Ejecutora de Pago",
      value: data.unidadEjecutoraDePago || "—",
    },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-lg border border-[#e5e5e5] overflow-hidden">
      {/* Header */}
      <div className="bg-[#611232] px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-bold text-white tracking-wide">
          Detalles de la Solicitud
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          {infoLeft.map((item) => (
            <DetailRow key={item.label} label={item.label} value={item.value} />
          ))}
        </div>

        <div className="space-y-3">
          {infoRight.map((item) => (
            <DetailRow
              key={item.label}
              label={item.label}
              value={item.value}
              type={item.type}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailRow({ label, value, type }) {
  const baseStyle =
    "flex justify-between items-center border-b border-[#f3e6eb] pb-2 text-sm md:text-base";

  let valueStyle = "text-gray-800 font-medium";
  if (type === "highlight") valueStyle = "text-[#611232] font-bold";
  if (type === "state") valueStyle = "text-[#d4af37] font-semibold";

  return (
    <div className={baseStyle}>
      <span className="text-[#611232] font-semibold">{label}</span>
      <span className={valueStyle}>{value || "—"}</span>
    </div>
  );
}
