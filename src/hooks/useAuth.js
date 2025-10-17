import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginRequest,
  registerRequest,
  getProfile,
  recoverPasswordApi,
} from "../api/auth.js";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 🔐 Verifica el token y obtiene el perfil al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    getProfile()
      .then((res) => setUser(res.data.data.User))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔑 Login
  const login = useCallback(
    async (email, password) => {
      try {
        setLoading(true);
        setError(null);

        // Petición de login
        const res = await loginRequest({ email, password });
        const token = res.data.data.token;
        localStorage.setItem("token", token);

        // Obtener perfil
        const profileRes = await getProfile();
        setUser(profileRes.data.data);

        // Redirigir a dashboard u otra página
        navigate("/user/dashboard");
        return true;
      } catch (err) {
        setError(err.response?.data?.message || "Error al iniciar sesión");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  // 📝 Registro
  const register = useCallback(
    async (userData) => {
      try {
        setLoading(true);
        setError(null);

        await registerRequest(userData);

        // Redirigir al login después del registro
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
    setUser(null);

    // Redirigir al login
    navigate("/login");
  }, [navigate]);

  // Recuperar contrasena
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
    isAuthenticated: !!user,
    recoverPassword,
  };
}
