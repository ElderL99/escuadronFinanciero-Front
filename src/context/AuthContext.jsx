import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  loginRequest,
  registerRequest,
  getProfile,
  recoverPasswordApi,
} from "../api/auth";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 🧠 Leer nivel y expiración del token
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp && decoded.exp < now) {
        // Expiró → cerrar sesión
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
        return;
      }

      // Si no expiró, inyectar nivel en user (si no lo tiene)
      if (decoded.level && user && user.level !== decoded.level) {
        const updated = { ...user, level: decoded.level };
        setUser(updated);
        localStorage.setItem("user", JSON.stringify(updated));
      }
    } catch {
      console.warn("Error al decodificar token");
    }
  }, [navigate, user]);

  // 🔑 Login
  const login = useCallback(
    async (email, password) => {
      try {
        setLoading(true);
        setError(null);

        const res = await loginRequest({ email, password });
        const token = res.data?.data?.token;
        if (!token) throw new Error("No se recibió token del servidor");

        // Guardar token
        localStorage.setItem("token", token);

        // Decodificar nivel real del usuario
        let level = 1;
        try {
          const decoded = jwtDecode(token);
          level = decoded.level || 1;
        } catch {
          level = 1;
        }

        // Obtener perfil real
        const profileRes = await getProfile();
        const userData = profileRes.data?.data?.User || profileRes.data?.data;

        const fullUser = { ...userData, level };
        setUser(fullUser);
        localStorage.setItem("user", JSON.stringify(fullUser));

        // Redirigir según rol
        if (fullUser.role === "admin") navigate("/admin/dashboard");
        else navigate("/user/dashboard");

        return fullUser;
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Error al iniciar sesión");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  // 🧾 Registro
  const register = useCallback(
    async (userData) => {
      try {
        setLoading(true);
        setError(null);
        await registerRequest(userData);
        navigate("/login");
        return true;
      } catch (err) {
        setError(err.response?.data?.message || "Error al registrarse");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  // 🚪 Logout
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }, [navigate]);

  // 🔁 Recuperar contraseña
  const recoverPassword = useCallback(async ({ email }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await recoverPasswordApi({ email });
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error al recuperar contraseña");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        recoverPassword,
        isAuthenticated: !!localStorage.getItem("token"),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook global
export const useAuth = () => useContext(AuthContext);
