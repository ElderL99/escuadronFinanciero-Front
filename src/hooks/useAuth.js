import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginRequest,
  registerRequest,
  getProfile,
  recoverPasswordApi,
  validateToken, // ✅ nuevo endpoint
} from "../api/auth.js";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Validar token y cargar perfil al montar la app
  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // 1️⃣ Validar token sin traer datos pesados
        await validateToken();

        // 2️⃣ Token válido → obtener perfil completo
        const res = await getProfile();
        const userData = res.data?.data?.User || res.data?.data || res.data;

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        console.warn("Token expirado o inválido:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [navigate]);

  // 🔑 Login
  const login = useCallback(
    async (email, password) => {
      try {
        setLoading(true);
        setError(null);

        // 1️⃣ Petición de login
        const res = await loginRequest({ email, password });
        const token = res.data.data.token;
        localStorage.setItem("token", token);

        // 2️⃣ Obtener perfil tras login
        const profileRes = await getProfile();
        const userData = profileRes.data?.data?.User || profileRes.data?.data;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        // 3️⃣ Redirigir según rol
        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }

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

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    recoverPassword,
    isAuthenticated: !!user,
  };
}
