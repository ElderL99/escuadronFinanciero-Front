import { Percent, Clock, Handshake } from "lucide-react";

export function HomeWhyUs({ icon, title, description }) {
  const Icon =
    icon === "percent" ? Percent : icon === "clock" ? Clock : Handshake;

  return (
    <div className="flex items-start gap-4 bg-[#FFF9F0] md:bg-white p-5 rounded-2xl shadow-sm border border-[#F3F4F6] hover:shadow-md transition-all">
      <div className="p-3 rounded-full bg-[#C5A572]/20 flex items-center justify-center">
        <Icon className="text-[#C5A572]" size={22} />
      </div>
      <div className="text-left">
        <h4 className="text-[#611232] font-bold text-base mb-1">{title}</h4>
        <p className="text-[#4B5563] text-sm leading-snug">{description}</p>
      </div>
    </div>
  );
}
