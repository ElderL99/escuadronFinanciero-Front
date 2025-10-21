import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginRequest,
  registerRequest,
  getProfile,
  recoverPasswordApi,
} from "../api/auth.js";

export default function useAuth() {
  const [user, setUser] = useState(() => {
    // ✅ Recuperar usuario cacheado (si existe)
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 🔐 Verificar token y obtener perfil al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");

    // ⛔️ Si no hay token → redirigir al login inmediatamente
    if (!token) {
      setUser(null);
      setLoading(false);
      navigate("/login");
      return;
    }

    // ⚡ Si ya hay usuario cacheado → no volver a pedir perfil
    if (user) {
      setLoading(false);
      return;
    }

    // 🧩 Intentar obtener perfil
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        const userData = res.data.data.User || res.data.data;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        console.error("Token inválido o expirado:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login"); // 🔁 redirigir si falla el perfil
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, user]);

  // 🔑 Login
  const login = useCallback(
    async (email, password) => {
      try {
        setLoading(true);
        setError(null);

        // 1️⃣ Petición de login → obtiene token
        const res = await loginRequest({ email, password });
        const token = res.data.data.token;
        localStorage.setItem("token", token);

        // 2️⃣ Obtener perfil una sola vez
        const profileRes = await getProfile();
        const userData = profileRes.data.data.User || profileRes.data.data;
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
        console.error("Error en login:", err);
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
    isAuthenticated: !!user,
    recoverPassword,
  };
}
