import clsx from "clsx";

export default function InputField({
  label,
  type = "text",
  placeholder = "",
  register,
  name,
  errors,
}) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={clsx(
          "w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#611232] transition",
          errors[name]
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-[#611232]"
        )}
      />

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}
