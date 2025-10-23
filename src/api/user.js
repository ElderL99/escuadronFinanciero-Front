import api from "./axios";

// Obtener todas las solicitudes del usuario autenticado
export const getUserApplications = async () => api.get("/user/solicitud");

// Obtener una solicitud específica
export const getUserApplicationById = async (id) =>
  api.get(`/user/solicitud/${id}`);

// Actualizar solicitud (solo draft)
export const updateUserApplication = async (id, data) =>
  api.patch(`/user/solicitud/${id}`, data);

// 🟦 Eliminar solicitud (solo draft o rejected)
export const deleteUserApplication = async (id) =>
  api.delete(`/user/solicitud/${id}`);

// Obtener documentos asociados
export const getUserApplicationDocuments = async (id) =>
  api.get(`/user/solicitud/${id}/documentos`);
