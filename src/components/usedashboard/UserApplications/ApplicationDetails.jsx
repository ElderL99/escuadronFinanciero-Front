export default function ApplicationDetails({ app }) {
  return (
    <div className="mt-4 text-sm text-gray-700 space-y-1">
      <p>
        <span className="font-medium text-[#611232]/90">
          Última actualización:
        </span>{" "}
        {new Date(app.updatedAt).toLocaleDateString("es-MX", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
      <p>
        <span className="font-medium text-[#611232]/90">ID interno:</span>{" "}
        {app._id}
      </p>
    </div>
  );
}
