import { Link, useLocation } from "react-router-dom";
import { CheckCircle, Activity, Zap } from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Activity },
    {
      name: "Esperando Activación",
      path: "/admin/signed-contracts",
      icon: Zap,
    },
    { name: "Activas", path: "/admin/contracts/actived", icon: CheckCircle },
  ];

  return (
    <>
      {/* Sidebar escritorio */}
      <aside
        className="hidden lg:flex flex-col w-64 
        bg-gradient-to-b from-[#611232]/90 to-[#2e0a1c]/70 
        backdrop-blur-xl border-r border-white/10 
        shadow-[0_0_25px_rgba(97,18,50,0.5)] 
        relative overflow-hidden"
      >
        {/* Glow decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20 blur-2xl pointer-events-none" />

        <div className="z-10 p-6">
          <h2 className="text-2xl font-bold mb-10 tracking-wide bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent drop-shadow-sm">
            Escuadrón Admin
          </h2>

          <nav className="flex flex-col gap-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center gap-3 p-3 rounded-lg relative overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "bg-white/15 shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                      : "hover:bg-white/10"
                  }`}
                >
                  <div
                    className={`p-2 rounded-md flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-[#d4af37]/20 text-[#d4af37]"
                        : "text-white/70 group-hover:text-white"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/80"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Sidebar móvil solo iconos */}
      <aside
        className="flex flex-col lg:hidden w-16 
        bg-gradient-to-b from-[#611232]/90 to-[#2e0a1c]/80 
        backdrop-blur-xl border-r border-white/10 shadow-xl"
      >
        <nav className="flex flex-col items-center py-4 gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-[#d4af37]/20 text-[#d4af37] shadow-inner"
                    : "hover:bg-white/10 text-white/80"
                }`}
              >
                <Icon size={22} />
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
