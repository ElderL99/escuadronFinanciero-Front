import { Outlet, Link, useLocation } from "react-router-dom";
import { LogOut, User, FileText, Home } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function UserLayout() {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: "Inicio", path: "dashboard", icon: Home },
    { name: "Mis solicitudes", path: "solicitudes", icon: FileText },
    { name: "Perfil", path: "perfil", icon: User },
  ];

  return (
    <div
      className="h-screen w-full flex bg-linear-to-br from-[#f9f7f5] via-[#f4f0eb] to-[#ede8e3]
  overflow-y-auto text-white overflow-hidden"
    >
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 
        bg-gradient-to-b from-[#611232]/90 to-[#2e0a1c]/70 
        backdrop-blur-xl border-r border-white/10 
        shadow-[0_0_25px_rgba(97,18,50,0.5)] 
        relative overflow-hidden"
      >
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20 blur-2xl pointer-events-none" />

        <div className="z-10 p-6 flex flex-col h-full justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-10 tracking-wide bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent drop-shadow-sm">
              Escuadrón Financiero
            </h1>

            <nav className="flex flex-col gap-3">
              {navItems.map(({ name, path, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={name}
                    to={path}
                    className={`group flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-white/15 shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-md transition-all duration-300 ${
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
                      {name}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Botón Salir */}
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors mt-8"
          >
            <LogOut size={18} /> Salir
          </button>
        </div>
      </aside>

      {/* Sidebar móvil */}
      <aside
        className="flex md:hidden flex-col w-16 
        bg-gradient-to-b from-[#611232]/90 to-[#2e0a1c]/80 
        backdrop-blur-xl border-r border-white/10 shadow-xl"
      >
        <nav className="flex flex-col items-center py-4 gap-4 flex-1">
          {navItems.map(({ name, path, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={name}
                to={path}
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

        {/* Salir en móvil */}
        <button
          onClick={logout}
          className="p-3 mb-4 text-gray-400 hover:text-red-400 transition-colors"
        >
          <LogOut size={22} />
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 h-full overflow-y-auto  md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
