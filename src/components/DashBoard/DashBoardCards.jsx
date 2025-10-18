export default function DashboardCards({ label, value, Icon, color }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="flex items-center justify-center md:justify-start gap-4 p-5 ">
        <div className={`p-3 rounded-full text-white ${color}`}>
          {Icon && <Icon className="size-5" />}
        </div>
        <div>
          <p className="text-gray-500 text-sm">{label}</p>
          <p className="text-3xl font-bold text-[#0a1930] mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
}
