import AdminPrivateRoutes from "../router/AdminPrivateRouter";
import { Outlet, Link, useLocation } from "react-router-dom";
import { CheckCircle, Activity, Zap } from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Activity },
    { name: "Esperando Activacion", path: "/admin/contracts", icon: Zap },
    { name: "Activas", path: "/admin/contracts/actived", icon: CheckCircle },
  ];

  return (
    <AdminPrivateRoutes>
      <div className="flex min-h-screen">
        {/* Sidebar escritorio */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#611232]/90 backdrop-blur-md text-white p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-8 tracking-wide drop-shadow-md">
            Bienvenido Admin
          </h2>
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-left p-3 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-sm font-medium ${
                  location.pathname === item.path
                    ? "bg-[#501025]/80"
                    : "hover:bg-[#501025]/80"
                }`}
              >
                {item.icon && <item.icon size={20} />}
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Sidebar móvil solo iconos */}
        <aside className="flex flex-col lg:hidden w-16 bg-[#611232]/90 text-white shadow-xl">
          <nav className="flex flex-col items-center py-4 gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`p-3 rounded-lg transition-colors duration-200 flex justify-center items-center ${
                    location.pathname === item.path
                      ? "bg-[#501025]/80"
                      : "hover:bg-[#501025]/80"
                  }`}
                >
                  <Icon size={24} />
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1">
          {/* Botones aprobar/rechazar solo en móvil encima del contenido */}

          <Outlet />
        </main>
      </div>
    </AdminPrivateRoutes>
  );
}
