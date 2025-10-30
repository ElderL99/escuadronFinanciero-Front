import api from "./axios";

// 🔑 Login
export const loginRequest = ({ email, password }) => {
  return api.post("/auth/login", { email, password });
};

// 📝 Registro
export const registerRequest = ({ name, lastName, email, password }) => {
  return api.post("/auth/sign", { name, lastName, email, password });
};
// 🔐 Obtener perfil
export const getProfile = () => {
  return api.get("/auth/profile");
};

// validar el token
export async function validateToken() {
  try {
    const res = await api.get("/auth/validate-token");
    return res.data;
  } catch (err) {
    const reason = err.response?.data?.reason;
    if (reason === "expired") throw new Error("expired");
    if (reason === "invalid") throw new Error("invalid");
    throw new Error("unauthorized");
  }
}

// recuperar  Contrasena
export const recoverPasswordApi = ({ email }) => {
  return api.post("/auth/request-password-reset", { email });
};
