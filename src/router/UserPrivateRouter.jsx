import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function UserPrivateRoute({ children }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] text-[#d4af37]">
        Verificando acceso...
      </div>
    );
  }

  // 🚫 Sin token → login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Si es admin → lo redirigimos a su panel
  if (user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // ✅ Usuario normal → acceso permitido
  return children;
}
