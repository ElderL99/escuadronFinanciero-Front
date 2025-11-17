import axios from "axios";
import toast from "react-hot-toast";

// Crear instancia base
const api = axios.create({
  baseURL: "https://escuadron-financiero-back-end.onrender.com",
  withCredentials: false,
});

// 🧠 Interceptor de solicitud (agrega token automáticamente)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Interceptor de respuesta (maneja expiración de token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const reason = error.response?.data?.reason;

    // 🔥 Si el token expiró o es inválido
    if (status === 401) {
      // Mensaje bonito al usuario
      if (reason === "expired") {
        toast.error("Tu sesión ha expirado. Inicia sesión nuevamente.");
      } else {
        toast.error("Tu sesión no es válida. Inicia sesión nuevamente.");
      }

      // 🧹 Limpiar sesión global
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // ⚡ Redirigir (sin necesidad de recargar)
      setTimeout(() => {
        window.location.href = "/login";
      }, 10000);
    }

    return Promise.reject(error);
  }
);

export default api;
