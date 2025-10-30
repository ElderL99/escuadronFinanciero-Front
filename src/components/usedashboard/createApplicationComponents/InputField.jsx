export default function InputField({ label, type = "text", error, ...rest }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        {...rest}
        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 text-[#1a1a1a] bg-white ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-[#d4af37]"
        }`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
