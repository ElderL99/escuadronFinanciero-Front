export default function DashboardCards({ label, value, Icon, color }) {
  return (
    <div
      className="relative w-full min-h-[4.5rem] rounded-xl 
      bg-gradient-to-br from-[#611232]/80 to-[#611232]/40 
      backdrop-blur-lg border border-white/10 shadow-lg 
      flex items-center gap-3 px-3 
      transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
    >
      {/* Glow decorativo */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-30 blur-xl pointer-events-none" />

      {/* Icono */}
      {Icon && (
        <div
          className={`relative z-10 p-2 rounded-full ${color} bg-white/20 
          flex items-center justify-center shadow-inner`}
        >
          <Icon className="size-6 sm:size-7 md:size-8 text-white" />
        </div>
      )}

      {/* Texto */}
      <div className="relative z-10 flex flex-col justify-center">
        <p className="text-[10px] sm:text-[11px] md:text-xs text-white/70 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm sm:text-base md:text-lg font-semibold text-white drop-shadow">
          {value}
        </p>
      </div>
    </div>
  );
}
