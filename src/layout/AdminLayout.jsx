// layout/AdminLayout.jsx
import AdminPrivateRoutes from "../router/AdminPrivateRouter";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <AdminPrivateRoutes>
      <Outlet />
    </AdminPrivateRoutes>
  );
}
