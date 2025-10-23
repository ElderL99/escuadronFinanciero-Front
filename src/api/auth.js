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
export const validateToken = () => {
  return api.get("/auth/validate-token");
};

// recuperar  Contrasena
export const recoverPasswordApi = ({ email }) => {
  return api.post("/auth/request-password-reset", { email });
};
