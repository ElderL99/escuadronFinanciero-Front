import { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginRequest,
  registerRequest,
  getProfile,
  recoverPasswordApi,
} from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 🔑 Login
  const login = useCallback(
    async (email, password) => {
      try {
        setLoading(true);
        setError(null);

        const res = await loginRequest({ email, password });
        const token = res.data.data.token;
        localStorage.setItem("token", token);

        // Obtener perfil inicial
        const profileRes = await getProfile();
        const userData = profileRes.data?.data?.User || profileRes.data?.data;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        // Redirigir según rol
        if (userData.role === "admin") navigate("/admin/dashboard");
        else navigate("/user/dashboard");

        return userData;
      } catch (err) {
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
    navigate("/login");
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
