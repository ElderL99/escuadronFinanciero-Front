import AdminSidebar from "../components/DashBoard/AdminSidebar";
import AdminPrivateRoutes from "../router/AdminPrivateRouter";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <AdminPrivateRoutes>
      <div className="flex min-h-screen bg-[#0f0a10] text-white">
        <AdminSidebar />

        <main
          className="flex-1 relative bg-gradient-to-br 
          from-[#1a0f16] via-[#150a12] to-[#0f0a10] 
          overflow-y-auto"
        >
          <Outlet />
        </main>
      </div>
    </AdminPrivateRoutes>
  );
}
