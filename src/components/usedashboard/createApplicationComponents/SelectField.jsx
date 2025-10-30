export default function SelectField({ label, options, error, ...rest }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">{label}</label>
      <select
        {...rest}
        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 text-[#1a1a1a] bg-white ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-[#d4af37]"
        }`}
      >
        <option value="">Seleccionar...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt === "true" ? "Sí" : opt === "false" ? "No" : opt}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
