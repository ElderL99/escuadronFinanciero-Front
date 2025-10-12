import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AdminPrivateRoute({ children }) {
  const { user, loading, isAuthenticated } = useAuth();

  // Mientras carga el perfil
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#611232] font-medium">
        Verificando acceso...
      </div>
    );
  }

  // Si no está autenticado → al login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Si está autenticado pero no es admin → redirigir
  if (user?.role !== "admin") return <Navigate to="/" replace />;

  // Si pasa todas las validaciones → renderizar el contenido
  return children;
}
