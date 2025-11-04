import { CheckCircle } from "lucide-react";

export default function HomeOurProduct({
  Icon,
  bgColor,
  textColor,
  title,
  description,
  items = [],
}) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col justify-start items-start gap-3 shadow-md"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Icono */}
      <div className="p-3 bg-white/20 rounded-full mb-2">
        <Icon size={28} color={textColor === "white" ? "#fff" : "#611232"} />
      </div>

      {/* Título y descripción */}
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm opacity-90 leading-snug mb-3">{description}</p>

      {/* Lista de beneficios */}
      <ul className="space-y-1 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckCircle
              size={16}
              color={textColor === "white" ? "#C5A572" : "#611232"}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
