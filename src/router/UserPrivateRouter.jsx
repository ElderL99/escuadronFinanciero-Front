import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function UserPrivateRoute({ children }) {
  const { user, loading, isAuthenticated } = useAuth();

  // ⏳ Mostrar loader mientras se valida token
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] text-[#d4af37] font-medium tracking-wide">
        Verificando acceso...
      </div>
    );
  }

  // 🚫 Si no está autenticado → login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Si es admin → lo redirigimos a su panel principal
  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  // ✅ Usuario normal → puede ver su dashboard
  return children;
}
