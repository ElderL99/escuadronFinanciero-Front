import { Percent, Clock, Handshake } from "lucide-react";

export function HomeWhyUs({ icon, title, description }) {
  const Icon =
    icon === "percent" ? Percent : icon === "clock" ? Clock : Handshake;

  return (
    <div
      className="flex items-start gap-4 bg-[#FFF9F0]/90 p-5 rounded-2xl 
      shadow-[0_2px_6px_rgba(0,0,0,0.05)] border border-[#f3f4f6]/70 
      hover:shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-shadow will-change-transform"
    >
      <div className="p-3 rounded-full bg-[#C5A572]/20 flex items-center justify-center">
        <Icon className="text-[#C5A572]" size={22} />
      </div>
      <div className="text-left select-none">
        <h4 className="text-[#611232] font-bold text-base mb-1">{title}</h4>
        <p className="text-[#4B5563] text-sm leading-snug">{description}</p>
      </div>
    </div>
  );
}
