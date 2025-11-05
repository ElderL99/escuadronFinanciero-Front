import AdminSidebar from "../components/DashBoard/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex bg-[#0f0a10] text-white min-h-screen">
      {/* Sidebar fija (desktop y móvil) */}
      <AdminSidebar />

      {/* Contenido principal */}
      <main
        className="flex-1 ml-16 lg:ml-64 min-h-screen 
        relative bg-linear-to-br from-[#f9f7f5] via-[#f4f0eb] to-[#ede8e3]
        overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <Outlet />
      </main>
    </div>
  );
}
