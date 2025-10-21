import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AdminPrivateRoute({ children }) {
  const { user, loading, isAuthenticated } = useAuth();

  // ⏳ Mientras se verifica el perfil
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] text-[#d4af37]">
        Verificando acceso...
      </div>
    );
  }

  // 🚫 Si no hay sesión → login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Si está autenticado pero no es admin → dashboard de usuario
  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Autenticado y admin → puede ver contenido
  return children;
}
