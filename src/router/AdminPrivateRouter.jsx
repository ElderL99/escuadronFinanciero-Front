import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { validateToken, getProfile } from "../api/auth";

export default function AdminPrivateRoute({ children }) {
  const [isValid, setIsValid] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      const token = localStorage.getItem("token");

      // 🚫 Sin token → no autenticado
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        // ✅ Validar token
        await validateToken();

        // ✅ Obtener perfil y verificar rol
        const res = await getProfile();
        const user = res.data?.data?.User || res.data?.data;
        if (user.role === "admin") {
          setIsAdmin(true);
          setIsValid(true);
        } else {
          setIsAdmin(false);
          setIsValid(true);
        }
      } catch (err) {
        console.warn("Token inválido o expirado:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsValid(false);
      }
    };

    checkAdminAccess();
  }, []);

  // ⏳ Pantalla de espera mientras se valida
  if (isValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] text-[#d4af37] font-medium tracking-wide">
        Verificando acceso de administrador...
      </div>
    );
  }

  // 🚫 Token inválido → login
  if (!isValid) return <Navigate to="/login" replace />;

  // 🚫 Usuario válido pero sin rol admin → dashboard de usuario
  if (!isAdmin) return <Navigate to="/user/dashboard" replace />;

  // ✅ Admin válido → acceso permitido
  return children;
}
