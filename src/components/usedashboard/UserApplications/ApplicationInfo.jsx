export default function ApplicationInfo({ app }) {
  return (
    <div className="space-y-1 text-sm text-[#2b1b1f]">
      <p>
        <span className="font-medium text-[#611232]/90">Nombre: </span>
        <span className="text-[#2b1b1f]/90">{app.nombre}</span>
      </p>
      <p>
        <span className="font-medium text-[#611232]/90">Grado: </span>
        <span className="text-[#2b1b1f]/90">{app.grado}</span>
      </p>
      <p>
        <span className="font-medium text-[#611232]/90">Empleo: </span>
        <span className="text-[#2b1b1f]/90">{app.empleo}</span>
      </p>
      <p>
        <span className="font-medium text-[#611232]/90">Monto: </span>
        <span className="text-green-700">
          ${app.requestedAmount?.toLocaleString("es-MX")}
        </span>
      </p>
      <p>
        <span className="font-medium text-[#611232]/90">Modalidad: </span>
        <span className="uppercase text-[#d4af37]">{app.paymentMode}</span>
      </p>
      <p>
        <span className="font-medium text-[#611232]/90">Estado: </span>
        <span
          className={`font-semibold ${
            app.state === "active"
              ? "text-[#0066cc]"
              : app.state === "completed"
              ? "text-[#0c7a43]"
              : app.state === "awaiting_signature"
              ? "text-[#d4af37]"
              : app.state === "rejected"
              ? "text-[#b91c1c]"
              : "text-[#611232]"
          }`}
        >
          {app.state?.toUpperCase()}
        </span>
      </p>

      <p className="text-gray-500 text-xs mt-1">
        Creada el{" "}
        {new Date(app.createdAt).toLocaleDateString("es-MX", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
