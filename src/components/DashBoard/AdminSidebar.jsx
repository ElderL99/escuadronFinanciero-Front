import { Link, useLocation } from "react-router-dom";
import { CheckCircle, Activity, Zap, LogOut, Users } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Activity },
    {
      name: "Esperando Activación",
      path: "/admin/signed-contracts",
      icon: Zap,
    },
    { name: "Activas", path: "/admin/active-credits", icon: CheckCircle },
    { name: "Usuarios", path: "/admin/users", icon: Users },
  ];

  return (
    <>
      {/* ===== SIDEBAR ESCRITORIO ===== */}
      <aside
        className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-64 
        bg-linear-to-b from-[#611232]/90 to-[#2e0a1c]/70 
        backdrop-blur-xl border-r border-white/10 
        shadow-[0_0_25px_rgba(97,18,50,0.5)] 
        z-40 overflow-y-auto"
      >
        <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-20 blur-2xl pointer-events-none" />

        <div className="z-10 p-6 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-2xl font-bold mb-10 tracking-wide bg-linear-to-r from-white to-white/50 bg-clip-text text-transparent drop-shadow-sm">
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
                    className={`group flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-white/15 shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-md flex items-center justify-center ${
                        isActive
                          ? "bg-[#d4af37]/20 text-[#d4af37]"
                          : "text-white/70 group-hover:text-white"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <span
                      className={`text-sm font-medium ${
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

          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors mt-8"
          >
            <LogOut size={18} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ===== SIDEBAR MÓVIL ===== */}
      <aside
        className="lg:hidden fixed top-0 left-0 h-full w-16 
        bg-linear-to-b from-[#611232]/90 to-[#2e0a1c]/80 
        backdrop-blur-xl border-r border-white/10 shadow-xl 
        flex flex-col justify-between z-50"
      >
        <nav className="flex flex-col items-center py-4 gap-4 flex-1 overflow-y-auto">
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

        <button
          onClick={logout}
          className="p-3 mb-4 text-gray-400 hover:text-red-400 transition-colors flex justify-center"
        >
          <LogOut size={22} />
        </button>
      </aside>
    </>
  );
}
