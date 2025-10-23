import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { validateToken } from "../api/auth";

export default function UserPrivateRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      // Si no hay token → no está autenticado
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        await validateToken();
        setIsValid(true); // ✅ token válido
      } catch {
        // 🚫 Token inválido → limpiar sesión
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsValid(false);
      }
    };

    checkToken();
  }, []);

  // ⏳ Mientras se valida
  if (isValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] text-[#d4af37]">
        Verificando sesión...
      </div>
    );
  }

  // 🚫 No válido → login
  if (!isValid) return <Navigate to="/login" replace />;

  // ✅ Token válido → renderizar contenido
  return children;
}
