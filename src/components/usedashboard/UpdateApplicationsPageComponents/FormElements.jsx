export function Input({ label, name, register, type = "text" }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs text-gray-600 mb-1">{label}</label>
      <input
        {...register(name)}
        type={type}
        className="border border-[#611232]/20 rounded-lg px-3 py-2 text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#611232]/40 placeholder-gray-400"
      />
    </div>
  );
}

export function Select({ label, name, register, options }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs text-gray-600 mb-1">{label}</label>
      <select
        {...register(name)}
        className="border border-[#611232]/20 rounded-lg px-3 py-2 text-sm text-[#1a1a1a] bg-white focus:outline-none focus:ring-2 focus:ring-[#611232]/40"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
