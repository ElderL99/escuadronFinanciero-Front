import AdminSidebar from "../components/DashBoard/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#0f0a10] text-white">
      <AdminSidebar />
      <main
        className="flex-1 relative 
  bg-linear-to-br from-[#f9f7f5] via-[#f4f0eb] to-[#ede8e3]
  overflow-y-auto "
      >
        <Outlet />
      </main>
    </div>
  );
}
