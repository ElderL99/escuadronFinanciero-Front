export default function FileInputField({ label, onChange, file, error, name }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1 capitalize">
        {label}
      </label>
      <input
        type="file"
        name={name}
        onChange={onChange}
        className={`w-full border rounded-lg px-3 py-2 file:bg-[#611232] file:text-white file:border-none file:px-3 file:py-1 file:rounded-md hover:file:bg-[#4a0f27] ${
          error && !file
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-[#d4af37]"
        }`}
      />
      {file && (
        <p className="text-xs text-green-700 mt-1">
          📎 Archivo seleccionado:{" "}
          <span className="font-medium">{file.name}</span>
        </p>
      )}
      {error && !file && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
