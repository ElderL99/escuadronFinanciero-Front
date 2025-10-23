import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminPrivateRoute({ children }) {
  const { user, loading, isAuthenticated } = useAuth();

  // 🕒 Mostrar pantalla de carga mientras se valida el token
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] text-[#d4af37] font-medium tracking-wide">
        Verificando acceso...
      </div>
    );
  }

  // 🚫 Si no hay sesión → redirigir al login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Si está autenticado pero no es admin → dashboard normal
  if (user?.role !== "admin") {
    return <Navigate to="/user/dashboard" replace />;
  }

  // ✅ Admin autenticado → acceso permitido
  return children;
}
