import { Outlet, Link, useLocation } from "react-router-dom";
import { LogOut, User, FileText, Home, CreditCard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import HomeFooter from "@/components/homePage/HomeFooter";

export default function UserLayout() {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: "Inicio", path: "/user/dashboard", icon: Home },
    { name: "Mis solicitudes", path: "/user/solicitudes", icon: FileText },
    { name: "Mis créditos", path: "/user/creditos", icon: CreditCard },
    { name: "Perfil", path: "/user/perfil", icon: User },
  ];

  return (
    <div className="h-screen w-full flex bg-[#F9FAFB] overflow-hidden text-white">
      {/* ===== SIDEBAR DESKTOP ===== */}
      <aside
        className="hidden md:flex flex-col w-64 bg-linear-to-b from-[#611232]/95 to-[#2e0a1c]/80 
        backdrop-blur-lg border-r border-white/10 shadow-[0_0_20px_rgba(97,18,50,0.3)] 
        relative overflow-hidden"
      >
        {/* 🔹 Brillo de fondo */}
        <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-20 blur-2xl pointer-events-none" />

        {/* Contenido Sidebar */}
        <div className="z-10 p-6 flex flex-col h-full justify-between">
          {/* Logo y navegación */}
          <div>
            <h1 className="text-lg font-bold mb-10 tracking-wide bg-linear-to-r from-white to-[#d4af37] bg-clip-text text-transparent">
              Escuadrón Financiero
            </h1>

            <nav className="flex flex-col gap-2">
              {navItems.map(({ name, path, icon: Icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={name}
                    to={path}
                    className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-white/15 shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-md transition-all ${
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

      {/* ===== SIDEBAR MÓVIL ===== */}
      {/* ===== SIDEBAR MÓVIL ===== */}
      <aside
        className="fixed md:hidden top-0 left-0 h-full w-16 
  bg-linear-to-b from-[#611232]/95 to-[#2e0a1c]/90 
  backdrop-blur-md border-r border-white/10 shadow-lg 
  flex flex-col justify-between z-50"
      >
        <nav className="flex flex-col items-center py-4 gap-4 flex-1 overflow-y-auto">
          {navItems.map(({ name, path, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={name}
                to={path}
                className={`p-3 rounded-xl transition-all ${
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
          className="p-3 mb-4 text-gray-400 hover:text-red-400 transition-colors"
        >
          <LogOut size={22} />
        </button>
      </aside>

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <main
        className="flex-1 h-full overflow-y-auto px-2   md:px-8  bg-[#F9FAFB] md:ml-0 ml-15"
        style={{ scrollbarWidth: "thin" }}
      >
        <Outlet />
      </main>
    </div>
  );
}
